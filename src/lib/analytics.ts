import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "./i18n";

const KEY = "digisaathi_session_id";
let pending: Promise<string | null> | null = null;

export type EventType =
  | "session_start"
  | "task_selected"
  | "task_started"
  | "step_viewed"
  | "repeat_used"
  | "not_understood"
  | "task_completed"
  | "ai_question";

export async function getSessionId(lang: Lang): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const existing = window.sessionStorage.getItem(KEY);
  if (existing) return existing;
  if (pending) return pending;
  pending = (async () => {
    const { data, error } = await supabase.from("sessions").insert({ language: lang }).select("id").single();
    if (error || !data) return null;
    window.sessionStorage.setItem(KEY, data.id);
    return data.id as string;
  })();
  return pending;
}

export async function track(
  eventType: EventType,
  lang: Lang,
  extra: {
    taskId?: string | null;
    stepIndex?: number | null;
    inputMode?: "voice" | "typing" | "tap" | null;
    durationMs?: number | null;
    detail?: string | null;
  } = {},
) {
  try {
    const sessionId = await getSessionId(lang);
    if (!sessionId) return;
    await supabase.from("events").insert({
      session_id: sessionId,
      event_type: eventType,
      language: lang,
      task_id: extra.taskId ?? null,
      step_index: extra.stepIndex ?? null,
      input_mode: extra.inputMode ?? null,
      duration_ms: extra.durationMs ?? null,
      detail: extra.detail ?? null,
    });
  } catch {
    /* analytics must never break the experience */
  }
}

export async function saveFeedback(input: {
  lang: Lang;
  taskId: string | null;
  helpful: string | null;
  wouldUseAgain: boolean | null;
  confusingText: string | null;
}) {
  try {
    const sessionId = await getSessionId(input.lang);
    await supabase.from("feedback").insert({
      session_id: sessionId,
      task_id: input.taskId,
      helpful: input.helpful,
      would_use_again: input.wouldUseAgain,
      confusing_text: input.confusingText,
      language: input.lang,
    });
  } catch {
    /* ignore */
  }
}
