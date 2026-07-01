"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <AnimatedBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent glow-accent"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          منصة تعليمية متخصّصة في المنطق الرقمي
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
        >
          شرح مقرر <span className="text-gradient">الدارات المنطقية</span> بالكامل
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          تعلم جميع مفاهيم الدارات المنطقية من الصفر وحتى الاحتراف مع شرح مبسّط
          وأمثلة وأسئلة الدورات.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/#الفصول"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/50"
          >
            <BookOpen className="h-5 w-5" />
            ابدأ التعلم
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/past-questions"
            className="inline-flex items-center gap-2 rounded-xl border border-border-soft glass px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
          >
            <GraduationCap className="h-5 w-5" />
            حل أسئلة الدورات
          </Link>
        </motion.div>
      </motion.div>

      {/* fade to page background at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
