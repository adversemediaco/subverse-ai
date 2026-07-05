/**
 * Application-wide constants for SubVerse AI
 */

export const APP_NAME = "SubVerse AI";
export const APP_DESCRIPTION = "Turn Any Video Into Content For Every Platform.";
export const APP_URL = "https://subverse.ai";

// Navigation links
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;

// Dashboard navigation
export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Upload", href: "/dashboard/upload", icon: "Upload" },
  { label: "Projects", href: "/dashboard/projects", icon: "FolderOpen" },
  { label: "Subtitles", href: "/dashboard/subtitles", icon: "Captions" },
  { label: "Translations", href: "/dashboard/translations", icon: "Globe" },
  { label: "AI Content", href: "/dashboard/content", icon: "Sparkles" },
  { label: "Export", href: "/dashboard/export", icon: "Download" },
  { label: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

// Supported languages for translation
export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "hinglish", name: "Hinglish", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
] as const;

// Features list
export const FEATURES = [
  {
    title: "AI Speech Recognition",
    description: "State-of-the-art Whisper model transcribes speech with 99%+ accuracy across 100+ languages.",
    icon: "Mic",
    gradient: "from-blue-glow to-cyan-bright",
  },
  {
    title: "AI Translation",
    description: "Neural machine translation preserves tone, context, and cultural nuances perfectly.",
    icon: "Globe",
    gradient: "from-purple-glow to-pink",
  },
  {
    title: "Subtitle Editor",
    description: "Professional timeline editor with frame-accurate sync, style presets, and batch editing.",
    icon: "Captions",
    gradient: "from-cyan-bright to-blue-glow",
  },
  {
    title: "Smart Export",
    description: "Export to SRT, VTT, burned captions, or share directly to any platform in seconds.",
    icon: "Download",
    gradient: "from-violet-bright to-purple-glow",
  },
  {
    title: "Hashtag Generator",
    description: "AI-powered hashtag suggestions optimize reach across Instagram, TikTok, and YouTube.",
    icon: "Hash",
    gradient: "from-pink to-purple-glow",
  },
  {
    title: "SEO Optimizer",
    description: "Generates titles, descriptions, and metadata that rank on search engines.",
    icon: "Search",
    gradient: "from-blue-glow to-violet-bright",
  },
] as const;

