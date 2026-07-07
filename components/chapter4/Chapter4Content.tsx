"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { GraduationCap, ListChecks, Sparkles } from "lucide-react";
import { chapterHero, questions } from "@/lib/chapter-4";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/* الاختبار ثقيل نسبياً — نحمّله كسولاً لتحسين الأداء */
const Quiz = dynamic(() => import("./Quiz").then((m) => m.Quiz), {
  ssr: false,
  loading: () => (
    <div className="grid place-items-center py-20 text-muted">
      <Sparkles className="h-8 w-8 animate-pulse text-accent" />
    </div>
  ),
});

export function Chapter4Content() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* الهيرو */}
      <header className="scroll-mt-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card/50 to-secondary/40 p-8 text-center glow-primary sm:p-12"
        >
          <div className="spotlight pointer-events-none absolute inset-0" />
          <motion.span
            variants={fadeUp}
            className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl bg-primary/20 text-accent ring-1 ring-primary/40"
          >
            <GraduationCap className="h-10 w-10" />
            <span className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl" />
          </motion.span>
          <motion.p variants={fadeUp} className="mb-2 text-sm font-semibold text-accent">
            {chapterHero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl"
          >
            {chapterHero.subtitle}
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-soft/70 bg-card/40 px-3 py-1.5 text-muted">
              <ListChecks className="h-4 w-4 text-accent" />
              {questions.length} سؤالاً امتحانياً
            </span>
          </motion.div>
        </motion.div>
      </header>

      {/* الاختبار */}
      <motion.section
        id="quiz"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="mt-10 scroll-mt-24"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gradient sm:text-4xl">اختبار الفصل الرابع</h2>
          <p className="mt-2 text-muted">
            {questions.length} سؤالاً بمستوى امتحاني متقدم — مع تحليل للأداء حسب الفقرات في نهاية الاختبار.
          </p>
        </div>
        <Quiz />
      </motion.section>
    </div>
  );
}
