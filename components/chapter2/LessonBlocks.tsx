"use client";

import { motion } from "motion/react";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Sigma,
  FunctionSquare,
  Table as TableIcon,
} from "lucide-react";
import type { Block } from "@/lib/chapter-2";
import { fadeUp } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  عناصر عرض المحتوى — كل صندوق يحافظ على النص كما هو تماماً           */
/* ------------------------------------------------------------------ */

function Paragraph({ text }: { text: string }) {
  return (
    <motion.p variants={fadeUp} className="leading-loose text-slate-200">
      {text}
    </motion.p>
  );
}

/** حاوية الصيغ الرياضية — تحافظ على المحتوى دون أي تعديل */
function FormulaBox({ lines }: { lines: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#0b1226]/70 p-5 ring-1 ring-inset ring-white/5"
      dir="ltr"
    >
      <FunctionSquare className="absolute right-3 top-3 h-4 w-4 text-primary/40" />
      <div className="space-y-2 text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            className="font-mono text-base leading-relaxed tracking-wide text-cyan-100 sm:text-lg"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** القانون العام للأوزان — صيغة المجموع بحدودها كما في الدرس */
function SumFormula() {
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#0b1226]/70 p-6 ring-1 ring-inset ring-white/5"
      dir="ltr"
    >
      <Sigma className="absolute right-3 top-3 h-4 w-4 text-primary/40" />
      <div className="flex items-center justify-center gap-3 font-mono text-cyan-100">
        <span className="text-xl">D&nbsp;=</span>
        <span className="flex flex-col items-center leading-none">
          <span className="text-xs text-cyan-300/80">p&minus;1</span>
          <span className="text-4xl text-accent">&sum;</span>
          <span className="text-xs text-cyan-300/80">i = &minus;n</span>
        </span>
        <span className="text-xl">
          d<sub>i</sub> &times; r<sup>i</sup>
        </span>
      </div>
    </motion.div>
  );
}

/** ملاحظة 💡 */
function NoteBox({ lines }: { lines: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/10 to-card/40"
    >
      <div className="flex items-center gap-2 border-b border-sky-400/20 bg-sky-400/10 px-4 py-3">
        <Lightbulb className="h-5 w-5 text-sky-300" />
        <span className="text-sm font-bold text-sky-100">ملاحظة 💡</span>
      </div>
      <div className="space-y-2 p-4">
        {lines.map((line, i) => (
          <p key={i} className="leading-loose text-slate-200">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** قاعدة ✅ */
function RuleBox({ lines }: { lines: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-card/40"
    >
      <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
        <span className="text-sm font-bold text-emerald-100">قاعدة ✅</span>
      </div>
      <div className="space-y-2 p-4">
        {lines.map((line, i) => (
          <p key={i} className="leading-loose text-emerald-50">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** انتبه ⚠️ */
function WarnBox({ lines }: { lines: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-400/10 to-card/40"
    >
      <div className="flex items-center gap-2 border-b border-amber-400/20 bg-amber-400/10 px-4 py-3">
        <AlertTriangle className="h-5 w-5 text-amber-300" />
        <span className="text-sm font-bold text-amber-100">انتبه ⚠️</span>
      </div>
      <div className="space-y-2 p-4">
        {lines.map((line, i) => (
          <p key={i} className="leading-loose text-amber-50">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** بطاقة مثال */
function ExampleBox({ title, lines }: { title: string; lines: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/12 via-card/50 to-secondary/40"
    >
      <div className="flex items-start gap-3 border-b border-primary/20 bg-primary/10 px-4 py-3">
        <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p className="font-bold leading-relaxed text-white">{title}</p>
      </div>
      <div className="space-y-2 p-4">
        {lines.map((line, i) => (
          <p
            key={i}
            className="whitespace-pre-wrap leading-loose text-slate-200"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/** جدول التحويل */
function TableBox({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-border-soft/70 bg-card/40"
    >
      <div className="flex items-center gap-2 border-b border-border-soft/60 bg-secondary/40 px-4 py-2.5">
        <TableIcon className="h-4 w-4 text-accent" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="bg-primary/15 text-accent">
              {head.map((h, i) => (
                <th key={i} className="px-4 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-t border-border-soft/40 odd:bg-card/30 even:bg-secondary/20"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-2.5 font-mono text-slate-100"
                    dir="ltr"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/** يوزّع كل كتلة إلى المكوّن المناسب */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <Paragraph text={block.text} />;
    case "formula":
      return <FormulaBox lines={block.lines} />;
    case "sumFormula":
      return <SumFormula />;
    case "note":
      return <NoteBox lines={block.lines} />;
    case "rule":
      return <RuleBox lines={block.lines} />;
    case "warn":
      return <WarnBox lines={block.lines} />;
    case "example":
      return <ExampleBox title={block.title} lines={block.lines} />;
    case "table":
      return <TableBox head={block.head} rows={block.rows} />;
  }
}
