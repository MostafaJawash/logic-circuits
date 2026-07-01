"use client";

import { motion } from "motion/react";
import { CheckCircle2, HelpCircle, Sparkle, ChevronLeft } from "lucide-react";
import type { Block } from "@/lib/chapter-1";
import { fadeUp, staggerContainer } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  عناصر عرض المحتوى — كل صندوق يحافظ على النص كما هو تماماً           */
/* ------------------------------------------------------------------ */

function DefinitionBox({ term, body }: { term: string; body: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-card/40 p-5 transition-all hover:border-primary/50"
    >
      <span className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-primary to-accent" />
      <div className="flex items-center gap-2">
        <Sparkle className="h-4 w-4 text-accent" />
        <span className="rounded-lg bg-primary/20 px-3 py-1 text-sm font-bold text-accent ring-1 ring-primary/30">
          {term}
        </span>
      </div>
      <p className="mt-3 leading-loose text-slate-200">{body}</p>
    </motion.div>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <motion.p variants={fadeUp} className="leading-loose text-slate-200">
      {text}
    </motion.p>
  );
}

function SubHeading({ text }: { text: string }) {
  return (
    <motion.h3
      variants={fadeUp}
      className="flex items-center gap-2 text-lg font-bold text-white"
    >
      <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-accent to-primary" />
      {text}
    </motion.h3>
  );
}

function ModernList({ items }: { items: string[] }) {
  return (
    <motion.ul variants={staggerContainer} className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUp}
          className="group flex items-start gap-3 rounded-xl border border-border-soft/70 bg-card/40 p-3.5 transition-all hover:border-accent/40 hover:bg-card/70"
        >
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/20 text-xs font-bold text-accent ring-1 ring-primary/30">
            {i + 1}
          </span>
          <span className="leading-relaxed text-slate-200">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function SuccessChecks({ items }: { items: string[] }) {
  return (
    <motion.ul variants={staggerContainer} className="space-y-2.5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUp}
          whileHover={{ x: -4 }}
          className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3.5"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <span className="leading-relaxed text-emerald-50">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function ToolsList({ items }: { items: string[] }) {
  return (
    <motion.ul variants={staggerContainer} className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUp}
          className="flex items-start gap-3 rounded-xl border border-border-soft/70 bg-secondary/40 p-3.5 transition-colors hover:border-accent/40"
        >
          <ChevronLeft className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <span className="leading-relaxed text-slate-200">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function LevelsList({ items }: { items: string[] }) {
  const accents = [
    "from-sky-500/15 border-sky-500/30 text-sky-300",
    "from-emerald-500/15 border-emerald-500/30 text-emerald-300",
    "from-amber-500/15 border-amber-500/30 text-amber-300",
    "from-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300",
  ];
  return (
    <motion.ul variants={staggerContainer} className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUp}
          className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br to-card/40 p-4 leading-relaxed text-slate-100 ${
            accents[i % accents.length]
          }`}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function PlaLevels({ items }: { items: string[] }) {
  return (
    <motion.ul variants={staggerContainer} className="space-y-2.5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUp}
          className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/10 p-3.5"
        >
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/20 text-sm font-bold text-accent">
            {i + 1}
          </span>
          <span className="leading-relaxed text-cyan-50">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function QuestionBox({ q, a }: { q: string; a: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-card/40"
    >
      <div className="flex items-start gap-3 border-b border-amber-400/20 bg-amber-400/10 p-4">
        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <p className="font-bold leading-relaxed text-amber-100">{q}</p>
      </div>
      <div className="p-4">
        {a.split("\n").map((line, i) => (
          <p key={i} className="leading-loose text-slate-200 [&:not(:first-child)]:mt-2">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** يوزّع كل كتلة إلى المكوّن المناسب */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "def":
      return <DefinitionBox term={block.term} body={block.body} />;
    case "p":
      return <Paragraph text={block.text} />;
    case "subheading":
      return <SubHeading text={block.text} />;
    case "list":
      return <ModernList items={block.items} />;
    case "checks":
      return <SuccessChecks items={block.items} />;
    case "tools":
      return <ToolsList items={block.items} />;
    case "levels":
      return <LevelsList items={block.items} />;
    case "plaLevels":
      return <PlaLevels items={block.items} />;
    case "question":
      return <QuestionBox q={block.q} a={block.a} />;
  }
}
