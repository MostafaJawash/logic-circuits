import type { Metadata } from "next";
import { chapters } from "@/lib/site-data";
import { Chapter2Content } from "@/components/chapter2/Chapter2Content";

const chapter = chapters.find((c) => c.slug === "chapter-2")!;

export const metadata: Metadata = {
  title: `${chapter.title} — ${chapter.subtitle}`,
  description:
    "الفصل الثاني من مقرر الدارات المنطقية: أنظمة العد والتحويلات والترميز — القانون العام للأوزان، MSB و LSB، النيبل والأساس، التحويل بين الأنظمة (ثنائي، ثماني، ست عشري، عشري)، الإشارة والقيمة، المتمم إلى واحد واثنين، BCD و Excess_3، مع اختبار تفاعلي وتحليل للأداء.",
};

export default function Page() {
  return <Chapter2Content />;
}
