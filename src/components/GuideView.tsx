import { useEffect, useState } from "react";
import type { Highlight, ScreenKind } from "@/lib/tasks";
import { t, type Lang } from "@/lib/i18n";
import { PhoneScreen } from "./PhoneScreen";
import { speak, stopSpeaking } from "@/hooks/useSpeech";
import { track } from "@/lib/analytics";

export type GuideStep = {
  instruction: string;
  simple: string;
  screen?: ScreenKind | undefined;
  highlight?: Highlight | undefined;
  caption?: string | undefined;
};

export type Guide = {
  taskId: string | null;
  title: string;
  intro?: string;
  steps: GuideStep[];
};

export function GuideView({
  guide,
  lang,
  onDone,
  onHome,
}: {
  guide: Guide;
  lang: Lang;
  onDone: () => void;
  onHome: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [simpler, setSimpler] = useState(false);
  const step = guide.steps[index] ?? guide.steps[0]!;
  const isLast = index === guide.steps.length - 1;
  const text = simpler ? step.simple : step.instruction;

  useEffect(() => {
    setSimpler(false);
    speak(text, lang);
    void track("step_viewed", lang, { taskId: guide.taskId, stepIndex: index });
    return stopSpeaking;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, guide.taskId]);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-16">
      <button
        onClick={() => {
          stopSpeaking();
          onHome();
        }}
        className="mb-4 rounded-full px-4 py-2 text-lg font-semibold text-primary hover:bg-secondary"
      >
        {t.back[lang]}
      </button>

      <h1 className="text-3xl font-bold sm:text-4xl">{guide.title}</h1>
      <p className="mt-2 text-xl font-semibold text-primary">
        {t.stepOf[lang].replace("{a}", String(index + 1)).replace("{b}", String(guide.steps.length))}
      </p>

      {guide.intro && index === 0 ? (
        <p className="mt-3 rounded-2xl bg-secondary p-4 text-xl leading-relaxed">{guide.intro}</p>
      ) : null}

      <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:items-center">
        {step.screen ? (
          <PhoneScreen screen={step.screen} highlight={step.highlight} lang={lang} caption={step.caption} />
        ) : (
          <div className="rounded-3xl bg-secondary p-8 text-center text-6xl">📱</div>
        )}

        <p className="text-2xl font-medium leading-relaxed sm:text-[1.7rem]">{text}</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            stopSpeaking();
            if (isLast) {
              void track("task_completed", lang, { taskId: guide.taskId, stepIndex: index });
              onDone();
            } else {
              setIndex((i) => i + 1);
            }
          }}
          className="rounded-2xl bg-primary px-6 py-6 text-2xl font-bold text-primary-foreground shadow-[var(--shadow-card)] transition hover:opacity-90 sm:col-span-2"
        >
          {isLast ? t.finish[lang] : t.next[lang]}
        </button>

        <button
          onClick={() => {
            speak(text, lang);
            void track("repeat_used", lang, { taskId: guide.taskId, stepIndex: index });
          }}
          className="rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl font-semibold hover:bg-secondary"
        >
          {t.repeat[lang]}
        </button>

        <button
          onClick={() => {
            setSimpler(true);
            speak(step.simple, lang);
            void track("not_understood", lang, { taskId: guide.taskId, stepIndex: index });
          }}
          className="rounded-2xl border-2 border-highlight bg-accent px-6 py-5 text-xl font-semibold text-accent-foreground hover:opacity-90"
        >
          {t.dontUnderstand[lang]}
        </button>

        <button
          onClick={() => {
            stopSpeaking();
            setIndex(0);
          }}
          className="rounded-2xl border-2 border-border bg-card px-6 py-5 text-xl font-semibold hover:bg-secondary sm:col-span-2"
        >
          {t.startOver[lang]}
        </button>
      </div>

      <p className="mt-6 rounded-xl bg-muted p-4 text-base text-muted-foreground">ℹ️ {t.androidNotice[lang]}</p>
    </section>
  );
}
