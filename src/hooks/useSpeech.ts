import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

const localeFor = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");
const otherLocale = (lang: Lang) => (lang === "hi" ? "en-IN" : "hi-IN");

export const hasDevanagari = (text: string) => /[\u0900-\u097F]/.test(text);

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRecognitionCtor(): any {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;
}

export type SpeechError = "unsupported" | "denied" | "no-speech" | "failed";

/**
 * Voice input that listens in Hindi and English.
 * If nothing is understood in the current language, it automatically
 * retries once in the other language, so Hindi speech is picked up
 * even when the interface is set to English (and the other way round).
 */
export function useSpeechRecognition(lang: Lang) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()));
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    try {
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  }, []);

  const start = useCallback(
    (
      onResult: (text: string, detectedLang: Lang) => void,
      onError?: (error: SpeechError) => void,
    ) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        setSupported(false);
        onError?.("unsupported");
        return;
      }
      cancelledRef.current = false;

      const runOnce = (locale: string, isRetry: boolean) => {
        const rec = new Ctor();
        recRef.current = rec;
        rec.lang = locale;
        rec.interimResults = false;
        rec.maxAlternatives = 3;
        rec.continuous = false;

        let got = false;

        rec.onresult = (event: any) => {
          const alts = event.results?.[0];
          let text = "";
          for (let i = 0; i < (alts?.length ?? 0); i += 1) {
            const candidate = alts[i]?.transcript?.trim();
            if (candidate) {
              text = candidate;
              break;
            }
          }
          if (!text) return;
          got = true;
          setListening(false);
          onResult(text, hasDevanagari(text) ? "hi" : locale.startsWith("hi") ? "hi" : "en");
        };

        rec.onerror = (event: any) => {
          if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
            got = true; // do not retry, permission problem
            setListening(false);
            onError?.("denied");
          }
        };

        rec.onend = () => {
          if (got || cancelledRef.current) return;
          if (!isRetry) {
            // nothing understood — try the other language
            runOnce(otherLocale(lang), true);
            return;
          }
          setListening(false);
          onError?.("no-speech");
        };

        try {
          rec.start();
        } catch {
          setListening(false);
          onError?.("failed");
        }
      };

      setListening(true);
      runOnce(localeFor(lang), false);
    },
    [lang],
  );

  return { listening, supported, start, stop };
}

type SpeakingListener = (speaking: boolean) => void;
const speakingListeners = new Set<SpeakingListener>();
function emitSpeaking(value: boolean) {
  speakingListeners.forEach((fn) => fn(value));
}

/** True while DigiSaathi is talking — used to animate the avatar. */
export function useIsSpeaking() {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    speakingListeners.add(setSpeaking);
    return () => {
      speakingListeners.delete(setSpeaking);
    };
  }, []);
  return speaking;
}

/** Slow, clear text-to-speech. */
export function speak(text: string, lang: Lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const wantsHindi = lang === "hi" || hasDevanagari(text);
  utter.lang = wantsHindi ? "hi-IN" : "en-IN";
  utter.rate = 0.8;
  utter.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const voice =
    voices.find((v) => v.lang === utter.lang) ??
    voices.find((v) => v.lang.replace("_", "-").startsWith(wantsHindi ? "hi" : "en"));
  if (voice) utter.voice = voice;
  utter.onstart = () => emitSpeaking(true);
  utter.onend = () => emitSpeaking(false);
  utter.onerror = () => emitSpeaking(false);
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  emitSpeaking(false);
}
