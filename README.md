# DigiSaathi 📱

A friendly, voice-first smartphone guide for older adults and first-time smartphone users.
Ask in Hindi, English or Hinglish — DigiSaathi shows **one simple step at a time** with the exact
button highlighted on a realistic Android screen.

## Features (MVP)

- Homepage with a warm avatar and reassuring copy
- Language switch: **English / हिन्दी** (all UI, instructions, voice input and voice output)
- Voice input (browser Speech Recognition, `en-IN` / `hi-IN`) and slow, clear voice output
- Large text box for typed questions (Hinglish understood)
- Six guided tasks: screenshot, WhatsApp photo, record video, share location, WhatsApp video call, scan QR
- Visual step-by-step guidance: Android/WhatsApp screen references with a bright highlight, arrow and "Tap here" label
- Controls: **Next Step**, **🔊 Repeat**, **I don't understand** (rewords the step more simply), **↺ Start Over**
- Free-form questions answered by an LLM with the DigiSaathi patient-companion system prompt
- Feedback at the end of each task, plus anonymous product analytics
- Android device-difference notice and an AI transparency notice
- Fully responsive; large tap targets on mobile

## Architecture

```
Browser (React 19 + TanStack Start + Tailwind v4)
  ├── Web Speech API          → speech-to-text (hi-IN / en-IN)
  ├── Web Speech Synthesis    → text-to-speech at 0.8x rate
  ├── Local intent matcher    → maps a question to one of the 6 guided tasks
  ├── askDigiSaathi()  ──────→ server function (Node/edge)
  │                              └── Lovable AI Gateway → google/gemini-3.7-flash (JSON steps)
  └── Lovable Cloud (Postgres) → sessions / events / feedback (anonymous, insert-only)
```

Key files:

| Path | Purpose |
| --- | --- |
| `src/routes/index.tsx` | Homepage, language switch, voice + text input, task grid |
| `src/lib/tasks.ts` | The six guided tasks: steps, screens, highlight boxes, EN/HI text |
| `src/lib/i18n.ts` | All UI strings in English and Hindi |
| `src/components/PhoneScreen.tsx` | Android/WhatsApp/Camera screen references + tap highlight |
| `src/components/GuideView.tsx` | Step navigation, repeat, "I don't understand" |
| `src/components/FeedbackCard.tsx` | End-of-task feedback |
| `src/hooks/useSpeech.ts` | Speech recognition + slow speech synthesis |
| `src/lib/ask.functions.ts` | Server function calling the LLM with the DigiSaathi system prompt |
| `src/lib/analytics.ts` | Anonymous session / event / feedback logging |

## Setup

```bash
bun install
bun run dev      # http://localhost:8080
```

## Environment variables

See `.env.example`. On Lovable Cloud these are provisioned automatically.

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | browser | Backend URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | browser | Public anon key |
| `LOVABLE_API_KEY` | server only | AI Gateway key; never exposed to the browser |

## APIs used

- **LLM:** Lovable AI Gateway → `google/gemini-3.7-flash` (OpenAI-compatible chat completions, JSON output)
- **Speech-to-text:** browser Web Speech API (`SpeechRecognition`) — Chrome/Edge/Android Chrome
- **Text-to-speech:** browser `SpeechSynthesis`
- **Avatar:** an illustrated character asset (`src/assets/digisaathi-avatar.png`) generated ahead of time — no runtime avatar service, so the page stays fast and works offline-ish
- **Database:** Lovable Cloud (Postgres) via the generated client

## Analytics

Anonymous, insert-only tables (no login, no personal data):

- `sessions` — one row per visit, with the language
- `events` — `session_start`, `task_selected`, `task_started`, `step_viewed`, `repeat_used`,
  `not_understood`, `task_completed`, `ai_question`, plus task id, step index and input mode (voice / typing / tap)
- `feedback` — helpful (yes / somewhat / no), would use again, optional "what was confusing"

**Independent Task Completion Rate** = `task_completed` sessions ÷ `task_started` sessions.
Secondary metrics: repeat usage, "I don't understand" usage, time per task, language split, voice vs typing.

## Deploying

Publish from Lovable (Publish button) — the backend, environment variables and the server function
deploy together. For self-hosting, `bun run build` produces a server bundle deployable to any
Node/edge host; set the three environment variables above.

## Limitations

- **Android differs by manufacturer.** Samsung, Pixel, OnePlus, Xiaomi and Motorola all move buttons
  and rename menus. Every guide shows the notice "Android menus may look slightly different on your
  phone." The screen references are faithful but generic, not device-exact.
- Voice input needs a browser with the Web Speech API (Chrome, Edge, Android Chrome). Safari/iOS
  support is limited — typing always works as a fallback.
- Hindi text-to-speech quality depends on the voices installed on the device.
- The AI can be wrong; it says so, and it never asks for passwords, PINs, OTPs or bank details.
- iOS guidance is out of scope for this MVP.

## Future possibilities (not in the MVP)

Screen-aware assistance · phone-model personalisation (Samsung / Pixel / Xiaomi …) · more Indian
languages (Bengali, Marathi, Tamil, Telugu, Kannada) · scam / "is this safe?" detection · family
remote setup · personalised learning that remembers past struggles · full voice-only mode.