// Pricing plans
export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 0,
    period: "forever",
    description: "Perfect for trying SubVerse AI",
    features: [
      "5 videos per month",
      "720p max resolution",
      "Basic subtitles",
      "3 languages",
      "SRT export",
      "Community support",
    ],
    limitations: ["No burned captions", "No AI content", "Basic analytics"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For content creators & marketers",
    features: [
      "50 videos per month",
      "4K resolution",
      "AI subtitles + captions",
      "50 languages",
      "Burned captions",
      "AI content generation",
      "Hashtag & SEO tools",
      "Priority processing",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For agencies & large teams",
    features: [
      "Unlimited videos",
      "8K resolution",
      "All 100+ languages",
      "Custom AI models",
      "API access",
      "Team collaboration",
      "Custom branding",
      "Dedicated support",
      "SLA guarantee",
      "Admin dashboard",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Aarav Patel",
    role: "YouTube Creator",
    avatar: "/images/avatar-1.jpg",
    content: "SubVerse AI cut my editing time by 80%. The Hinglish captions are incredibly natural — my audience loves them.",
    rating: 5,
    followers: "2.4M",
    platform: "YouTube",
  },
  {
    name: "Sarah Chen",
    role: "Content Director",
    avatar: "/images/avatar-2.jpg",
    content: "We process 200+ videos monthly. The batch processing and API integration saved us $50k in translation costs.",
    rating: 5,
    followers: "Team of 45",
    platform: "Agency",
  },
  {
    name: "Marcus Johnson",
    role: "Podcast Host",
    avatar: "/images/avatar-3.jpg",
    content: "Speaker detection is spot-on. It correctly identifies all 4 hosts and generates perfect transcripts every time.",
    rating: 5,
    followers: "890K",
    platform: "Spotify",
  },
  {
    name: "Priya Sharma",
    role: "Instagram Influencer",
    avatar: "/images/avatar-4.jpg",
    content: "The auto-generated Instagram captions and hashtags have increased my reach by 340%. It's like having a social media manager.",
    rating: 5,
    followers: "3.1M",
    platform: "Instagram",
  },
  {
    name: "Alex Rivera",
    role: "Film Director",
    avatar: "/images/avatar-5.jpg",
    content: "Professional subtitle quality that rivals manual transcription. The timeline editor is industry-grade.",
    rating: 5,
    followers: "15 Films",
    platform: "Netflix",
  },
  {
    name: "Yuki Tanaka",
    role: "Tech Educator",
    avatar: "/images/avatar-6.jpg",
    content: "Translating coding tutorials to Japanese while preserving technical accuracy is incredible. My Japanese audience grew 500%.",
    rating: 5,
    followers: "1.8M",
    platform: "YouTube",
  },
] as const;

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "How does the AI transcription work?",
    answer: "SubVerse AI uses OpenAI's Whisper large model combined with our proprietary fine-tuning. It processes audio at 10x realtime speed with 99%+ accuracy across 100+ languages, including code-switching detection for Hinglish content.",
  },
  {
    question: "What video formats are supported?",
    answer: "We support all major formats: MP4, MOV, AVI, MKV, WebM, FLV, and more. Videos can be up to 4K resolution on Pro plans and 8K on Enterprise. Maximum file size is 5GB per video.",
  },
  {
    question: "How accurate are the translations?",
    answer: "Our neural machine translation system achieves BLEU scores comparable to professional human translators. We preserve context, tone, and cultural nuances. For critical content, you can use our built-in editor for manual fine-tuning.",
  },
  {
    question: "Can I burn captions directly into my video?",
    answer: "Yes! Pro and Enterprise plans include burned caption export. Choose from 20+ caption styles including TikTok-style animated text, Netflix subtitles, YouTube CC format, and custom branded styles.",
  },
  {
    question: "Is there an API for automation?",
    answer: "Enterprise plans include full REST API access with webhooks. You can automate your entire video processing pipeline — upload, transcribe, translate, generate content, and export programmatically.",
  },
  {
    question: "How does speaker detection work?",
    answer: "Our AI uses advanced diarization to identify and label different speakers in your video. It works with up to 10 speakers simultaneously and maintains consistent labeling throughout the transcript.",
  },
  {
    question: "What about data privacy and security?",
    answer: "All videos are encrypted in transit and at rest. We use Cloudflare R2 for storage with automatic deletion after 30 days (configurable). Enterprise plans include dedicated infrastructure and SOC 2 compliance.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. All plans are month-to-month with no long-term contracts. Cancel anytime from your dashboard — you'll retain access until the end of your billing period.",
  },
] as const;

// Trusted companies/brands logos (names only since we'll use text logos)
export const TRUSTED_BY = [
  "Netflix",
  "Spotify",
  "Adobe",
  "YouTube",
  "TikTok",
  "Meta",
  "Discord",
  "Figma",
  "Notion",
  "Linear",
  "Vercel",
  "Stripe",
] as const;

// Competitor comparison
export const COMPARISON = {
  features: [
    "AI Transcription",
    "100+ Languages",
    "Hinglish Support",
    "Burned Captions",
    "AI Content Generation",
    "SEO Optimization",
    "Hashtag Generator",
    "Speaker Detection",
    "Timeline Editor",
    "API Access",
    "Custom Styles",
    "Batch Processing",
  ],
  competitors: [
    {
      name: "SubVerse AI",
      values: [true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      name: "Rev.com",
      values: [true, true, false, false, false, false, false, true, false, true, false, true],
    },
    {
      name: "Kapwing",
      values: [true, false, false, true, false, false, false, false, true, false, true, false],
    },
    {
      name: "Descript",
      values: [true, true, false, true, false, false, false, true, true, false, true, false],
    },
  ],
} as const;

// Subtitle style presets
export const SUBTITLE_STYLES = [
  { id: "tiktok", name: "TikTok Style", description: "Bold, animated word-by-word" },
  { id: "youtube", name: "YouTube CC", description: "Classic bottom subtitles" },
  { id: "netflix", name: "Netflix", description: "Clean white on dark" },
  { id: "podcast", name: "Podcast", description: "Speaker-labeled format" },
  { id: "instagram", name: "Instagram", description: "Gradient animated captions" },
  { id: "minimal", name: "Minimal", description: "Understated, elegant" },
] as const;

// Export formats
export const EXPORT_FORMATS = [
  { id: "srt", name: "SRT", description: "SubRip subtitle format" },
  { id: "vtt", name: "VTT", description: "Web Video Text Tracks" },
  { id: "ass", name: "ASS/SSA", description: "Advanced SubStation Alpha" },
  { id: "json", name: "JSON", description: "Structured data format" },
  { id: "txt", name: "Plain Text", description: "Simple text transcript" },
  { id: "burned", name: "Burned Video", description: "Captions embedded in video" },
] as const;
