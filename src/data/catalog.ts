import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import a1 from "@/assets/article-1.jpg";
import a2 from "@/assets/article-2.jpg";
import a3 from "@/assets/article-3.jpg";
import divorceHero from "@/assets/divorce-hero.jpg";
import customProductsRaw from "./custom_products.json";
import divorceImg from "@/assets/divorce.png";
import nakedNoiseImg from "@/assets/naked-noise.png";
import extrovertImg from "@/assets/extrovert.png";
import noExitImg from "@/assets/no-exit.png";
import egoImg from "@/assets/ego.png";
import burningAttractionImg from "@/assets/burning-attraction.png";
import ego10mlImg from "@/assets/ego-10ml.png";
import nakedNoise10mlImg from "@/assets/naked-noise-10ml.png";
import noExit10mlImg from "@/assets/no-exit-10ml.png";
import scukEyes10mlImg from "@/assets/scuk-eyes-10ml.png";
import scukEyesImg from "@/assets/scuk-eyes.jpeg";
import divorce15mlImg from "@/assets/divorce-15ml.png";

export type Product = {
  slug: string;
  name: string;
  category: "Oud Base" | "Floral Base" | "Fruity Base" | "Fresh Base" | string;
  price: number;
  priceLabel: string;
  img: string;
  hr: string;
  description: string;
  base?: "OUD_BASE" | "FLORAL_BASE" | "FRUITY_BASE" | "FRESH_BASE";
  isCustom?: boolean;
  pricing?: Record<string, number>;
  badge?: "Bestseller" | "Only 2 Left" | "";
  featuredOnHomepage?: boolean;
  heroTitle?: string;
  heroDescription?: string;
  hoverImg?: string;
  gallery?: string[];
};

