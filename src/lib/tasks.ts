import type { Bi } from "./i18n";

export type ScreenKind =
  | "phone-side"
  | "phone-side-pressed"
  | "screenshot-preview"
  | "wa-chat"
  | "wa-attach"
  | "wa-gallery"
  | "wa-photo-send"
  | "wa-location"
  | "wa-calling"
  | "camera-photo"
  | "camera-video"
  | "camera-recording"
  | "camera-qr"
  | "qr-link";

/** Highlight box in percent of the phone screen area. */
export type Highlight = { x: number; y: number; w: number; h: number; shape?: "circle" | "rect" };

export type Step = {
  screen: ScreenKind;
  highlight?: Highlight;
  instruction: Bi;
  simple: Bi;
  caption: Bi;
};

export type Task = {
  id: string;
  emoji: string;
  title: Bi;
  keywords: string[];
  steps: Step[];
};

export const TASKS: Task[] = [
  {
    id: "screenshot",
    emoji: "📸",
    title: { en: "Take a Screenshot", hi: "स्क्रीनशॉट लेना" },
    keywords: ["screenshot", "screen shot", "स्क्रीनशॉट", "photo of screen", "capture screen"],
    steps: [
      {
        screen: "phone-side",
        highlight: { x: 78, y: 18, w: 24, h: 26 },
        caption: { en: "Side of your phone", hi: "फोन की साइड" },
        instruction: {
          en: "Look at the right side of your phone. Find the Power button and the Volume Down button.",
          hi: "अपने फोन की दाईं तरफ देखें। Power बटन और Volume Down बटन ढूँढें।",
        },
        simple: {
          en: "No problem. Hold your phone and feel the edge on the right. There are two small buttons there. One switches the phone on, the other lowers the sound.",
          hi: "कोई बात नहीं। फोन को हाथ में लीजिए और दाईं किनार पर छूकर देखिए। वहाँ दो छोटे बटन हैं। एक फोन चालू करता है, दूसरा आवाज़ कम करता है।",
        },
      },
      {
        screen: "phone-side-pressed",
        highlight: { x: 78, y: 18, w: 24, h: 26 },
        caption: { en: "Press both together", hi: "दोनों एक साथ दबाएँ" },
        instruction: {
          en: "Press both buttons at the same time, and let go after one second.",
          hi: "दोनों बटन एक साथ दबाइए और एक सेकंड बाद छोड़ दीजिए।",
        },
        simple: {
          en: "Put one finger on each button. Push them down together, count one, then take your fingers off.",
          hi: "एक उँगली एक बटन पर और दूसरी उँगली दूसरे बटन पर रखिए। दोनों को साथ में दबाइए, एक तक गिनिए, फिर छोड़ दीजिए।",
        },
      },
      {
        screen: "screenshot-preview",
        highlight: { x: 8, y: 62, w: 34, h: 26 },
        caption: { en: "Screenshot saved", hi: "स्क्रीनशॉट सेव हो गया" },
        instruction: {
          en: "A small picture of your screen appears at the bottom. It is saved in your Gallery. Done!",
          hi: "नीचे आपकी स्क्रीन की छोटी तस्वीर दिखेगी। यह आपकी Gallery में सेव हो गई है। हो गया!",
        },
        simple: {
          en: "You will hear a click sound and see a small picture. That picture is now kept safely in your photos.",
          hi: "आपको एक क्लिक की आवाज़ सुनाई देगी और छोटी तस्वीर दिखेगी। वह तस्वीर अब आपकी photos में सुरक्षित है।",
        },
      },
    ],
  },
  {
    id: "wa-photo",
    emoji: "💬",
    title: { en: "Send a WhatsApp Photo", hi: "WhatsApp पर फोटो भेजना" },
    keywords: ["whatsapp photo", "send photo", "photo bhejni", "photo kaise bheju", "फोटो भेज", "image send"],
    steps: [
      {
        screen: "wa-chat",
        highlight: { x: 60, y: 87.5, w: 11, h: 5.5, shape: "circle" },
        caption: { en: "WhatsApp chat", hi: "WhatsApp चैट" },
        instruction: {
          en: "Open the WhatsApp chat of the person. Look near the message box. You will see a small paperclip icon. Tap it.",
          hi: "जिस व्यक्ति को भेजना है, उसकी WhatsApp चैट खोलिए। मैसेज बॉक्स के पास देखिए। एक छोटा पेपरक्लिप (पिन) का निशान दिखेगा। उस पर tap कीजिए।",
        },
        simple: {
          en: "At the bottom there is a long white box where you write messages. On its right side there is a tiny pin shape. Touch that pin once.",
          hi: "नीचे एक लंबा सफेद बॉक्स है जहाँ आप मैसेज लिखते हैं। उसकी दाईं तरफ एक छोटी सी पिन जैसी आकृति है। उसे एक बार छू लीजिए।",
        },
      },
      {
        screen: "wa-attach",
        highlight: { x: 6, y: 58.5, w: 28, h: 11 },
        caption: { en: "Attach menu", hi: "अटैच मेन्यू" },
        instruction: {
          en: "A small menu opens. Tap on Gallery.",
          hi: "एक छोटा मेन्यू खुलेगा। उसमें Gallery पर tap कीजिए।",
        },
        simple: {
          en: "Some round coloured icons come up from the bottom. One of them says Gallery, with a picture symbol. Touch that one.",
          hi: "नीचे से कुछ गोल रंगीन निशान ऊपर आएँगे। उनमें से एक पर Gallery लिखा है और तस्वीर का निशान है। उसी को छूइए।",
        },
      },
      {
        screen: "wa-gallery",
        highlight: { x: 36, y: 26, w: 28, h: 20 },
        caption: { en: "Choose the photo", hi: "फोटो चुनिए" },
        instruction: {
          en: "Your photos appear. Tap the photo you want to send.",
          hi: "आपकी सारी फोटो दिखेंगी। जो फोटो भेजनी है, उस पर tap कीजिए।",
        },
        simple: {
          en: "You will see many small pictures. Touch the one you want to send. A tick mark will appear on it.",
          hi: "बहुत सी छोटी तस्वीरें दिखेंगी। जो भेजनी है उसे छूइए। उस पर एक सही का निशान आ जाएगा।",
        },
      },
      {
        screen: "wa-photo-send",
        highlight: { x: 74, y: 84, w: 16, h: 10, shape: "circle" },
        caption: { en: "Send", hi: "भेजें" },
        instruction: {
          en: "Now tap the green arrow button to send the photo.",
          hi: "अब हरे तीर वाले बटन पर tap करके फोटो भेज दीजिए।",
        },
        simple: {
          en: "At the bottom right there is a green round button with an arrow inside. Touch it once and the photo goes.",
          hi: "नीचे दाईं तरफ हरे रंग का गोल बटन है जिसमें तीर बना है। उसे एक बार छूइए, फोटो चली जाएगी।",
        },
      },
    ],
  },
  {
    id: "record-video",
    emoji: "🎥",
    title: { en: "Record a Video", hi: "वीडियो रिकॉर्ड करना" },
    keywords: ["record video", "video banana", "वीडियो", "camera video", "shoot video"],
    steps: [
      {
        screen: "camera-photo",
        highlight: { x: 30, y: 6, w: 40, h: 10 },
        caption: { en: "Open Camera", hi: "कैमरा खोलिए" },
        instruction: {
          en: "Open the Camera app on your phone.",
          hi: "अपने फोन में Camera ऐप खोलिए।",
        },
        simple: {
          en: "On your home screen, find the small picture that looks like a camera. Touch it once.",
          hi: "अपनी होम स्क्रीन पर कैमरे जैसा छोटा निशान ढूँढ़िए। उसे एक बार छूइए।",
        },
      },
      {
        screen: "camera-video",
        highlight: { x: 54, y: 74, w: 22, h: 8 },
        caption: { en: "Switch to Video", hi: "वीडियो पर जाइए" },
        instruction: {
          en: "Near the bottom you will see the words PHOTO and VIDEO. Tap on VIDEO.",
          hi: "नीचे की तरफ PHOTO और VIDEO लिखा दिखेगा। VIDEO पर tap कीजिए।",
        },
        simple: {
          en: "Just above the big round button there is a row of words. Slide or touch the word VIDEO.",
          hi: "बड़े गोल बटन के ठीक ऊपर कुछ शब्द लिखे हैं। VIDEO शब्द को छू लीजिए या उधर खिसका दीजिए।",
        },
      },
      {
        screen: "camera-recording",
        highlight: { x: 38, y: 84, w: 24, h: 12, shape: "circle" },
        caption: { en: "Start recording", hi: "रिकॉर्डिंग शुरू" },
        instruction: {
          en: "Tap the big red button to start. Tap it again to stop. Your video is saved.",
          hi: "बड़े लाल बटन पर tap करके शुरू कीजिए। रोकने के लिए दोबारा tap कीजिए। आपका वीडियो सेव हो जाएगा।",
        },
        simple: {
          en: "The big button at the bottom turns red. One touch starts the video, one more touch stops it.",
          hi: "नीचे का बड़ा बटन लाल हो जाता है। एक बार छूने पर वीडियो शुरू, दोबारा छूने पर बंद।",
        },
      },
    ],
  },
  {
    id: "share-location",
    emoji: "📍",
    title: { en: "Share My Location", hi: "अपनी लोकेशन भेजना" },
    keywords: ["location", "share location", "लोकेशन", "location bhejna", "where i am"],
    steps: [
      {
        screen: "wa-chat",
        highlight: { x: 60, y: 87.5, w: 11, h: 5.5, shape: "circle" },
        caption: { en: "WhatsApp chat", hi: "WhatsApp चैट" },
        instruction: {
          en: "Open the WhatsApp chat of the person. Tap the small paperclip icon near the message box.",
          hi: "उस व्यक्ति की WhatsApp चैट खोलिए। मैसेज बॉक्स के पास छोटे पेपरक्लिप निशान पर tap कीजिए।",
        },
        simple: {
          en: "At the bottom, next to the white writing box, there is a tiny pin shape. Touch it once.",
          hi: "नीचे सफेद लिखने वाले बॉक्स के पास एक छोटी पिन जैसी आकृति है। उसे एक बार छूइए।",
        },
      },
      {
        screen: "wa-attach",
        highlight: { x: 66, y: 58.5, w: 26, h: 11 },
        caption: { en: "Choose Location", hi: "Location चुनिए" },
        instruction: {
          en: "In the small menu, tap on Location.",
          hi: "छोटे मेन्यू में Location पर tap कीजिए।",
        },
        simple: {
          en: "Among the round coloured icons, one says Location and looks like a map pin. Touch that one.",
          hi: "गोल रंगीन निशानों में एक पर Location लिखा है और वह नक्शे की पिन जैसा दिखता है। उसी को छूइए।",
        },
      },
      {
        screen: "wa-location",
        highlight: { x: 14, y: 66, w: 72, h: 12 },
        caption: { en: "Send current location", hi: "मौजूदा लोकेशन भेजें" },
        instruction: {
          en: "Tap on 'Send your current location'. If the phone asks for permission, tap Allow.",
          hi: "'Send your current location' पर tap कीजिए। अगर फोन इजाज़त माँगे तो Allow दबाइए।",
        },
        simple: {
          en: "A map appears. Just below it there is a line that offers to send where you are right now. Touch that line.",
          hi: "एक नक्शा दिखेगा। उसके ठीक नीचे एक लाइन है जो अभी की जगह भेजने को कहती है। उसी लाइन को छूइए।",
        },
      },
    ],
  },
  {
    id: "wa-video-call",
    emoji: "📞",
    title: { en: "Make a WhatsApp Video Call", hi: "WhatsApp वीडियो कॉल करना" },
    keywords: ["video call", "वीडियो कॉल", "call karna", "whatsapp call", "face call"],
    steps: [
      {
        screen: "wa-chat",
        highlight: { x: 79, y: 1, w: 10, h: 5, shape: "circle" },
        caption: { en: "Top of the chat", hi: "चैट के ऊपर" },
        instruction: {
          en: "Open the WhatsApp chat of the person you want to call. Look at the top of the screen.",
          hi: "जिसे कॉल करना है उसकी WhatsApp चैट खोलिए। स्क्रीन के सबसे ऊपर देखिए।",
        },
        simple: {
          en: "At the very top you can see their name and photo, and two small icons on the right side.",
          hi: "सबसे ऊपर उनका नाम और फोटो दिखता है, और दाईं तरफ दो छोटे निशान हैं।",
        },
      },
      {
        screen: "wa-chat",
        highlight: { x: 79, y: 1, w: 10, h: 5, shape: "circle" },
        caption: { en: "Video camera icon", hi: "वीडियो कैमरा निशान" },
        instruction: {
          en: "Tap the video camera icon at the top right.",
          hi: "ऊपर दाईं तरफ वीडियो कैमरा के निशान पर tap कीजिए।",
        },
        simple: {
          en: "Of the two small icons at the top, the one shaped like a little movie camera is for video calling. Touch it.",
          hi: "ऊपर के दो निशानों में से जो छोटे मूवी कैमरे जैसा है, वही वीडियो कॉल के लिए है। उसे छूइए।",
        },
      },
      {
        screen: "wa-calling",
        highlight: { x: 30, y: 82, w: 40, h: 12 },
        caption: { en: "Calling…", hi: "कॉल हो रही है…" },
        instruction: {
          en: "The call starts ringing. Wait for them to answer. To end the call, tap the red button.",
          hi: "कॉल जाने लगेगी। उनके उठाने का इंतज़ार कीजिए। कॉल बंद करने के लिए लाल बटन दबाइए।",
        },
        simple: {
          en: "You will see their name and the phone will ring. When they pick up, you can see and talk to them.",
          hi: "उनका नाम दिखेगा और घंटी बजेगी। जब वे उठाएँगे, आप उन्हें देख और बात कर सकेंगे।",
        },
      },
    ],
  },
  {
    id: "scan-qr",
    emoji: "🔳",
    title: { en: "Scan a QR Code", hi: "QR कोड स्कैन करना" },
    keywords: ["qr", "scan", "क्यूआर", "qr code", "scan karna", "barcode"],
    steps: [
      {
        screen: "camera-qr",
        highlight: { x: 26, y: 30, w: 48, h: 32 },
        caption: { en: "Point the camera", hi: "कैमरा सामने कीजिए" },
        instruction: {
          en: "Open the Camera app and point it at the square QR code. Hold your hand steady.",
          hi: "Camera ऐप खोलिए और उसे चौकोर QR कोड के सामने कीजिए। हाथ को स्थिर रखिए।",
        },
        simple: {
          en: "Hold the phone about one hand's distance away, so the whole square black-and-white picture fits on the screen.",
          hi: "फोन को लगभग एक हाथ की दूरी पर पकड़िए, ताकि पूरा काला-सफेद चौकोर चित्र स्क्रीन में आ जाए।",
        },
      },
      {
        screen: "camera-qr",
        highlight: { x: 18, y: 66, w: 64, h: 12 },
        caption: { en: "A link appears", hi: "एक लिंक दिखेगा" },
        instruction: {
          en: "Wait two seconds. A small yellow bar with a link will appear on the screen.",
          hi: "दो सेकंड रुकिए। स्क्रीन पर एक छोटी पीली पट्टी में लिंक दिखाई देगा।",
        },
        simple: {
          en: "Do not press anything yet. The phone reads the code by itself and shows a small message.",
          hi: "अभी कुछ मत दबाइए। फोन खुद कोड पढ़ लेता है और एक छोटा संदेश दिखाता है।",
        },
      },
      {
        screen: "qr-link",
        highlight: { x: 14, y: 40, w: 72, h: 16 },
        caption: { en: "Open only if you trust it", hi: "भरोसा हो तभी खोलें" },
        instruction: {
          en: "Only open the link if you trust where the QR code came from. If you are unsure, do not open it, and ask someone you trust.",
          hi: "लिंक तभी खोलिए जब आपको QR कोड की जगह पर भरोसा हो। शक हो तो मत खोलिए, और किसी भरोसेमंद व्यक्ति से पूछिए।",
        },
        simple: {
          en: "Read the name shown in the message. If it is a shop or place you know, you can touch it. If it looks strange, leave it.",
          hi: "संदेश में दिखा नाम पढ़िए। अगर वह जानी-पहचानी दुकान या जगह है तो छू सकते हैं। अजीब लगे तो छोड़ दीजिए।",
        },
      },
    ],
  },
];

export function findTask(id: string | null | undefined): Task | undefined {
  return TASKS.find((task) => task.id === id);
}

/** Simple local intent match, used before falling back to the AI. */
export function matchTask(query: string): Task | undefined {
  const q = query.toLowerCase();
  let best: { task: Task; score: number } | undefined;
  for (const task of TASKS) {
    let score = 0;
    for (const kw of task.keywords) if (q.includes(kw.toLowerCase())) score += kw.length;
    if (score > 0 && (!best || score > best.score)) best = { task, score };
  }
  return best?.task;
}
