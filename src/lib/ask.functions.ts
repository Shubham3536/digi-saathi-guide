import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  question: z.string().min(1).max(500),
  lang: z.enum(["en", "hi"]),
});

export type AskResult = {
  taskId: string | null;
  intro: string;
  steps: { instruction: string; simple: string }[];
  error?: string;
};

const SYSTEM = `You are DigiSaathi, a patient and friendly digital assistant for older adults and first-time smartphone users in India.
Your job is to help the user complete ONE smartphone task on an Android phone.

Rules:
- Use extremely simple language. No technical jargon.
- One short step at a time. Maximum 5 steps.
- Describe what the user sees ("Look near the message box. You will see a small paperclip icon. Tap it."), never abstract menus.
- Be warm and encouraging. Never make the user feel embarrassed.
- Support Hindi, English and simple Hinglish input.
- If the task depends on the phone model, say the screen may look a little different.
- NEVER ask for passwords, PINs, OTPs, banking details, Aadhaar or unnecessary personal information.
- If something could be a scam or an untrusted link/QR code, advise verifying the source first.
- Do not claim certainty when the exact phone interface is unknown.

If the request clearly matches one of these known guided tasks, return its id in "taskId":
screenshot (take a screenshot), wa-photo (send a photo on WhatsApp), record-video (record a video),
share-location (share location on WhatsApp), wa-video-call (WhatsApp video call), scan-qr (scan a QR code),
book-cab (book an Ola, Uber, cab or taxi).
Otherwise set "taskId" to null and write the steps yourself.

Reply ONLY with JSON of this shape:
{"taskId": string|null, "intro": string, "steps": [{"instruction": string, "simple": string}]}
"simple" is the same step explained again with different, even simpler words.
Write everything in {LANGUAGE}.`;

export const askDigiSaathi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<AskResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { taskId: null, intro: "", steps: [], error: "AI is not configured yet." };
    }

    const language = data.lang === "hi" ? "Hindi (Devanagari script)" : "simple English";

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          { role: "system", content: SYSTEM.replace("{LANGUAGE}", language) },
          { role: "user", content: data.question },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const status = res.status;
      const message = await res.text().catch(() => "");
      console.error("AI gateway error", status, message);
      return {
        taskId: null,
        intro: "",
        steps: [],
        error: message || `AI request failed (${status}).`,
      };
    }

    const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = payload.choices?.[0]?.message?.content ?? "{}";

    try {
      const parsed = JSON.parse(content) as Partial<AskResult>;
      return {
        taskId: typeof parsed.taskId === "string" ? parsed.taskId : null,
        intro: typeof parsed.intro === "string" ? parsed.intro : "",
        steps: Array.isArray(parsed.steps)
          ? parsed.steps
              .filter((s) => s && typeof s.instruction === "string")
              .slice(0, 6)
              .map((s) => ({ instruction: s.instruction, simple: s.simple || s.instruction }))
          : [],
      };
    } catch {
      return { taskId: null, intro: "", steps: [], error: "parse_error" };
    }
  });