export const PRODUCTS: Product[] = [
  // --- OUD BASE ---
  {
    slug: "divorce-perfume",
    name: "DIVORCE",
    category: "Honey & Oud",
    price: 1400,
    priceLabel: "₹1,400",
    img: divorceImg,
    hr: "24 HR",
    description: "ഈ പെർഫ്യൂമിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ ഏഴ് മാസത്തോളമായി ഞങ്ങൾ ഇത് ലോഞ്ച് ചെയ്തിട്ട്. എന്താണ് ഇതിന്റെ ফീൽ? ഒരു വലിയ തറവാട്ടിൽ ഒരുപാട് പൈസയുള്ള ആളെപ്പോലെ. ഒരു 4000 രൂപയുടെ പെർഫ്യൂം ആണ് അടിച്ചിരിക്കുന്നത് എന്ന് മറ്റുള്ളവർക്ക് തോന്നും. ഒരാൾ വന്ന് ഹഗ്ഗ് ചെയ്താൽ പോലും ഈ സുഗന്ധം അവരുടെ ഡ്രസ്സിലോട്ട് പകരും. നമ്മൾ എവിടെ നിൽക്കുകയാണോ അവിടെ നിന്ന് മാറിയാൽ പോലും ആ ഏരിയയിൽ ഈ സുഗന്ധം തങ്ങിനിൽക്കും. ഞങ്ങളുടെ പെർഫ്യൂമിൽ ഏറ്റവും മികച്ചത്. ഒരു പുതിയ കസ്റ്റമർ വരികയാണെങ്കിൽ അവരുടെ ഡ്രസ്സിൽ അടിച്ചതിനു ശേഷം അവരെ പറഞ്ഞുവിടും, 'നിങ്ങൾ ഇപ്പോൾ ഇത് വാങ്ങണ്ട. വീട്ടിൽ പോയി നാളെ ചെക്ക് ചെയ്തതിനു ശേഷം നാളെ മണം നിൽക്കുന്നുണ്ടെങ്കിൽ മാത്രം വാങ്ങിയാൽ മതി' എന്ന്. ഇതാണ് ഞങ്ങളുടെ കോൺഫിഡൻസ്. നമുക്ക് ആരും പെർമനന്റ് അല്ല, ഈ മണമെങ്കിലും ഒരു ദിവസം നിൽക്കുന്നുണ്ട്, അല്ലേ സന്തോഷം?",
    base: "OUD_BASE",
    pricing: { "15 ml": 600, "50 ml": 1400 },
    gallery: [divorce15mlImg]
  },
  {
    slug: "ego",
    name: "EGO",
    category: "Saffron & Oud",
    price: 1300,
    priceLabel: "₹1,300",
    img: egoImg,
    hr: "3 HR",
    description: "ഈ പെർഫ്യൂനെ കുറിച്ച് പറയുകയാണെങ്കിൽ സഫ്രോൺ കുങ്കുമപ്പൂവിന്റെ സുഗന്ധം ഊതും ലെതറും കൂടെ തന്നെയുണ്ട് ഒരു ഫ്രഞ്ച് അറബിക് എല്ലാ ആളുകൾക്കും ദഹിക്കണമെന്നില്ല അല്പം ലക്ഷ്വറിസ്.  സഫറോൺ സുഗന്ധം ഇഷ്ടപ്പെടുന്നവർ മാത്രം കൈവശപ്പെടുത്തുന്നത് സ്മൂത്ത്സിലും ബ്ലെൻഡിങ്ങിലും കൂടുതൽ ശ്രദ്ധ ചെലുത്തിയത് nose ബ്ലൈൻഡ് ആവാൻ സാധ്യതയേറെ",
    base: "OUD_BASE",
    pricing: { "10 ml": 550, "50 ml": 1300 },
    gallery: [ego10mlImg]
  },
  {
    slug: "burning-attraction",
    name: "BURNING ATTRACTION",
    category: "Tobacco & Woody",
    price: 1200,
    priceLabel: "₹1,200",
    img: burningAttractionImg,
    hr: "5 HR",
    description: "ഈ പെർഫ്യൂമിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ. ഒരു ടുബാക്കോ പെർഫ്യൂം കരിഞ്ഞ ഇലകൾ ചന്ദനം മെക്സിക്കൻ ടുബാക്കോ വെൽവെറ്റ് വാനില ഇവയെല്ലാം ചേർന്ന സ്മോക്കി ഫീൽ തരുന്ന ഒരു മസ്കുലിൻ പെർഫ്യൂം. എസി കാറിൽ ഇത് ഉപയോഗിച്ചു പുറത്തിറങ്ങുന്ന സമയം പാർക്കിംഗ് സൈഡിൽ ഉള്ള ആളുകൾക്ക് വിളിച്ചുണർത്തി നിങ്ങളോട് ചോദിക്കാൻ ആഗ്രഹപ്പെടുന്ന ഒന്ന്. കണ്ണുകൾ അടച്ച് ഈ പെർഫ്യൂം സുഗന്ധം നിഫ് ചെയ്യുമ്പോൾ ഒരു ശാന്തത സമാധാനം നിങ്ങൾക്ക് അനുഭവിച്ചറിയാൻ സാധിക്കുന്നുണ്ടെങ്കിൽ നിങ്ങൾ ഇതിന്റെ വശ്യ മനോഹാരിതയിൽ അടിമപ്പെട്ടു പോകുക തന്നെ ചെയ്യും . ഒരു പുരുഷന്റെ സുഗന്ധം വിലകുറഞ്ഞ പുരുഷനെ അല്ല പറഞ്ഞത് ഒരു ബെൻഡ്ലി കാറിൽ സ്യൂട്ട് ആയി വന്നിറങ്ങിയ ഒരു പുരുഷനെ കുറിച്ച്",
    base: "OUD_BASE",
    pricing: { "50 ml": 1200 }
  },
  {
    slug: "no-exit",
    name: "NO EXIT",
    category: "Aged Areca & Oud",
    price: 1800,
    priceLabel: "₹1,800",
    img: noExitImg,
    hr: "10 HR",
    description: "ഈ പെർഫ്യൂമിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ യൂസേഴ്സ് മാത്രം ഇത് ഉപയോഗിക്കുന്ന ഒന്നുതന്നെയാണ് ഇത് തുടക്കക്കാർക്ക് ദഹിക്കണമെന്നില്ല കാരണം ഇത് അല്പം ഊതാണ് ലക്ഷ്വറിസ് ലക്ഷ്വറിയുടെ അവസാനവാക്ക് പുരാതനകാലം പെർഫ്യൂമകളുടെ ലഭ്യത കുറവ് അന്ന് കരയെ മാത്രം ആശ്രയിച്ചിരുന്ന കാലഘട്ടത്തിൽ പേർഷ്യൻ രാജ്യകുടുംബം ഷെയ്ക്ക് റാഷിദ് അൽ മഖ്ദൂം ഫാമിലി മുതൽ ഇങ്ങോട്ട് ഈ കാലഘട്ടത്തിലും ഉപയോഗിച്ചു പോരുന്നത് അറബികളുമായി കൂടുതൽ ബന്ധമുള്ള ആളുകൾക്ക് ഇത് മനസ്സിലാക്കാൻ കഴിയും\nഅടക്ക നീറ്റിയ പോലെയുള്ള ഒരു ഊത് അറബി നാട്ടിൽ വിലയേറിയത് കാരണം അവിടെ അവരുടെ വിലക്കാണ് ഇത് കൊടുക്കുന്നത് ഒരു മലയാളിക്ക് അത് താങ്ങാൻ കഴിയണമെന്നില്ല ഞങ്ങൾ ഇത് ഇവിടെ കൊണ്ടുവന്നത് വലിയ റിസ്ക് തന്നെയാണ്.ഒരു ദിവസം ഒരു വട്ടം സ്പ്രേ ചെയ്യുക ആ ദിവസം മുഴുവൻ ആ ഒരു ഒറ്റ സ്പ്രയിൽ കഴിയുക അതുമതി പിന്നീട് പതിയെ പതിയെ ഇഷ്ടനുസരണം കൂട്ടി ഉപയോഗിക്കാൻ സാധിക്കുമെങ്കിൽ പരീക്ഷിക്കുക നല്ല പെർഫ്യൂം ആണെന്ന് ആളുകൾ പറയാൻ നിങ്ങളോട് മടിക്കും കാരണം അവർക്ക് നിങ്ങളോട് മിണ്ടാൻ പേടിയായിരിക്കും ഭയഭക്തിയാണ് ഇതിന്റെ കാരണം",
    base: "OUD_BASE",
    pricing: { "10 ml": 800, "50 ml": 1800 },
    gallery: [noExit10mlImg]
  },
  {
    slug: "extrovert",
    name: "EXTROVERT",
    category: "Amber & Velvet Oud",
    price: 1300,
    priceLabel: "₹1,300",
    img: extrovertImg,
    hr: "3 HR",
    description: "ഈ പെർഫിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ ഇത് ഒരു ഗൾഫുകാരന്റെ സുഗന്ധം നൽകുന്നു നമുക്ക് വീട്ടിലെ ഫങ്ക്ഷൻസ് ഇവന്റെ എൻഗേജ്മെന്റ് ഇത്തരത്തിലുള്ള ദിവസങ്ങളിൽ അനുയോജ്യമായത് കുടുംബ അംഗങ്ങൾക്കിടയിൽ നമ്മളെ വേറിട്ട് നിർത്തും ഒരു പണക്കാരനെ പോലെ ലൈറ്റ് ആണ് സ്ത്രീകൾക്കും പുരുഷന്മാർക്കും ഒരുപോലെ ഇഷ്ടപ്പെടുന്നത് ഊതും ലെതറും ഉണ്ടെങ്കിലും ആമ്പറിന്റെ സുഗന്ധം അതിനെ വളരെ ലൈറ്റ് ആകുന്നു.തലയ്ക്കു മത് പിടിപ്പിക്കാത്ത വിധത്തിൽ രൂപപ്പെടുത്തിയത്",
    base: "OUD_BASE",
    pricing: { "10 ml": 550, "50 ml": 1300 }
  },
  {
    slug: "naked-noise",
    name: "NAKED NOISE",
    category: "Passion Fruit & Oud",
    price: 1300,
    priceLabel: "₹1,300",
    img: nakedNoiseImg,
    hr: "8 HR",
    description: "ഈ പെർഫ്യൂമിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ വാങ്ങിയ പൈസയ്ക്ക് രണ്ടിരട്ടി ലാഭം തരുന്ന പ്രോഡക്റ്റ് ഇത് ഒരു കസ്റ്റമർക്ക് കാഴ്ചവെക്കുന്ന രീതി രണ്ടു ആളുകളിൽ നിന്ന് ഒരാളെ മാറ്റി 20 മീറ്റർ ദൂരത്തോട്ട് നിർത്തുന്നു . അവിടെവച്ച് അയാൾക്ക് ഈ പെർഫ്യൂം ദേഹത്ത് അടിച്ചു കൊടുക്കുന്നു മറുഭാഗത്ത് നിൽക്കുന്ന ആൾക്ക് ഒരു മിനിറ്റിനുള്ളിൽ ഈ സുഗന്ധം അനുഭവിച്ചറിയാൻ സാധിച്ചാൽ പ്രോഡക്റ്റ് വിൽക്കത്തൊള്ളൂ അടങ്ങിയിരിക്കുന്ന കാര്യങ്ങൾ പാഷൻ ഫ്രൂട്ടിന്റെ വീര്യം കൂടെ ഊതും അതിനിടയിൽ കൂടെ കാന്റീ സുഗന്ധവും. ഇത് ഉപയോഗിച്ച് കടന്നുപോകുമ്പോൾ തലതിരിച്ചു നോക്കാൻ തോന്നിക്കുന്ന വിധം ആകർഷണ മാക്കപ്പെട്ടത്. ഉപയോഗിച്ചതിനു ശേഷം ഒരു വീട്ടിൽ ഗസ്റ്റ് ആയി പോവുകയോ ഒരു കടയിൽ കയറി സാധനം വാങ്ങാൻ പോവുകയോ ചെയ്താൽ അവിടെയുള്ളവർ തമ്മിൽ നോക്കി വന്നിരിക്കുന്ന ആളെ കുറിച്ച് സംസാരവിഷയം ആക്കുന്ന വീര്യം അതാണ് നേക്കഡ് നോയിസ്",
    base: "OUD_BASE",
    pricing: { "10 ml": 550, "50 ml": 1300 },
    gallery: [nakedNoise10mlImg]
  },

  // --- FLORAL BASE ---
  {
    slug: "scuk-eyes",
    name: "SCUK EYES",
    category: "Floral Base",
    price: 1300,
    priceLabel: "₹1,300",
    img: scukEyesImg,
    hr: "12 HR",
    description: "ഈ പെർഫ്യൂമിനെ കുറിച്ച് പറയുകയാണെങ്കിൽ മികച്ച ബ്ലെൻഡിങ്ങിൽ തയാറാക്കിയ ഒരു പ്രീമിയം സുഗന്ധം. ഇതിന്റെ സുഗന്ധം നിങ്ങളുടെ സാന്നിധ്യം മറ്റുള്ളവർക്ക് മുന്നിൽ വിളിച്ചോതും.",
    base: "FLORAL_BASE",
    pricing: { "10 ml": 550, "50 ml": 1300 },
    gallery: [scukEyes10mlImg]
  },
  { slug: "rose-chiffon", name: "Rose Chiffon", category: "Floral Base", price: 4500, priceLabel: "₹4,500", img: p1, hr: "16 HR", description: "Elegant blooming roses, sweet pink peony, and a touch of warm white musk.", base: "FLORAL_BASE" },
  { slug: "jasmine-dew", name: "Jasmine Dew", category: "Floral Base", price: 3800, priceLabel: "₹3,800", img: p2, hr: "10 HR", description: "Night-blooming jasmine, crushed green leaves, and soft morning dew.", base: "FLORAL_BASE" },
  { slug: "velvet-orchid", name: "Velvet Orchid", category: "Floral Base", price: 4800, priceLabel: "₹4,800", img: p4, hr: "20 HR", description: "Deep orchid blossoms, warm vanilla absolute, and dark velvet plum.", base: "FLORAL_BASE" },

  // --- FRUITY BASE ---
  { slug: "peach-nectar", name: "Peach Nectar", category: "Fruity Base", price: 3900, priceLabel: "₹3,900", img: p2, hr: "12 HR", description: "Sweet sun-ripened peach, juicy apricot nectar, and sparkling candy zest.", base: "FRUITY_BASE" },
  { slug: "berry-blush", name: "Berry Blush", category: "Fruity Base", price: 3500, priceLabel: "₹3,500", img: p1, hr: "8 HR", description: "Wild forest raspberries, blackcurrant leaves, and a splash of red apple.", base: "FRUITY_BASE" },
  { slug: "citrus-bloom", name: "Citrus Bloom", category: "Fruity Base", price: 4100, priceLabel: "₹4,100", img: p5, hr: "10 HR", description: "Zesty sun-soaked lemon, sweet orange, and refreshing orange blossom.", base: "FRUITY_BASE" },

  // --- FRESH BASE ---
  { slug: "ocean-breeze", name: "Ocean Breeze", category: "Fresh Base", price: 4200, priceLabel: "₹4,200", img: p3, hr: "24 HR", description: "Crisp sea salt, cool marine accords, and sun-bleached driftwood.", base: "FRESH_BASE" },
  { slug: "minted-rain", name: "Minted Rain", category: "Fresh Base", price: 3600, priceLabel: "₹3,600", img: p4, hr: "8 HR", description: "Crushed wild mint leaves, morning forest dew, and fresh eucalyptus.", base: "FRESH_BASE" },
  { slug: "alpine-air", name: "Alpine Air", category: "Fresh Base", price: 4600, priceLabel: "₹4,600", img: p2, hr: "15 HR", description: "Cool mountain air, green pine needles, and clean white cedarwood.", base: "FRESH_BASE" },
];

