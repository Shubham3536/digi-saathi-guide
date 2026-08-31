import type { Highlight, ScreenKind } from "@/lib/tasks";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

/**
 * Realistic-looking Android screen references drawn with plain HTML/CSS,
 * plus a bright highlight that shows exactly where to tap.
 */
export function PhoneScreen({
  screen,
  highlight,
  lang,
  caption,
}: {
  screen: ScreenKind;
  highlight?: Highlight | undefined;
  lang: Lang;
  caption?: string | undefined;
}) {
  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div className="relative aspect-[9/19] w-full rounded-[2.2rem] border-[10px] border-neutral-800 bg-neutral-900 shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
          <ScreenBody screen={screen} />
          {highlight ? <HighlightBox highlight={highlight} lang={lang} /> : null}
        </div>
        {(screen === "phone-side" || screen === "phone-side-pressed") && (
          <>
            <span className="absolute -right-[14px] top-[18%] h-[9%] w-[6px] rounded-r bg-neutral-700" />
            <span className="absolute -right-[14px] top-[30%] h-[12%] w-[6px] rounded-r bg-neutral-700" />
          </>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-lg font-medium text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function HighlightBox({ highlight, lang }: { highlight: Highlight; lang: Lang }) {
  const round = highlight.shape === "circle";
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${highlight.x}%`,
        top: `${highlight.y}%`,
        width: `${highlight.w}%`,
        height: `${highlight.h}%`,
      }}
    >
      <div
        className={`absolute inset-0 animate-pulse border-4 border-highlight shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] ${
          round ? "rounded-full" : "rounded-xl"
        }`}
      />
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-highlight px-3 py-1 text-sm font-bold text-highlight-foreground shadow">
        ↑ {t.tapHere[lang]}
      </span>
    </div>
  );
}

const bar = "flex items-center justify-between px-3 py-1.5 text-[10px] text-white/90";

function StatusBar({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`${bar} ${dark ? "" : "text-neutral-600"}`}>
      <span>9:41</span>
      <span>▮▮▮ 4G ▮</span>
    </div>
  );
}

function ScreenBody({ screen }: { screen: ScreenKind }) {
  switch (screen) {
    case "phone-side":
    case "phone-side-pressed":
      return (
        <div className="h-full w-full bg-gradient-to-b from-sky-500 to-indigo-700">
          <StatusBar />
          <div className="mt-10 text-center text-white">
            <p className="text-4xl font-light">9:41</p>
            <p className="text-xs opacity-80">Monday, 12 May</p>
          </div>
          {screen === "phone-side-pressed" && (
            <div className="mt-12 rounded-xl bg-white/20 px-3 py-2 text-center text-xs text-white">
              Hold both buttons…
            </div>
          )}
        </div>
      );

    case "screenshot-preview":
      return (
        <div className="relative h-full w-full bg-gradient-to-b from-sky-500 to-indigo-700">
          <StatusBar />
          <div className="mt-10 text-center text-white">
            <p className="text-4xl font-light">9:41</p>
          </div>
          <div className="absolute bottom-[8%] left-[8%] h-[26%] w-[34%] rounded-lg border-2 border-white bg-white/90 p-1 shadow-lg">
            <div className="h-full w-full rounded bg-gradient-to-b from-sky-400 to-indigo-600" />
          </div>
          <p className="absolute bottom-[4%] left-[8%] text-[10px] text-white">Screenshot saved</p>
        </div>
      );

    case "wa-chat":
    case "wa-attach":
    case "wa-gallery":
    case "wa-photo-send":
    case "wa-location":
      return <WhatsApp screen={screen} />;

    case "wa-calling":
      return (
        <div className="flex h-full w-full flex-col items-center justify-between bg-neutral-800 py-6 text-white">
          <div className="text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-emerald-600 text-center text-3xl leading-[4rem]">
              🙂
            </div>
            <p className="text-base font-semibold">Ramesh</p>
            <p className="text-xs opacity-70">Ringing…</p>
          </div>
          <div className="flex w-full items-center justify-around px-6">
            <span className="h-10 w-10 rounded-full bg-white/20 text-center text-lg leading-10">🎤</span>
            <span className="h-12 w-12 rounded-full bg-red-600 text-center text-xl leading-[3rem]">📞</span>
            <span className="h-10 w-10 rounded-full bg-white/20 text-center text-lg leading-10">🎥</span>
          </div>
        </div>
      );

    case "camera-photo":
    case "camera-video":
    case "camera-recording":
      return <CameraScreen screen={screen} />;

    case "camera-qr":
      return (
        <div className="relative h-full w-full bg-neutral-700">
          <StatusBar />
          <div className="absolute left-1/2 top-[32%] h-[28%] w-[46%] -translate-x-1/2 bg-white p-2">
            <QrArt />
          </div>
          <div className="absolute bottom-[20%] left-[18%] w-[64%] rounded-md bg-amber-300 px-2 py-1.5 text-[10px] font-medium text-neutral-900">
            🔗 example-shop.in/menu
          </div>
          <div className="absolute bottom-[4%] left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-white" />
        </div>
      );

    case "qr-link":
      return (
        <div className="h-full w-full bg-neutral-100">
          <StatusBar dark={false} />
          <div className="mx-3 mt-16 rounded-xl bg-white p-3 shadow">
            <p className="text-[11px] font-semibold text-neutral-800">Open this link?</p>
            <p className="mt-1 break-all text-[10px] text-neutral-600">https://example-shop.in/menu</p>
            <div className="mt-3 flex justify-end gap-2 text-[10px] font-semibold">
              <span className="text-neutral-500">Cancel</span>
              <span className="text-sky-700">Open</span>
            </div>
          </div>
          <p className="mx-3 mt-3 rounded-lg bg-amber-100 p-2 text-[9px] text-amber-900">
            Only open a QR link if you trust the source.
          </p>
        </div>
      );
  }
}

function QrArt() {
  return (
    <div className="grid h-full w-full grid-cols-7 gap-[2px]">
      {Array.from({ length: 49 }).map((_, i) => (
        <span key={i} className={(i * 7 + (i % 5)) % 3 === 0 ? "bg-neutral-900" : "bg-white"} />
      ))}
    </div>
  );
}

function WhatsApp({ screen }: { screen: ScreenKind }) {
  return (
    <div className="relative h-full w-full bg-[#efe7dd]">
      <div className="flex items-center gap-2 bg-[#075E54] px-2 py-2 text-white">
        <span className="text-sm">←</span>
        <span className="h-6 w-6 rounded-full bg-white/30 text-center text-xs leading-6">🙂</span>
        <span className="flex-1 text-[11px] font-semibold">Ramesh</span>
        <span className="text-xs">🎥</span>
        <span className="text-xs">📞</span>
        <span className="text-xs">⋮</span>
      </div>

      <div className="space-y-2 p-2">
        <div className="ml-auto w-[70%] rounded-lg bg-[#dcf8c6] p-1.5 text-[9px] text-neutral-800">
          Namaste! Kaise ho?
        </div>
        <div className="w-[60%] rounded-lg bg-white p-1.5 text-[9px] text-neutral-800">Bilkul theek 🙂</div>
      </div>

      {screen === "wa-gallery" && (
        <div className="absolute inset-x-0 bottom-0 top-[16%] bg-neutral-900/95 p-2">
          <p className="mb-2 text-[10px] text-white">Gallery</p>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded bg-gradient-to-br from-orange-300 via-rose-300 to-sky-300"
              />
            ))}
          </div>
        </div>
      )}

      {screen === "wa-photo-send" && (
        <div className="absolute inset-0 bg-neutral-900">
          <div className="mt-10 h-[55%] w-full bg-gradient-to-br from-orange-300 via-rose-300 to-sky-300" />
          <div className="absolute bottom-[6%] right-[8%] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
            ➤
          </div>
          <div className="absolute bottom-[8%] left-[8%] rounded-full bg-white/20 px-3 py-2 text-[9px] text-white">
            Add a caption…
          </div>
        </div>
      )}

      {screen === "wa-attach" && (
        <div className="absolute inset-x-2 bottom-[16%] grid grid-cols-3 gap-3 rounded-2xl bg-white p-4 shadow-lg">
          {[
            ["🖼️", "Gallery", "bg-violet-500"],
            ["📷", "Camera", "bg-rose-500"],
            ["📍", "Location", "bg-emerald-500"],
            ["📄", "Document", "bg-indigo-500"],
            ["🎵", "Audio", "bg-orange-500"],
            ["👤", "Contact", "bg-sky-500"],
          ].map(([icon, label, color]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className={`h-9 w-9 rounded-full ${color} text-center text-base leading-9`}>{icon}</span>
              <span className="text-[8px] text-neutral-700">{label}</span>
            </div>
          ))}
        </div>
      )}

      {screen === "wa-location" && (
        <div className="absolute inset-x-0 bottom-0 top-[16%] bg-white">
          <div className="h-[52%] w-full bg-[repeating-linear-gradient(45deg,#dfe9d8_0_10px,#eef4e9_10px_20px)]">
            <p className="pt-14 text-center text-2xl">📍</p>
          </div>
          <div className="border-b p-2 text-[10px] font-semibold text-emerald-700">
            ➤ Send your current location
          </div>
          <div className="p-2 text-[10px] text-neutral-600">⏱ Share live location</div>
        </div>
      )}

      {(screen === "wa-chat" || screen === "wa-attach") && (
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2">
            <span className="flex-1 text-[9px] text-neutral-400">Message</span>
            <span className="text-[11px]">📎</span>
            <span className="text-[11px]">📷</span>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white">🎤</span>
        </div>
      )}
    </div>
  );
}

function CameraScreen({ screen }: { screen: ScreenKind }) {
  const recording = screen === "camera-recording";
  return (
    <div className="relative h-full w-full bg-neutral-800">
      <div className="absolute inset-x-0 top-[6%] mx-auto w-[40%] rounded-full bg-black/50 py-1 text-center text-[9px] text-white">
        Camera
      </div>
      <div className="absolute inset-x-0 top-[16%] h-[54%] bg-gradient-to-b from-sky-300 via-emerald-200 to-amber-200" />
      {recording && (
        <div className="absolute left-[8%] top-[20%] rounded bg-red-600 px-2 py-0.5 text-[9px] text-white">
          ● 00:04
        </div>
      )}
      <div className="absolute inset-x-0 bottom-[16%] flex justify-center gap-4 text-[9px] font-semibold text-white">
        <span className={screen === "camera-photo" ? "text-amber-300" : "opacity-60"}>PHOTO</span>
        <span className={screen !== "camera-photo" ? "text-amber-300" : "opacity-60"}>VIDEO</span>
        <span className="opacity-60">PORTRAIT</span>
      </div>
      <div className="absolute inset-x-0 bottom-[3%] flex items-center justify-center">
        <span
          className={`h-12 w-12 rounded-full border-4 border-white ${recording ? "bg-red-600" : "bg-white/80"}`}
        />
      </div>
    </div>
  );
}
