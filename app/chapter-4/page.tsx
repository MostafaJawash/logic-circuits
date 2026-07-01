import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { chapters } from "@/lib/site-data";

const chapter = chapters.find((c) => c.slug === "chapter-4")!;

export const metadata: Metadata = {
  title: `${chapter.title} — ${chapter.subtitle}`,
  description: `شرح ${chapter.subtitle} ضمن مقرر الدارات المنطقية.`,
};

export default function Page() {
  return (
    <ComingSoon
      eyebrow={chapter.title}
      title={chapter.subtitle}
      description="سنشرح المنطق التركيبي وطرق التمثيل SOP و POS وتبسيط الدوال باستخدام خرائط كارنوف."
      icon={chapter.icon}
      topics={chapter.topics}
    />
  );
}