export const PRODUCT_IMAGES: Record<string, string> = {
  "product-1": p1,
  "product-2": p2,
  "product-3": p3,
  "product-4": p4,
  "product-5": p5,
  "divorce-hero": divorceHero,
  "divorce": divorceImg,
  "naked-noise": nakedNoiseImg,
  "extrovert": extrovertImg,
  "no-exit": noExitImg,
  "ego": egoImg,
  "burning-attraction": burningAttractionImg,
  "ego-10ml": ego10mlImg,
  "naked-noise-10ml": nakedNoise10mlImg,
  "no-exit-10ml": noExit10mlImg,
  "scuk-eyes-10ml": scukEyes10mlImg,
  "scuk-eyes": scukEyesImg,
  "divorce-15ml": divorce15mlImg,
};

export function getMergedProducts(): Product[] {
  try {
    const custom = customProductsRaw as Product[];
    const mapped = custom.map((c) => ({
      slug: c.slug,
      name: c.name,
      category: c.category,
      price: c.price,
      priceLabel: `₹${c.price.toLocaleString("en-IN")}`,
      img: c.img,
      hr: c.hr || "12 HR",
      description: c.description,
      base: c.base,
      isCustom: true,
      pricing: c.pricing,
      badge: c.badge,
      featuredOnHomepage: c.featuredOnHomepage,
      heroTitle: c.heroTitle,
      heroDescription: c.heroDescription,
      hoverImg: c.hoverImg,
      gallery: c.gallery || [],
    }));
    
    const customSlugs = mapped.map((p) => p.slug);
    const baseProducts = PRODUCTS.filter((p) => !customSlugs.includes(p.slug));
    
    return [...baseProducts, ...mapped];
  } catch {
    return PRODUCTS;
  }
}

