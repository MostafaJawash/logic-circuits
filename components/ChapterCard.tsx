"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { STATUS_LABEL, type Chapter } from "@/lib/site-data";
import { fadeUp } from "@/lib/motion";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const Icon = getIcon(chapter.icon);
  const soon = chapter.status === "coming-soon";

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft/70 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 spotlight" />

      {/* faint chapter numeral watermark */}
      <span className="pointer-events-none absolute -top-4 left-4 select-none font-mono text-8xl font-black text-white/[0.03]">
        {chapter.order}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-accent ring-1 ring-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-7 w-7" />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            soon
              ? "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20"
              : "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20"
          }`}
        >
          {STATUS_LABEL[chapter.status]}
        </span>
      </div>

      <div className="relative mt-5 flex-1">
        <p className="text-sm font-semibold text-accent">{chapter.title}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug">{chapter.subtitle}</h3>

        {chapter.topics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chapter.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-lg bg-secondary/60 px-2.5 py-1 text-xs text-muted"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href={`/${chapter.slug}`}
        className="relative mt-6 inline-flex items-center justify-between gap-2 rounded-xl border border-border-soft bg-secondary/40 px-4 py-3 text-sm font-semibold transition-all group-hover:border-accent/40 group-hover:bg-primary/15"
      >
        عرض الفصل
        <ArrowLeft className="h-4 w-4 text-accent transition-transform group-hover:-translate-x-1" />
      </Link>
    </motion.article>
  );
}
