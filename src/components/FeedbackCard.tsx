import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import { saveFeedback } from "@/lib/analytics";

export function FeedbackCard({
  lang,
  taskId,
  onFinish,
}: {
  lang: Lang;
  taskId: string | null;
  onFinish: () => void;
}) {
  const [helpful, setHelpful] = useState<string | null>(null);
  const [again, setAgain] = useState<boolean | null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const choice = (active: boolean) =>
    `rounded-2xl border-2 px-5 py-5 text-xl font-semibold transition ${
      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"
    }`;

  if (sent) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-5xl">🙏</p>
        <p className="mt-4 text-2xl font-semibold">{t.thanks[lang]}</p>
        <button
          onClick={onFinish}
          className="mt-8 rounded-2xl bg-primary px-8 py-5 text-xl font-bold text-primary-foreground"
        >
          {t.askAnother[lang]}
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-16">
      <p className="text-center text-4xl font-bold">{t.wellDone[lang]}</p>

      <h2 className="mt-8 text-2xl font-semibold">{t.didHelp[lang]}</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <button className={choice(helpful === "yes")} onClick={() => setHelpful("yes")}>
          {t.yes[lang]}
        </button>
        <button className={choice(helpful === "somewhat")} onClick={() => setHelpful("somewhat")}>
          {t.somewhat[lang]}
        </button>
        <button className={choice(helpful === "no")} onClick={() => setHelpful("no")}>
          {t.no[lang]}
        </button>
      </div>

      <h2 className="mt-8 text-2xl font-semibold">{t.useAgain[lang]}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button className={choice(again === true)} onClick={() => setAgain(true)}>
          {t.plainYes[lang]}
        </button>
        <button className={choice(again === false)} onClick={() => setAgain(false)}>
          {t.plainNo[lang]}
        </button>
      </div>

      <label className="mt-8 block text-2xl font-semibold" htmlFor="confusing">
        {t.confusing[lang]}
      </label>
      <textarea
        id="confusing"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        className="mt-3 w-full rounded-2xl border-2 border-input bg-card p-4 text-xl"
      />

      <button
        onClick={async () => {
          await saveFeedback({
            lang,
            taskId,
            helpful,
            wouldUseAgain: again,
            confusingText: note.trim() || null,
          });
          setSent(true);
        }}
        className="mt-6 w-full rounded-2xl bg-primary px-8 py-6 text-2xl font-bold text-primary-foreground"
      >
        {t.sendFeedback[lang]}
      </button>
    </section>
  );
}