export const CATEGORIES = ["All", "Oud Base", "Floral Base", "Fruity Base", "Fresh Base"] as const;


export type Article = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  img: string;
  category: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "no-makeup-makeup-look",
    date: "May 1, 2025",
    title: "How to Achieve the Perfect 'No-Makeup' Makeup Look",
    excerpt: "Learn the layering, lighting, and product choices that create a radiant, effortless face.",
    body: [
      "The no-makeup makeup look is all about enhancing your natural features with the lightest possible touch.",
      "Start with a hydrating base, then sheer out coverage where you need it. Cream products blend into the skin better than powders and keep the finish dewy.",
      "Finish with a touch of flush on the cheeks and a tinted balm on the lips — that's it.",
    ],
    img: a1,
    category: "Makeup",
  },
  {
    slug: "anti-aging-science",
    date: "Apr 25, 2025",
    title: "The Science Behind Anti-Aging: What Actually Works",
    excerpt: "A clear-eyed look at retinoids, peptides, and antioxidants — and what to skip.",
    body: [
      "Anti-aging skincare is one of the most crowded categories, but only a handful of ingredients have meaningful evidence behind them.",
      "Retinoids remain the gold standard. Peptides and vitamin C have growing support. Most else is supporting cast.",
      "Consistency beats intensity. A simple routine you actually follow will outperform a complicated one you can't sustain.",
    ],
    img: a2,
    category: "Skincare",
  },
  {
    slug: "acne-prone-ingredients",
    date: "Apr 23, 2025",
    title: "The Best Ingredients for Acne-Prone Skin (and What to Avoid)",
    excerpt: "Niacinamide, salicylic acid, azelaic acid — your acne-fighting cheat sheet.",
    body: [
      "Acne-prone skin needs ingredients that balance oil, calm inflammation, and clear pores without stripping the barrier.",
      "Salicylic acid, niacinamide, and azelaic acid are reliable workhorses. Avoid heavy occlusives and fragrance-heavy formulas.",
      "Build your routine slowly and patch test new products — the skin barrier is everything.",
    ],
    img: a3,
    category: "Skincare",
  },
];
