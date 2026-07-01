"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { getIcon, type IconName } from "@/lib/icons";
import { AnimatedBackground } from "./AnimatedBackground";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ComingSoon({
  eyebrow,
  title,
  description,
  icon,
  topics = [],
}: {
  eyebrow?: string;
  title: string;
  description: string;
  icon: IconName;
  topics?: string[];
}) {
  const Icon = getIcon(icon);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <AnimatedBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={fadeUp}
          className="relative mb-8 grid h-24 w-24 place-items-center rounded-3xl bg-primary/15 text-accent ring-1 ring-primary/30"
        >
          <Icon className="h-12 w-12" />
          <span className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl" />
        </motion.span>

        {eyebrow && (
          <motion.span
            variants={fadeUp}
            className="mb-4 text-sm font-semibold text-accent"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          variants={fadeUp}
          className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
        >
          {description}
        </motion.p>

        {topics.length > 0 && (
          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-2.5"
          >
            {topics.map((topic) => (
              <li
                key={topic}
                className="rounded-xl border border-border-soft bg-card/40 px-4 py-2 text-sm text-muted backdrop-blur-sm"
              >
                {topic}
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div
          variants={fadeUp}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-5 py-2.5 text-sm font-semibold text-amber-300"
        >
          <Clock className="h-4 w-4 animate-pulse" />
          المحتوى قيد الإعداد — قريباً
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-border-soft glass px-6 py-3 text-sm font-semibold transition-all hover:border-accent/50 hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            العودة إلى الرئيسية
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
