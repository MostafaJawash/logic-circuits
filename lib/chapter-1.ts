import type { IconName } from "./icons";

/* ------------------------------------------------------------------ */
/*  الفصل الأول — المحتوى                                              */
/*  IMPORTANT: النصوص أدناه مطابقة تماماً للدرس الأصلي — لا تُعدَّل.     */
/* ------------------------------------------------------------------ */

export type Block =
  | { kind: "def"; term: string; body: string }
  | { kind: "p"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "checks"; items: string[] }
  | { kind: "tools"; items: string[] }
  | { kind: "levels"; items: string[] }
  | { kind: "plaLevels"; items: string[] }
  | { kind: "question"; q: string; a: string };

export interface Section {
  id: string;
  navLabel: string;
  title: string;
  icon: IconName;
  divider?: boolean;
  blocks: Block[];
}

/** رأس الصفحة */
export const chapterHero = {
  eyebrow: "الفصل الأول",
  title: "الفصل الأول",
  subtitle: "النظري — مفاهيم التصميم الرقمي",
};

export const sections: Section[] = [
  {
    id: "theory",
    navLabel: "النظري",
    title: "النظري :",
    icon: "BookOpen",
    divider: true,
    blocks: [],
  },
  {
    id: "difference",
    navLabel: "الفرق بين الإشارات",
    title: "1. الفرق بين الإشارات التماثلية وإشارات الرقمية :",
    icon: "Binary",
    blocks: [
      {
        kind: "def",
        term: "التماثلية",
        body: "إشارات تأخذ قيم مستمرة مع تغير الزمن يمكن ان يتغير فيها الخرج حسب عوامل ( الضغط و الحركة ... ).",
      },
      {
        kind: "def",
        term: "الرقمية",
        body: "إشارات قيمها متقطعة ( 0 ، 1 ، فقط ) نتعامل بها أغلب النظم الثنائية تعطي تماما الخارج نفسه في كل مرة تطبيق بها فيها مداخل معينة ( لا يتأثر بالعوامل الخارجية )",
      },
    ],
  },
  {
    id: "advantages",
    navLabel: "مزايا التصميم الرقمي",
    title: "مزايا التصميم الرقمي : متى يعتبر هذا النظام افضل من غيره ؟ اذا كان له هذه المواصفات",
    icon: "Sparkles",
    blocks: [
      {
        kind: "list",
        items: [
          "سهولة التصميم",
          "المرونة والفعالية .",
          "قابلية البرمجة : عن طريق لغات توصيف العتاد HDL ( hardware definiton lang )",
          "السرعة .",
          "الاقتصادية : كلفه بطاقة مقابل عمل كبير .",
          "التطور التكنولوجي المضطرد : قابل للتغير المرن مع تغير التقنيات وتحديثها.",
        ],
      },
      {
        kind: "checks",
        items: [
          "❖ يمكن لمداخل ومخارج الأجهزة الرقمية أن تكون قيم تماثلية (جهد تيار ضغط ) ( ✓ )",
          "❖ يمكن تحقيق أي تابع رقمي باستخدام البوابات AND و OR و NOT فقط ( ✓ )",
          "❖ القلاب Flip-Flop جهاز يخزن إما 0 أو 1 ( جهاز يخزن بت واحد ) ( ✓ )",
          "❖ حالة state القلاب تعني القيمة الحالية المخزنة في القلب عند لحظة معينة تحددها نبضات الساعة . ( ✓ )",
          "❖ تعتمد القيمة الجديدة للقلاب بناء على القيمة الراهنة وعلى قيم مداخل التحكم فقط . ( ✓ )",
          "❖ تسمى الدارة الرقمية المكونة من قلابات (الدارة التابعية Sequential Circuit ) ( ✓ )",
        ],
      },
      {
        kind: "question",
        q: "• لماذا سميت الدارات التابعية بهذا الاسم ؟",
        a: "لأن الخرج في الدارات التابعية يعتمد على القيم الراهنة للداخل وعلى عدد من القيم السابقة للخارج أو في أنواع أخرى ، يعتمد الخرج على القيم الراهنة للداخل اوعلى عدد من القيم السابقة للداخل اوعلى عدد من القيم السابقة للخارج وقيم سابقة كل داخل .\nبشكل مختصر : لها ذاكرة لتخزين الأحداث السابقة (دخل ، خرج ) . أي عملها تتابعي .",
      },
    ],
  },
  {
    id: "noise-margin",
    navLabel: "هامش الضجيج",
    title: "هامش الضجيج Noise Margin ماذا يعني :",
    icon: "Zap",
    blocks: [
      {
        kind: "p",
        text: "هي منطقة افقية بين الصفر النظري (0V) او الواحد المنطقي (5V ) مهمته يعطي مسافة امان من إشارات التشويش والضجيج لحمايتها من الاخطاء.",
      },
      { kind: "subheading", text: "أهم الوسائل البرمجية المستخدمة في التصميم الرقمي هي :" },
      {
        kind: "tools",
        items: [
          "❖ محرر المخططات .",
          "❖ لغات توصيف العتاد HDLs ( مثل لغة VHDL، لغة ABEL )",
          "❖ أدوات الترجمة والمحاكاة للغات HDL.",
          "❖ المحاكيات Simulators، اختبار سلوك الدارة قبل تصنيع الصنع الفعلي .",
        ],
      },
    ],
  },
  {
    id: "ics",
    navLabel: "الدارات المتكاملة",
    title: "الدارات المتكاملة : ( ICs ) Integrated Circuit",
    icon: "CircuitBoard",
    blocks: [
      { kind: "p", text: "عدة بوابات منطقية في دارة واحدة لها التقنية نفسها ." },
      { kind: "p", text: "تنقسم 4 اجزاء حسب عدد البوابات المشكلة للدارة الأساسية :" },
      {
        kind: "levels",
        items: [
          "🖎 Small Scale integration SSI لا يزيد عدد بواباتها عن 10 بوابات .",
          "🖎 MSI Medium : من 10 الى 100 بوابة .",
          "🖎 LSI Large Scale integrt أكثر من 100 بوابة ( 1000 - 100 )",
          "🖎 VLSI very large : الاف البوابات .",
        ],
      },
    ],
  },
  {
    id: "pla",
    navLabel: "PLA",
    title: "• المصفوفات المنطقية ( القابلة للبرمجة لها مستويان ) ( programmable logic Array ( PLA",
    icon: "Cpu",
    blocks: [
      {
        kind: "plaLevels",
        items: [
          "✓ المستوى الأول : مكون من بوابات AND فقط .",
          "✓ المستوى الثاني : مكون من بوابات OR فقط .",
        ],
      },
    ],
  },
  {
    id: "digital-devices",
    navLabel: "الأجهزة الرقمية",
    title: "الأجهزة الرقمية القابلة للبرمجة",
    icon: "BrainCircuit",
    blocks: [
      {
        kind: "question",
        q: "• مم تتكون الأجهزة الرقمية القابلة للبرمجة ؟",
        a: "من PLA أو PAL ( نفس PLA) ومصفوفات منطقية قابلة للبرمجة بدرجة تكامل MSI ( من 10 - 100 بوابة ) .",
      },
    ],
  },
  {
    id: "pld",
    navLabel: "PLD",
    title: "PLD / CPLD / FGPA",
    icon: "PencilRuler",
    blocks: [
      { kind: "p", text: "PLD programmable logic Device جهاز منطقي قابل للبرمجة" },
      {
        kind: "p",
        text: "CPLD : complicated Programmable logic device يتكون من عدة PLD مع توصيلات مناسبة .",
      },
      {
        kind: "p",
        text: "FGPA : Field programmable Gate logic Array مصفوفات البوابات القابلة للبرمجة تحوي عدد اكبر من الوحدات المنطقية الصغيرة في الشريحة الواحدة",
      },
    ],
  },
  {
    id: "moore",
    navLabel: "قانون مور",
    title: "قانون مور",
    icon: "Sigma",
    blocks: [
      {
        kind: "p",
        text: "★ قانون مور : عدد الترانزستورات في الإنش المربع من دارة متكاملة يتضاعف كل سنة .",
      },
      { kind: "p", text: "ثم انخفض هذا المعدل ليصبح التضاعف كل 18 شهراً ( سنة ونصف ) ." },
      { kind: "p", text: "زيادة السرعة ← زيادة عدد الترانزستورات ." },
      { kind: "p", text: "★ الدارة المتكاملة 74×157 ( هيكل اسمها ) لها درجة تكامل MSI." },
    ],
  },
];

