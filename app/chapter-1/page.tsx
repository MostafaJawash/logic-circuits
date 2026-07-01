import type { Metadata } from "next";
import { chapters } from "@/lib/site-data";
import { Chapter1Content } from "@/components/chapter1/Chapter1Content";

const chapter = chapters.find((c) => c.slug === "chapter-1")!;

export const metadata: Metadata = {
  title: `${chapter.title} — ${chapter.subtitle}`,
  description:
    "الفصل الأول من مقرر الدارات المنطقية: الفرق بين الإشارات التماثلية والرقمية، مزايا التصميم الرقمي، هامش الضجيج، الدارات المتكاملة، PLA و PLD وقانون مور، مع اختبار تفاعلي وتحليل للأداء.",
};

export default function Page() {
  return <Chapter1Content />;
}
