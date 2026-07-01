"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GraduationCap, ArrowLeft, Sparkles } from "lucide-react";
import { chapters, features } from "@/lib/site-data";
import { ChapterCard } from "./ChapterCard";
import { FeatureCard } from "./FeatureCard";
import { Statistics } from "./Statistics";
import { SectionTitle } from "./SectionTitle";
import { staggerContainer, fadeUp, zoomIn, viewportOnce } from "@/lib/motion";

export function HomeContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Statistics */}
      <section className="-mt-10 pb-20">
        <Statistics />
      </section>

      {/* Chapters */}
      <section id="الفصول" className="scroll-mt-24 py-16">
        <SectionTitle
          eyebrow="محتوى المقرر"
          title="فصول المقرر"
          description="ستة فصول تأخذك من أساسيات التصميم الرقمي إلى الدارات التتابعية المتقدّمة."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </motion.div>
      </section>

      {/* Course questions highlight */}
      <section className="py-16">
        <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card/40 to-accent/10 p-8 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                مميّز
              </span>
              <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                حل نماذج من أسئلة الدورات
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                حلول مفصّلة خطوة بخطوة لنماذج أسئلة الدورات السابقة، لتصل إلى
                الامتحان وأنت مستعدّ تماماً.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-300">
                قريباً
              </span>
            </div>

            <Link
              href="/past-questions"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              <GraduationCap className="h-5 w-5" />
              استعرض الأسئلة
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="المميزات" className="scroll-mt-24 py-16">
        <SectionTitle
          eyebrow="لماذا هذه المنصّة؟"
          title="مميّزات تجعل التعلّم أسهل"
          description="كل ما تحتاجه لإتقان الدارات المنطقية في مكان واحد."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-border-soft/70 glass p-10 text-center sm:p-14"
        >
          <h3 className="text-2xl font-extrabold sm:text-3xl">
            جاهز لتبدأ رحلتك في <span className="text-gradient">المنطق الرقمي</span>؟
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            انطلق من الفصل الأول وتدرّج نحو الاحتراف خطوة بخطوة.
          </p>
          <Link
            href="/#الفصول"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            ابدأ التعلم الآن
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
