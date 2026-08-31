import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

const localeFor = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRecognitionCtor(): any {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(lang: Lang) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()));
  }, []);

  const stop = useCallback(() => {
    try {
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  }, []);

  const start = useCallback(
    (onResult: (text: string) => void) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        setSupported(false);
        return;
      }
      const rec = new Ctor();
      recRef.current = rec;
      rec.lang = localeFor(lang);
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.continuous = false;
      rec.onresult = (event: any) => {
        const text = event.results?.[0]?.[0]?.transcript ?? "";
        setListening(false);
        if (text) onResult(text);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      setListening(true);
      try {
        rec.start();
      } catch {
        setListening(false);
      }
    },
    [lang],
  );

  return { listening, supported, start, stop };
}

/** Slow, clear text-to-speech. */
export function speak(text: string, lang: Lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = localeFor(lang);
  utter.rate = 0.8;
  utter.pitch = 1;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang === utter.lang);
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
