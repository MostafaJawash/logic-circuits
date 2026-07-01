import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "الاختبارات",
  description: "اختبارات تفاعلية على مفاهيم الدارات المنطقية لقياس مدى فهمك.",
};

export default function Page() {
  return (
    <ComingSoon
      eyebrow="قسم الاختبارات"
      title="الاختبارات التفاعلية"
      description="اختبارات قصيرة على كل فصل مع تصحيح فوري ونتائج تساعدك على معرفة نقاط قوّتك ومواضع تحسينك."
      icon="ListChecks"
      topics={["اختبارات قصيرة", "تصحيح فوري", "نتائج مفصّلة"]}
    />
  );
}
