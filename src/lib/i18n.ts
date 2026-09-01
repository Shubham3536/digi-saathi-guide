export type Lang = "en" | "hi";

export type Bi = { en: string; hi: string };

export const t = {
  appName: { en: "DigiSaathi", hi: "DigiSaathi" },
  tagline: { en: "Your friendly smartphone guide", hi: "आपका अपना स्मार्टफोन साथी" },
  heading: { en: "How can I help you today?", hi: "आज मैं आपकी कैसे मदद करूँ?" },
  support: {
    en: "Tell me what you want to do on your phone. You can speak or type. I will show you exactly where to tap.",
    hi: "फोन पर क्या करना है, मुझे बताइए। आप बोल सकते हैं या टाइप कर सकते हैं। मैं आपको ठीक दिखाऊँगा कि कहाँ tap करना है।",
  },
  avatarHello: { en: "Hello! I am DigiSaathi.", hi: "नमस्ते! मैं DigiSaathi हूँ।" },
  avatarMsg: {
    en: "There is no need to worry about making a mistake. We will do it together, one step at a time.",
    hi: "गलती होने की चिंता मत कीजिए। हम इसे एक-एक कदम करके साथ में करेंगे।",
  },
  talk: { en: "🎤 Talk to DigiSaathi", hi: "🎤 DigiSaathi से बात करें" },
  listening: { en: "Listening… speak in Hindi or English", hi: "सुन रहा हूँ… हिंदी या अंग्रेज़ी में बोलिए" },
  heard: { en: "I heard: {text}", hi: "मैंने सुना: {text}" },
  speakingNow: { en: "DigiSaathi is speaking…", hi: "DigiSaathi बोल रहा है…" },
  tapAvatar: { en: "Tap me to hear my voice", hi: "मेरी आवाज़ सुनने के लिए मुझे tap कीजिए" },
  micDenied: {
    en: "The microphone is blocked. Please allow microphone access in your browser and try again.",
    hi: "माइक बंद है। कृपया browser में माइक की अनुमति दें और दोबारा कोशिश करें।",
  },
  micNoSpeech: {
    en: "I could not hear you clearly. Please tap the big button and speak again — Hindi is fine too.",
    hi: "मैं ठीक से सुन नहीं पाया। बड़ा बटन दबाकर दोबारा बोलिए — हिंदी में भी बोल सकते हैं।",
  },
  thinking: { en: "One moment, I am thinking…", hi: "एक पल, मैं सोच रहा हूँ…" },
  micUnsupported: {
    en: "Your browser does not support the microphone. Please type your question instead.",
    hi: "आपके browser में माइक काम नहीं करता। कृपया अपना सवाल टाइप कीजिए।",
  },
  textPlaceholder: {
    en: "Example: How do I take a screenshot?",
    hi: "उदाहरण: Screenshot कैसे लेते हैं?",
  },
  ask: { en: "Ask", hi: "पूछें" },
  popular: { en: "Popular help", hi: "आम मदद" },
  stepOf: { en: "STEP {a} OF {b}", hi: "कदम {a} / {b}" },
  tapHere: { en: "Tap here", hi: "यहाँ tap करें" },
  next: { en: "Next Step →", hi: "अगला कदम →" },
  finish: { en: "I finished ✓", hi: "हो गया ✓" },
  repeat: { en: "🔊 Repeat", hi: "🔊 दोबारा सुनें" },
  dontUnderstand: { en: "I don't understand", hi: "मुझे समझ नहीं आया" },
  startOver: { en: "↺ Start Over", hi: "↺ फिर से शुरू करें" },
  back: { en: "← Home", hi: "← होम" },
  androidNotice: {
    en: "Android menus may look slightly different on your phone.",
    hi: "आपके फोन के मॉडल के अनुसार स्क्रीन थोड़ी अलग दिख सकती है।",
  },
  aiNotice: {
    en: "DigiSaathi is an AI assistant. It provides guidance and may sometimes make mistakes. It will never ask for your password, PIN, OTP or bank details.",
    hi: "DigiSaathi एक AI सहायक है। यह मार्गदर्शन देता है और कभी-कभी गलती भी कर सकता है। यह आपसे कभी password, PIN, OTP या बैंक जानकारी नहीं माँगेगा।",
  },
  wellDone: { en: "🎉 Well done!", hi: "🎉 शाबाश!" },
  didHelp: { en: "Did DigiSaathi help you?", hi: "क्या DigiSaathi ने आपकी मदद की?" },
  yes: { en: "👍 Yes", hi: "👍 हाँ" },
  somewhat: { en: "😐 Somewhat", hi: "😐 थोड़ा-बहुत" },
  no: { en: "👎 No", hi: "👎 नहीं" },
  useAgain: { en: "Would you use DigiSaathi again?", hi: "क्या आप DigiSaathi दोबारा इस्तेमाल करेंगे?" },
  plainYes: { en: "Yes", hi: "हाँ" },
  plainNo: { en: "No", hi: "नहीं" },
  confusing: { en: "What was confusing? (optional)", hi: "क्या बात समझ नहीं आई? (ज़रूरी नहीं)" },
  sendFeedback: { en: "Send", hi: "भेजें" },
  thanks: { en: "Thank you! Your answer helps us improve.", hi: "धन्यवाद! आपके जवाब से हम बेहतर बनेंगे।" },
  askAnother: { en: "Ask something else", hi: "कुछ और पूछें" },
  notSure: {
    en: "I am not fully sure about that one. Here is my best guidance — please check your phone screen as you go.",
    hi: "इस बारे में मैं पूरी तरह निश्चित नहीं हूँ। यह मेरी सबसे अच्छी सलाह है — साथ-साथ अपनी स्क्रीन ज़रूर देखते रहिए।",
  },
  errorMsg: {
    en: "Sorry, I could not answer just now. Please try again, or choose one of the common tasks below.",
    hi: "माफ़ कीजिए, मैं अभी जवाब नहीं दे पाया। दोबारा कोशिश कीजिए, या नीचे दिए काम में से कोई चुनिए।",
  },
} satisfies Record<string, Bi>;

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key][lang];
}
