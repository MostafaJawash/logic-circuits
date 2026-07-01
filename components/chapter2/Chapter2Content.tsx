"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "motion/react";
import { List, ChevronDown, GraduationCap, Clock, Sparkles } from "lucide-react";
import { getIcon } from "@/lib/icons";
import {
  sections,
  navItems,
  chapterHero,
  readingMinutes,
  type Section,
} from "@/lib/chapter-2";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { BlockRenderer } from "./LessonBlocks";

/* الاختبار ثقيل نسبياً — نحمّله كسولاً لتحسين الأداء */
const Quiz = dynamic(() => import("./Quiz").then((m) => m.Quiz), {
  ssr: false,
  loading: () => (
    <div className="grid place-items-center py-20 text-muted">
      <Sparkles className="h-8 w-8 animate-pulse text-accent" />
    </div>
  ),
});

export function Chapter2Content() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [percent, setPercent] = useState(0);
  const [activeId, setActiveId] = useState("top");
  const [tocOpen, setTocOpen] = useState(false);

  const activeLabel = useMemo(
    () => navItems.find((n) => n.id === activeId)?.label ?? chapterHero.title,
    [activeId],
  );

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setPercent(Math.round(v * 100)));
    return () => unsub();
  }, [scrollYProgress]);

  // تتبّع الفقرة الحالية أثناء التمرير
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <>
      {/* شريط تقدّم القراءة */}
      <div className="fixed inset-x-0 top-16 z-40 h-1 bg-transparent lg:right-72">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-right bg-gradient-to-l from-primary via-accent to-emerald-400"
        />
      </div>

      {/* نسبة القراءة + الفقرة الحالية */}
      <div className="fixed bottom-5 left-5 z-40 hidden flex-col items-start gap-1 rounded-2xl glass px-4 py-3 shadow-lg sm:flex">
        <span className="flex items-center gap-2 text-sm font-bold text-accent">
          <GraduationCap className="h-4 w-4" />
          {percent}%
        </span>
        <span className="max-w-[14rem] truncate text-xs text-muted">{activeLabel}</span>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* الهيرو */}
        <header id="top" className="scroll-mt-24">
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
              {chapterHero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted">
              {chapterHero.subtitle}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-soft/70 bg-card/40 px-3 py-1.5 text-muted">
                <Clock className="h-4 w-4 text-accent" />
                زمن القراءة ≈ {readingMinutes} دقائق
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-soft/70 bg-card/40 px-3 py-1.5 text-muted">
                <List className="h-4 w-4 text-accent" />
                {sections.length} فقرة
              </span>
            </motion.div>
          </motion.div>
        </header>

        <div className="mt-10 lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">
          {/* المحتوى */}
          <main className="min-w-0 space-y-8 lg:order-1">
            {sections.map((section) => {
              const Icon = getIcon(section.icon);
              return section.divider ? (
                <DividerBanner
                  key={section.id}
                  section={section}
                  icon={<Icon className="h-5 w-5" />}
                />
              ) : (
                <SectionCard
                  key={section.id}
                  section={section}
                  icon={<Icon className="h-6 w-6" />}
                />
              );
            })}

            {/* فاصل نهاية الدرس */}
            <QuizSeparator />

            <motion.section
              id="quiz"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
              className="scroll-mt-24"
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gradient sm:text-4xl">
                  اختبار الفصل الثاني
                </h2>
                <p className="mt-2 text-muted">25 سؤالاً لقياس فهمك للفصل — بالتوفيق!</p>
              </div>
              <Quiz />
            </motion.section>
          </main>

          {/* التنقل الجانبي الملتصق (سطح المكتب) */}
          <aside className="hidden lg:order-2 lg:block">
            <nav className="sticky top-24 rounded-3xl border border-border-soft/70 bg-gradient-to-b from-card/50 to-secondary/30 p-4 backdrop-blur-sm">
              <p className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-2">
                <List className="h-4 w-4" />
                محتويات الفصل
              </p>
              <ul className="max-h-[70vh] space-y-1 overflow-y-auto pl-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-medium transition-all ${
                        activeId === item.id
                          ? "bg-primary/15 text-white ring-1 ring-primary/40"
                          : "text-muted hover:bg-card/60 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                          activeId === item.id ? "bg-accent" : "bg-muted-2/40"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      {/* التنقل القابل للطي (الجوال) */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        {tocOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-3 mb-2 max-h-[55vh] overflow-y-auto rounded-2xl border border-border-soft glass-strong p-3"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-right text-sm font-medium transition-all ${
                      activeId === item.id
                        ? "bg-primary/20 text-white"
                        : "text-muted hover:bg-card/60"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        activeId === item.id ? "bg-accent" : "bg-muted-2/40"
                      }`}
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        <button
          onClick={() => setTocOpen((o) => !o)}
          className="mx-3 mb-3 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-2xl border border-primary/30 bg-gradient-to-l from-primary to-accent px-5 py-3 text-sm font-bold text-white shadow-lg"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            محتويات الفصل
          </span>
          <span className="flex items-center gap-2">
            {percent}%
            <ChevronDown className={`h-4 w-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </span>
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function DividerBanner({ section, icon }: { section: Section; icon: React.ReactNode }) {
  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
      className="flex scroll-mt-24 items-center gap-4"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30">
        {icon}
      </span>
      <h2 className="text-2xl font-extrabold text-white">{section.title}</h2>
      <span className="h-px flex-1 bg-gradient-to-l from-accent/40 to-transparent" />
    </motion.div>
  );
}

function SectionCard({ section, icon }: { section: Section; icon: React.ReactNode }) {
  return (
    <motion.section
      id={section.id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="group relative scroll-mt-24 overflow-hidden rounded-3xl border border-border-soft/70 bg-gradient-to-b from-card/50 to-secondary/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 sm:p-8"
    >
      {/* توهج خفيف عند التحويم */}
      <span className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <motion.div variants={fadeUp} className="mb-6 flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-accent ring-1 ring-primary/30 transition-transform group-hover:scale-105">
          {icon}
        </span>
        <h2 className="pt-1 text-xl font-bold leading-relaxed text-white sm:text-2xl">
          {section.title}
        </h2>
      </motion.div>

      <div className="space-y-5">
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </motion.section>
  );
}

function QuizSeparator() {
  return (
    <div className="relative flex items-center justify-center py-6">
      <span className="h-px w-full bg-gradient-to-l from-transparent via-accent/40 to-transparent" />
      <span className="absolute grid h-12 w-12 place-items-center rounded-full border border-accent/30 bg-background text-accent">
        <GraduationCap className="h-6 w-6" />
      </span>
    </div>
  );
}