/** عناصر التنقل — بترتيب ظهورها في الدرس لتتبّع التمرير */
export const navItems: { id: string; label: string }[] = [
  { id: "top", label: "الفصل الأول" },
  ...sections.map((s) => ({ id: s.id, label: s.navLabel })),
];

/* ------------------------------------------------------------------ */
/*  اختبار الفصل الأول — 25 سؤالاً مستمدة من الدرس فقط                  */
/* ------------------------------------------------------------------ */

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  difficulty: Difficulty;
  /** معرّف الفقرة لربط الأخطاء بالتحليل */
  section: string;
  question: string;
  options: string[];
  /** فهرس الإجابة الصحيحة ضمن options كما وردت */
  answer: number;
  explanation: string;
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "سهل",
  medium: "متوسط",
  hard: "صعب",
};

/** لعرض اسم الفقرة في لوحة التحليلات */
export const sectionLabel: Record<string, string> = Object.fromEntries(
  sections.map((s) => [s.id, s.navLabel]),
);

export const questions: Question[] = [
  {
    id: 1,
    difficulty: "easy",
    section: "difference",
    question: "ما هي الإشارات التي تأخذ قيماً مستمرة مع تغير الزمن؟",
    options: ["التماثلية", "الرقمية", "الثنائية المتقطعة", "إشارات الساعة"],
    answer: 0,
    explanation:
      "التماثلية : إشارات تأخذ قيم مستمرة مع تغير الزمن يمكن ان يتغير فيها الخرج حسب عوامل ( الضغط و الحركة ... ).",
  },
  {
    id: 2,
    difficulty: "easy",
    section: "difference",
    question: "قيم الإشارات الرقمية تكون:",
    options: ["متقطعة ( 0 ، 1 ، فقط )", "مستمرة مع الزمن", "متغيرة حسب الضغط", "تماثلية"],
    answer: 0,
    explanation: "الرقمية : إشارات قيمها متقطعة ( 0 ، 1 ، فقط ) نتعامل بها أغلب النظم الثنائية.",
  },
  {
    id: 3,
    difficulty: "medium",
    section: "difference",
    question: "ما الذي يميّز الإشارة الرقمية من حيث الخرج؟",
    options: [
      "تعطي تماماً الخارج نفسه في كل مرة ولا تتأثر بالعوامل الخارجية",
      "يتغير خرجها حسب الضغط والحركة",
      "تأخذ قيماً مستمرة مع الزمن",
      "لا يمكن التنبؤ بخرجها إطلاقاً",
    ],
    answer: 0,
    explanation:
      "الرقمية ... تعطي تماما الخارج نفسه في كل مرة تطبيق بها فيها مداخل معينة ( لا يتأثر بالعوامل الخارجية ).",
  },
  {
    id: 4,
    difficulty: "medium",
    section: "difference",
    question: "العوامل التي قد يتغير بسببها خرج الإشارة التماثلية تشمل:",
    options: ["الضغط والحركة", "نبضات الساعة", "عدد البوابات", "درجة التكامل"],
    answer: 0,
    explanation:
      "التماثلية : إشارات تأخذ قيم مستمرة مع تغير الزمن يمكن ان يتغير فيها الخرج حسب عوامل ( الضغط و الحركة ... ).",
  },
  {
    id: 5,
    difficulty: "easy",
    section: "advantages",
    question: "أي مما يلي يُعدّ من مزايا التصميم الرقمي؟",
    options: [
      "سهولة التصميم",
      "الاعتماد الدائم على العوامل الخارجية",
      "ارتفاع الكلفة دائماً",
      "بطء التنفيذ",
    ],
    answer: 0,
    explanation: "من مزايا التصميم الرقمي: سهولة التصميم.",
  },
  {
    id: 6,
    difficulty: "medium",
    section: "advantages",
    question: "قابلية البرمجة في التصميم الرقمي تتحقق عن طريق:",
    options: [
      "لغات توصيف العتاد HDL",
      "المحاكيات فقط",
      "زيادة الترانزستورات",
      "المصفوفات المنطقية",
    ],
    answer: 0,
    explanation: "قابلية البرمجة : عن طريق لغات توصيف العتاد HDL ( hardware definiton lang ).",
  },
  {
    id: 7,
    difficulty: "medium",
    section: "advantages",
    question: "ماذا يُقصد بميزة \"الاقتصادية\" في التصميم الرقمي؟",
    options: [
      "كلفة بطاقة مقابل عمل كبير",
      "مجاني تماماً بلا كلفة",
      "لا يحتاج إلى أي صيانة",
      "لا يستهلك طاقة كهربائية",
    ],
    answer: 0,
    explanation: "الاقتصادية : كلفه بطاقة مقابل عمل كبير .",
  },
  {
    id: 8,
    difficulty: "easy",
    section: "advantages",
    question: "القلاب Flip-Flop جهاز:",
    options: [
      "يخزن إما 0 أو 1 ( يخزن بت واحد )",
      "يخزن بايت كامل",
      "يولّد إشارة تماثلية",
      "يضاعف عدد الترانزستورات",
    ],
    answer: 0,
    explanation: "القلاب Flip-Flop جهاز يخزن إما 0 أو 1 ( جهاز يخزن بت واحد ).",
  },
  {
    id: 9,
    difficulty: "medium",
    section: "advantages",
    question: "تسمى الدارة الرقمية المكونة من قلابات:",
    options: [
      "الدارة التابعية Sequential Circuit",
      "الدارة التركيبية",
      "المصفوفة المنطقية PLA",
      "الدارة المتكاملة IC",
    ],
    answer: 0,
    explanation: "تسمى الدارة الرقمية المكونة من قلابات (الدارة التابعية Sequential Circuit ).",
  },
  {
    id: 10,
    difficulty: "hard",
    section: "advantages",
    question: "لماذا سميت الدارات التابعية بهذا الاسم؟",
    options: [
      "لأن لها ذاكرة لتخزين الأحداث السابقة (دخل ، خرج) وعملها تتابعي",
      "لأنها لا تحتوي على أي ذاكرة",
      "لأنها تعتمد على قيم الدخل الراهنة فقط",
      "لأنها مكونة من بوابات AND فقط",
    ],
    answer: 0,
    explanation:
      "بشكل مختصر : لها ذاكرة لتخزين الأحداث السابقة (دخل ، خرج ) . أي عملها تتابعي .",
  },
  {
    id: 11,
    difficulty: "easy",
    section: "noise-margin",
    question: "ما هو هامش الضجيج Noise Margin؟",
    options: [
      "منطقة افقية بين الصفر النظري (0V) او الواحد المنطقي (5V) تعطي مسافة أمان من التشويش",
      "نوع من البوابات المنطقية",
      "قانون لعدد الترانزستورات",
      "جهاز يخزن بت واحد",
    ],
    answer: 0,
    explanation:
      "هي منطقة افقية بين الصفر النظري (0V) او الواحد المنطقي (5V ) مهمته يعطي مسافة امان من إشارات التشويش والضجيج لحمايتها من الاخطاء.",
  },
  {
    id: 12,
    difficulty: "medium",
    section: "noise-margin",
    question: "ما وظيفة هامش الضجيج؟",
    options: [
      "إعطاء مسافة أمان من إشارات التشويش والضجيج لحمايتها من الأخطاء",
      "زيادة عدد الترانزستورات",
      "تخزين البتات",
      "برمجة البوابات المنطقية",
    ],
    answer: 0,
    explanation:
      "مهمته يعطي مسافة امان من إشارات التشويش والضجيج لحمايتها من الاخطاء.",
  },
  {
    id: 13,
    difficulty: "medium",
    section: "noise-margin",
    question: "أي مما يلي مثال على لغات توصيف العتاد HDLs؟",
    options: ["VHDL و ABEL", "AND و OR", "SSI و MSI", "PLA و PAL"],
    answer: 0,
    explanation: "لغات توصيف العتاد HDLs ( مثل لغة VHDL، لغة ABEL ).",
  },
  {
    id: 14,
    difficulty: "medium",
    section: "noise-margin",
    question: "ما وظيفة المحاكيات Simulators؟",
    options: [
      "اختبار سلوك الدارة قبل تصنيع الصنع الفعلي",
      "تخزين البيانات الثنائية",
      "زيادة سرعة المعالج",
      "رسم المخططات فقط",
    ],
    answer: 0,
    explanation: "المحاكيات Simulators، اختبار سلوك الدارة قبل تصنيع الصنع الفعلي .",
  },
  {
    id: 15,
    difficulty: "easy",
    section: "ics",
    question: "الدارات المتكاملة ICs هي:",
    options: [
      "عدة بوابات منطقية في دارة واحدة لها التقنية نفسها",
      "قلاب واحد يخزن بت",
      "لغة توصيف عتاد",
      "هامش أمان من الضجيج",
    ],
    answer: 0,
    explanation: "عدة بوابات منطقية في دارة واحدة لها التقنية نفسها .",
  },
  {
    id: 16,
    difficulty: "medium",
    section: "ics",
    question: "درجة التكامل SSI يكون عدد بواباتها:",
    options: [
      "لا يزيد عن 10 بوابات",
      "من 10 إلى 100 بوابة",
      "أكثر من 100 بوابة",
      "آلاف البوابات",
    ],
    answer: 0,
    explanation: "Small Scale integration SSI لا يزيد عدد بواباتها عن 10 بوابات .",
  },
  {
    id: 17,
    difficulty: "hard",
    section: "ics",
    question: "درجة التكامل MSI Medium تضم عدد بوابات:",
    options: ["من 10 الى 100 بوابة", "أقل من 10 بوابات", "أكثر من 1000 بوابة", "آلاف البوابات"],
    answer: 0,
    explanation: "MSI Medium : من 10 الى 100 بوابة .",
  },
  {
    id: 18,
    difficulty: "medium",
    section: "ics",
    question: "درجة التكامل التي تحوي آلاف البوابات هي:",
    options: ["VLSI very large", "SSI", "MSI", "LSI"],
    answer: 0,
    explanation: "VLSI very large : الاف البوابات .",
  },
  {
    id: 19,
    difficulty: "medium",
    section: "pla",
    question: "في المصفوفات المنطقية PLA، المستوى الأول مكوّن من بوابات:",
    options: ["AND فقط", "OR فقط", "NOT فقط", "NAND فقط"],
    answer: 0,
    explanation: "المستوى الأول : مكون من بوابات AND فقط .",
  },
  {
    id: 20,
    difficulty: "medium",
    section: "pla",
    question: "في المصفوفات المنطقية PLA، المستوى الثاني مكوّن من بوابات:",
    options: ["OR فقط", "AND فقط", "NOT فقط", "XOR فقط"],
    answer: 0,
    explanation: "المستوى الثاني : مكون من بوابات OR فقط .",
  },
  {
    id: 21,
    difficulty: "medium",
    section: "digital-devices",
    question: "مم تتكون الأجهزة الرقمية القابلة للبرمجة؟",
    options: [
      "من PLA أو PAL ومصفوفات منطقية قابلة للبرمجة بدرجة تكامل MSI",
      "من قلابات فقط",
      "من ترانزستور واحد",
      "من هامش الضجيج فقط",
    ],
    answer: 0,
    explanation:
      "من PLA أو PAL ( نفس PLA) ومصفوفات منطقية قابلة للبرمجة بدرجة تكامل MSI ( من 10 - 100 بوابة ) .",
  },
  {
    id: 22,
    difficulty: "hard",
    section: "digital-devices",
    question: "ما العلاقة بين PAL و PLA؟",
    options: ["PAL هو نفس PLA", "PAL نقيض PLA", "PAL أكبر من VLSI", "لا علاقة بينهما"],
    answer: 0,
    explanation: "من PLA أو PAL ( نفس PLA) ...",
  },
  {
    id: 23,
    difficulty: "medium",
    section: "pld",
    question: "الـ CPLD يتكون من:",
    options: [
      "عدة PLD مع توصيلات مناسبة",
      "قلاب واحد",
      "بوابة AND واحدة",
      "هامش ضجيج",
    ],
    answer: 0,
    explanation:
      "CPLD : complicated Programmable logic device يتكون من عدة PLD مع توصيلات مناسبة .",
  },
  {
    id: 24,
    difficulty: "medium",
    section: "pld",
    question: "ما الذي يميّز الـ FGPA؟",
    options: [
      "مصفوفات بوابات قابلة للبرمجة تحوي عدداً أكبر من الوحدات المنطقية الصغيرة في الشريحة الواحدة",
      "يخزن بت واحد فقط",
      "لا يمكن برمجته",
      "يتكون من بوابة OR فقط",
    ],
    answer: 0,
    explanation:
      "FGPA : Field programmable Gate logic Array مصفوفات البوابات القابلة للبرمجة تحوي عدد اكبر من الوحدات المنطقية الصغيرة في الشريحة الواحدة.",
  },
  {
    id: 25,
    difficulty: "hard",
    section: "moore",
    question: "ماذا ينص قانون مور؟",
    options: [
      "عدد الترانزستورات في الإنش المربع يتضاعف كل سنة ثم أصبح كل 18 شهراً",
      "عدد الترانزستورات ينخفض كل سنة",
      "السرعة تنخفض بزيادة الترانزستورات",
      "عدد البوابات ثابت لا يتغير",
    ],
    answer: 0,
    explanation:
      "قانون مور : عدد الترانزستورات في الإنش المربع من دارة متكاملة يتضاعف كل سنة . ثم انخفض هذا المعدل ليصبح التضاعف كل 18 شهراً ( سنة ونصف ) .",
  },
];
