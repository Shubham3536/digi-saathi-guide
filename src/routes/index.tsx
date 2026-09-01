import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import avatarImg from "@/assets/digisaathi-avatar.png";
import { t, type Lang } from "@/lib/i18n";
import { TASKS, findTask, matchTask, type Task } from "@/lib/tasks";
import { GuideView, type Guide } from "@/components/GuideView";
import { FeedbackCard } from "@/components/FeedbackCard";
import { useSpeechRecognition, speak, stopSpeaking } from "@/hooks/useSpeech";
import { track } from "@/lib/analytics";
import { askDigiSaathi } from "@/lib/ask.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiSaathi — Friendly step-by-step smartphone help" },
      {
        name: "description",
        content:
          "DigiSaathi is a patient voice-first guide in Hindi and English that shows older adults exactly where to tap on their Android phone.",
      },
      { property: "og:title", content: "DigiSaathi — Friendly step-by-step smartphone help" },
      {
        property: "og:description",
        content:
          "Ask by voice or text in Hindi or English. DigiSaathi shows you one simple step at a time, with the exact button highlighted.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

type View = "home" | "guide" | "feedback";

function guideFromTask(task: Task, lang: Lang): Guide {
  return {
    taskId: task.id,
    title: `${task.emoji} ${task.title[lang]}`,
    steps: task.steps.map((s) => ({
      instruction: s.instruction[lang],
      simple: s.simple[lang],
      screen: s.screen,
      highlight: s.highlight,
      caption: s.caption[lang],
    })),
  };
}

function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [view, setView] = useState<View>("home");
  const [guide, setGuide] = useState<Guide | null>(null);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const { listening, supported, start } = useSpeechRecognition(lang);
  const ask = useServerFn(askDigiSaathi);

  useEffect(() => {
    void track("session_start", lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTask(task: Task, mode: "tap" | "voice" | "typing") {
    stopSpeaking();
    setNotice(null);
    void track("task_selected", lang, { taskId: task.id, inputMode: mode });
    void track("task_started", lang, { taskId: task.id, inputMode: mode });
    setGuide(guideFromTask(task, lang));
    setView("guide");
  }

  async function handleQuestion(text: string, mode: "voice" | "typing") {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNotice(null);
    void track("ai_question", lang, { inputMode: mode, detail: trimmed.slice(0, 200) });

    const local = matchTask(trimmed);
    if (local) {
      startTask(local, mode);
      return;
    }

    setBusy(true);
    speak(t.thinking[lang], lang);
    try {
      const result = await ask({ data: { question: trimmed, lang } });
      if (result.error || (!result.steps.length && !result.taskId)) {
        setNotice(t.errorMsg[lang]);
        return;
      }
      const known = findTask(result.taskId);
      if (known) {
        startTask(known, mode);
        return;
      }
      void track("task_started", lang, { taskId: null, inputMode: mode });
      setGuide({
        taskId: null,
        title: trimmed,
        intro: result.intro || t.notSure[lang],
        steps: result.steps,
      });
      setView("guide");
    } catch {
      setNotice(t.errorMsg[lang]);
    } finally {
      setBusy(false);
    }
  }

  if (view === "guide" && guide) {
    return (
      <main className="min-h-screen bg-background pt-6">
        <GuideView
          guide={guide}
          lang={lang}
          onDone={() => setView("feedback")}
          onHome={() => {
            setView("home");
            setGuide(null);
          }}
        />
      </main>
    );
  }

  if (view === "feedback") {
    return (
      <main className="min-h-screen bg-background pt-10">
        <FeedbackCard
          lang={lang}
          taskId={guide?.taskId ?? null}
          onFinish={() => {
            setGuide(null);
            setQuestion("");
            setView("home");
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-6">
        <div>
          <p className="text-3xl font-extrabold tracking-tight">📱 {t.appName[lang]}</p>
          <p className="text-lg text-muted-foreground">{t.tagline[lang]}</p>
        </div>
        <div className="flex overflow-hidden rounded-full border-2 border-primary" role="group" aria-label="Language">
          {(["en", "hi"] as const).map((code) => (
            <button
              key={code}
              onClick={() => {
                stopSpeaking();
                setLang(code);
              }}
              className={`px-6 py-3 text-xl font-bold transition ${
                lang === code ? "bg-primary text-primary-foreground" : "bg-card text-primary"
              }`}
            >
              {code === "en" ? "English" : "हिन्दी"}
            </button>
          ))}
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4">
        <AvatarCompanion lang={lang} listening={listening} thinking={busy} />


        <h1 className="mt-10 text-center text-4xl font-extrabold leading-tight sm:text-5xl">{t.heading[lang]}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xl leading-relaxed text-muted-foreground">
          {t.support[lang]}
        </p>

        <button
          onClick={() => {
            if (!supported) {
              setNotice(t.micUnsupported[lang]);
              return;
            }
            setNotice(null);
            start((text) => {
              setQuestion(text);
              void handleQuestion(text, "voice");
            });
          }}
          disabled={busy}
          className="mt-8 w-full rounded-3xl bg-primary px-6 py-8 text-3xl font-extrabold text-primary-foreground shadow-[var(--shadow-card)] transition hover:opacity-90 disabled:opacity-60"
        >
          {listening ? t.listening[lang] : busy ? t.thinking[lang] : t.talk[lang]}
        </button>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            void handleQuestion(question, "typing");
          }}
        >
          <label className="sr-only" htmlFor="question">
            {t.textPlaceholder[lang]}
          </label>
          <input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.textPlaceholder[lang]}
            className="flex-1 rounded-2xl border-2 border-input bg-card px-5 py-5 text-xl outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-2xl bg-foreground px-10 py-5 text-xl font-bold text-background disabled:opacity-60"
          >
            {t.ask[lang]}
          </button>
        </form>

        {notice ? (
          <p className="mt-4 rounded-2xl bg-accent p-4 text-xl text-accent-foreground">{notice}</p>
        ) : null}

        <h2 className="mt-12 text-3xl font-bold">{t.popular[lang]}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TASKS.map((task) => (
            <button
              key={task.id}
              onClick={() => startTask(task, "tap")}
              className="flex items-center gap-4 rounded-3xl border-2 border-border bg-card p-6 text-left text-2xl font-semibold shadow-[var(--shadow-card)] transition hover:border-primary hover:bg-secondary"
            >
              <span className="text-4xl">{task.emoji}</span>
              <span>{task.title[lang]}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 space-y-3 pb-16 text-base text-muted-foreground">
          <p className="rounded-xl bg-muted p-4">ℹ️ {t.androidNotice[lang]}</p>
          <p className="rounded-xl bg-muted p-4">🤖 {t.aiNotice[lang]}</p>
        </div>
      </section>
    </main>
  );
}
