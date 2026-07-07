import type { Metadata } from "next";
import { chapters } from "@/lib/site-data";
import { Chapter4Content } from "@/components/chapter4/Chapter4Content";

const chapter = chapters.find((c) => c.slug === "chapter-4")!;

export const metadata: Metadata = {
  title: `${chapter.title} — ${chapter.subtitle}`,
  description:
    "اختبار الفصل الرابع من مقرر الدارات المنطقية: أسئلة امتحانية على المنطق التركيبي، صيغ SOP وPOS، حالات عدم التعيين، وتبسيط التوابع بمخططات كارنوف، مع تحليل للأداء حسب الفقرات.",
};

export default function Page() {
  return <Chapter4Content />;
}
