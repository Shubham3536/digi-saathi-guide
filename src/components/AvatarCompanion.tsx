import { useState } from "react";

import avatarImg from "@/assets/digisaathi-avatar.png";
import { t, type Lang } from "@/lib/i18n";
import { speak, useIsSpeaking } from "@/hooks/useSpeech";

type Props = {
  lang: Lang;
  listening: boolean;
  thinking: boolean;
};

export function AvatarCompanion({ lang, listening, thinking }: Props) {
  const speaking = useIsSpeaking();
  const [nod, setNod] = useState(false);

  const active = listening || speaking || thinking;

  const status = listening
    ? t.listening[lang]
    : thinking
      ? t.thinking[lang]
      : speaking
        ? t.speakingNow[lang]
        : t.tapAvatar[lang];

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] sm:flex-row sm:p-8">
      <button
        type="button"
        aria-label={t.tapAvatar[lang]}
        onClick={() => {
          setNod(true);
          window.setTimeout(() => setNod(false), 900);
          speak(`${t.avatarHello[lang]} ${t.avatarMsg[lang]}`, lang);
        }}
        className="relative shrink-0 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        {/* pulsing rings while active */}
        {active ? (
          <>
            <span className="ds-ring pointer-events-none absolute inset-0 rounded-full bg-primary/30" />
            <span
              className="ds-ring pointer-events-none absolute inset-0 rounded-full bg-primary/20"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        ) : null}

        <img
          src={avatarImg}
          alt="DigiSaathi, your friendly guide"
          width={768}
          height={768}
          className={`relative h-32 w-32 rounded-full bg-accent object-cover transition sm:h-40 sm:w-40 ${
            nod ? "ds-nod" : active ? "ds-breathe" : "ds-float"
          }`}
        />

        {/* talking waveform */}
        {speaking ? (
          <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-end gap-1 rounded-full bg-primary px-3 py-2 shadow-[var(--shadow-card)]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="ds-bar block h-4 w-1.5 rounded-full bg-primary-foreground"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </span>
        ) : null}

        {listening ? (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
            🎤
          </span>
        ) : null}
      </button>

      <div className="text-center sm:text-left">
        <p className="text-2xl font-bold sm:text-3xl">{t.avatarHello[lang]}</p>
        <p className="mt-2 text-xl leading-relaxed text-muted-foreground">{t.avatarMsg[lang]}</p>
        <p className="mt-3 text-base font-semibold text-primary">{status}</p>
      </div>
    </div>
  );
}
