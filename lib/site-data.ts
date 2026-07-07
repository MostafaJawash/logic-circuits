import type { IconName } from "./icons";

export type Status = "coming-soon" | "available";

export const STATUS_LABEL: Record<Status, string> = {
  "coming-soon": "قريباً",
  available: "متاح الآن",
};

export interface Chapter {
  id: number;
  order: string; // Arabic-Indic display numeral
  slug: string; // used as the route segment
  title: string;
  subtitle: string;
  topics: string[];
  icon: IconName;
  status: Status;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    order: "١",
    slug: "chapter-1",
    title: "الفصل الأول",
    subtitle: "مفاهيم التصميم الرقمي",
    topics: ["الأجهزة الرقمية", "الفرق بين الرقمي والتماثلي", "مستويات التصميم"],
    icon: "Cpu",
    status: "available",
  },
  {
    id: 2,
    order: "٢",
    slug: "chapter-2",
    title: "الفصل الثاني",
    subtitle: "أنظمة العد والترميز",
    topics: ["الأنظمة العددية", "التحويل بين الأنظمة", "شيفرات الترميز"],
    icon: "Binary",
    status: "available",
  },
  {
    id: 3,
    order: "٣",
    slug: "chapter-3",
    title: "الفصل الثالث",
    subtitle: "الدارات الرقمية ونظريات الجبر البولياني",
    topics: ["البوابات المنطقية", "نظريات بول", "تبسيط العبارات"],
    icon: "CircuitBoard",
    status: "available",
  },
  {
    id: 4,
    order: "٤",
    slug: "chapter-4",
    title: "الفصل الرابع",
    subtitle: "المنطق التركيبي",
    topics: ["SOP", "POS", "خرائط كارنوف"],
    icon: "BrainCircuit",
    status: "available",
  },
  {
    id: 5,
    order: "٥",
    slug: "chapter-5",
    title: "الفصل الخامس",
    subtitle: "الدارات التركيبية الوظيفية",
    topics: [
      "النواخب",
      "الموزعات",
      "المرمزات",
      "كواشف الترميز",
      "الجوامع",
      "الطوارح",
    ],
    icon: "Calculator",
    status: "coming-soon",
  },
  {
    id: 6,
    order: "٦",
    slug: "chapter-6",
    title: "الفصل السادس",
    subtitle: "الدارات التتابعية",
    topics: ["القلابات", "السجلات", "العدادات"],
    icon: "ToggleRight",
    status: "coming-soon",
  },
];

export interface SimpleLink {
  label: string;
  href: string;
  icon?: IconName;
}

/** Top navigation bar links */
export const navLinks: SimpleLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الفصول", href: "/#الفصول" },
  { label: "الاختبارات", href: "/quizzes" },
  { label: "أسئلة الدورات", href: "/past-questions" },
  { label: "حول الموقع", href: "/#المميزات" },
  { label: "تواصل معنا", href: "/#تواصل" },
];

/** Desktop sidebar sections */
export const sidebarLinks: SimpleLink[] = [
  { label: "الرئيسية", href: "/", icon: "Home" },
  ...chapters.map((c) => ({
    label: c.title,
    href: `/${c.slug}`,
    icon: c.icon,
  })),
  { label: "الاختبارات", href: "/quizzes", icon: "ListChecks" },
  { label: "أسئلة الدورات", href: "/past-questions", icon: "FileQuestion" },
];

export interface Feature {
  title: string;
  description: string;
  icon: IconName;
}

export const features: Feature[] = [
  {
    title: "شرح مبسط",
    description: "مفاهيم معقدة مقدّمة بأسلوب واضح ومتدرّج يناسب المبتدئ والمتقدّم.",
    icon: "BookOpen",
  },
  {
    title: "أمثلة عملية",
    description: "أمثلة تطبيقية على كل مفهوم لترسيخ الفهم وربط النظرية بالواقع.",
    icon: "Cpu",
  },
  {
    title: "رسومات توضيحية",
    description: "مخططات ودارات ورسومات تفاعلية تجعل استيعاب المنطق الرقمي أسهل.",
    icon: "ImageIcon",
  },
  {
    title: "أسئلة تدريبية",
    description: "بنك أسئلة متدرّج الصعوبة لاختبار فهمك بعد كل درس.",
    icon: "PencilRuler",
  },
  {
    title: "حل الدورات",
    description: "حلول مفصّلة لنماذج أسئلة الدورات السابقة خطوة بخطوة.",
    icon: "GraduationCap",
  },
  {
    title: "شرح من الصفر",
    description: "لا يتطلّب خبرة سابقة — نبدأ من الأساسيات ونصل بك إلى الاحتراف.",
    icon: "Sparkles",
  },
];

export interface Stat {
  label: string;
  value: string;
  icon: IconName;
}

export const stats: Stat[] = [
  { label: "عدد الفصول", value: "٦", icon: "BookOpen" },
  { label: "الدروس", value: "قريباً", icon: "CircuitBoard" },
  { label: "الاختبارات", value: "قريباً", icon: "ListChecks" },
  { label: "أسئلة الدورات", value: "قريباً", icon: "FileQuestion" },
];

export const footerLinks: SimpleLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الفصول", href: "/#الفصول" },
  { label: "الاختبارات", href: "/quizzes" },
  { label: "الدورات", href: "/past-questions" },
];
