import type { Metadata } from "next";
import { chapters } from "@/lib/site-data";
import { Chapter3Content } from "@/components/chapter3/Chapter3Content";

const chapter = chapters.find((c) => c.slug === "chapter-3")!;

export const metadata: Metadata = {
  title: `${chapter.title} — ${chapter.subtitle}`,
  description:
    "اختبار الفصل الثالث من مقرر الدارات المنطقية: 25 سؤالاً امتحانياً على الدارات الرقمية ونظريات الجبر البولياني، الازدواجية، نظريات المتحول الواحد، جداول الحقيقة والبوابات المنطقية، مع تحليل للأداء حسب الفقرات.",
};

export default function Page() {
  return <Chapter3Content />;
}
