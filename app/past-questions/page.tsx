import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "أسئلة الدورات",
  description: "حلول مفصّلة لنماذج أسئلة الدورات السابقة في مقرر الدارات المنطقية.",
};

export default function Page() {
  return (
    <ComingSoon
      eyebrow="أسئلة الدورات"
      title="حل نماذج من أسئلة الدورات"
      description="حلول مفصّلة خطوة بخطوة لنماذج أسئلة الدورات السابقة، لتصل إلى الامتحان وأنت مستعدّ تماماً."
      icon="GraduationCap"
      topics={["نماذج سابقة", "حلول مشروحة", "خطوة بخطوة"]}
    />
  );
}
