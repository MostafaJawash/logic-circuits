"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  Target,
  Clock,
  ListChecks,
  BrainCircuit,
  BookOpen,
  Gauge,
  TrendingUp,
  Flame,
  ThumbsUp,
  Dumbbell,
  Sparkles,
  CircleDot,
} from "lucide-react";
import {
  questions as sourceQuestions,
  DIFFICULTY_LABEL,
  sectionLabel,
  type Question,
} from "@/lib/chapter-1";
import { fadeUp, zoomIn } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  أدوات مساعدة                                                       */
/* ------------------------------------------------------------------ */

interface PreparedQuestion extends Question {
  /** الخيارات بعد الخلط */
  shuffled: string[];
  /** فهرس الإجابة الصحيحة بعد الخلط */
  correct: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepare(): PreparedQuestion[] {
  return sourceQuestions.map((q) => {
    const correctText = q.options[q.answer];
    const shuffled = shuffle(q.options);
    return { ...q, shuffled, correct: shuffled.indexOf(correctText) };
  });
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  المكوّن الرئيسي                                                    */
/* ------------------------------------------------------------------ */

export function Quiz() {
  const [quizItems, setQuizItems] = useState<PreparedQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // التحضير على العميل فقط لتفادي اختلاف التوليد بين الخادم والعميل
  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (finished || quizItems.length === 0) return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finished, quizItems.length]);

  function reset() {
    const items = prepare();
    setQuizItems(items);
    setAnswers(Array(items.length).fill(null));
    setCurrent(0);
    setFinished(false);
    setSeconds(0);
  }

  if (quizItems.length === 0) {
    return (
      <div className="grid place-items-center py-20 text-muted">
        <Sparkles className="h-8 w-8 animate-pulse text-accent" />
      </div>
    );
  }

  const total = quizItems.length;

  function choose(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  }

  function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinished(true);
    window.scrollTo({ top: document.getElementById("quiz")?.offsetTop ?? 0, behavior: "smooth" });
  }

  if (finished) {
    return (
      <Results
        quizItems={quizItems}
        answers={answers}
        seconds={seconds}
        onRestart={reset}
      />
    );
  }

  const q = quizItems[current];
  const selected = answers[current];
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div>
      {/* مؤشر التقدم */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <ListChecks className="h-4 w-4 text-accent" />
            السؤال {current + 1} من {total}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {formatTime(seconds)}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-card/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-primary to-accent"
            animate={{ width: `${((current + 1) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border-soft/70 bg-gradient-to-b from-card/60 to-secondary/40 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-lg font-bold text-accent ring-1 ring-primary/30">
              {current + 1}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                q.difficulty === "easy"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : q.difficulty === "medium"
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-rose-500/15 text-rose-300"
              }`}
            >
              {DIFFICULTY_LABEL[q.difficulty]}
            </span>
          </div>

          <h3 className="mb-6 text-xl font-bold leading-relaxed text-white sm:text-2xl">
            {q.question}
          </h3>

          <div className="space-y-3">
            {q.shuffled.map((opt, i) => {
              const active = selected === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => choose(i)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-right transition-all ${
                    active
                      ? "border-accent bg-accent/15 text-white ring-1 ring-accent/50"
                      : "border-border-soft/70 bg-card/40 text-slate-200 hover:border-accent/40 hover:bg-card/70"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                      active
                        ? "bg-accent text-background"
                        : "bg-secondary/70 text-muted"
                    }`}
                  >
                    {["أ", "ب", "ج", "د"][i]}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* التنقل */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-card/50 px-5 py-2.5 text-sm font-semibold transition-all enabled:hover:border-accent/50 enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
          السابق
        </button>

        <span className="text-xs text-muted-2">
          تمت الإجابة على {answeredCount} / {total}
        </span>

        {current < total - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            التالي
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={finish}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-400 px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          >
            <Trophy className="h-4 w-4" />
            إنهاء الاختبار
          </button>
        )}
      </div>

      {/* شريط التنقل السريع بين الأسئلة */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {quizItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`السؤال ${i + 1}`}
            className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
              i === current
                ? "bg-accent text-background"
                : answers[i] !== null
                  ? "bg-primary/25 text-accent ring-1 ring-primary/40"
                  : "bg-card/50 text-muted-2 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  لوحة النتائج والتحليلات                                            */
/* ------------------------------------------------------------------ */

function Results({
  quizItems,
  answers,
  seconds,
  onRestart,
}: {
  quizItems: PreparedQuestion[];
  answers: (number | null)[];
  seconds: number;
  onRestart: () => void;
}) {
  const [reviewing, setReviewing] = useState(false);

  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    const wrongBySection: Record<string, number> = {};
    const totalBySection: Record<string, number> = {};

    quizItems.forEach((q, i) => {
      totalBySection[q.section] = (totalBySection[q.section] ?? 0) + 1;
      const a = answers[i];
      if (a === null) {
        skipped++;
        wrongBySection[q.section] = (wrongBySection[q.section] ?? 0) + 1;
      } else if (a === q.correct) {
        correct++;
      } else {
        wrong++;
        wrongBySection[q.section] = (wrongBySection[q.section] ?? 0) + 1;
      }
    });

    const total = quizItems.length;
    const percentage = Math.round((correct / total) * 100);

    // الفقرات الأضعف: أعلى نسبة أخطاء
    const weakSections = Object.keys(totalBySection)
      .map((sec) => ({
        section: sec,
        wrong: wrongBySection[sec] ?? 0,
        total: totalBySection[sec],
        rate: (wrongBySection[sec] ?? 0) / totalBySection[sec],
      }))
      .filter((s) => s.wrong > 0)
      .sort((a, b) => b.rate - a.rate || b.wrong - a.wrong);

    // نقاط القوة: فقرات بلا أخطاء
    const strongSections = Object.keys(totalBySection).filter(
      (sec) => (wrongBySection[sec] ?? 0) === 0,
    );

    return {
      correct,
      wrong,
      skipped,
      total,
      percentage,
      weakSections,
      strongSections,
    };
  }, [quizItems, answers]);

  const { correct, wrong, skipped, total, percentage, weakSections, strongSections } = stats;

  // رسالة تحفيزية حسب النسبة
  const motivation =
    percentage >= 90
      ? { text: "ممتاز 🔥", note: "أداء رائع، إتقان شبه كامل للفصل.", icon: Flame, tone: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300" }
      : percentage >= 75
        ? { text: "جيد جداً 👏", note: "مستوى قوي، راجع بعض التفاصيل لتصل للكمال.", icon: ThumbsUp, tone: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-300" }
        : percentage >= 50
          ? { text: "استمر بالتدريب 💪", note: "أساس جيد، راجع الفقرات الضعيفة وأعد المحاولة.", icon: Dumbbell, tone: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300" }
          : { text: "راجع بعض الفقرات وستتقنها.", note: "لا بأس، ابدأ بمراجعة الفقرات المقترحة ثم أعد الاختبار.", icon: BookOpen, tone: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-300" };

  const understanding =
    percentage >= 85 ? "عالٍ" : percentage >= 60 ? "متوسط" : "يحتاج تحسين";

  if (reviewing) {
    return (
      <Review quizItems={quizItems} answers={answers} onBack={() => setReviewing(false)} onRestart={onRestart} />
    );
  }

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
      {/* النتيجة النهائية */}
      <motion.div
        variants={zoomIn}
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/50 to-secondary/40 p-8 text-center glow-primary"
      >
        <span className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-primary/20 ring-1 ring-primary/40">
          <Trophy className="h-10 w-10 text-amber-300" />
        </span>
        <h3 className="text-2xl font-extrabold text-white">نتيجتك النهائية</h3>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-6xl font-black text-gradient">{percentage}%</span>
        </div>
        <p className="mt-2 text-muted">
          أجبت بشكل صحيح على {correct} من {total} سؤالاً
        </p>
      </motion.div>

      {/* الإحصائيات */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Check} label="إجابات صحيحة" value={correct} tone="text-emerald-300" ring="ring-emerald-500/30 bg-emerald-500/10" />
        <StatCard icon={X} label="إجابات خاطئة" value={wrong} tone="text-rose-300" ring="ring-rose-500/30 bg-rose-500/10" />
        <StatCard icon={CircleDot} label="أسئلة متروكة" value={skipped} tone="text-slate-300" ring="ring-slate-500/30 bg-slate-500/10" />
        <StatCard icon={Clock} label="الوقت المستغرق" value={formatTime(seconds)} tone="text-sky-300" ring="ring-sky-500/30 bg-sky-500/10" />
      </div>

      {/* لوحة تحليل الأداء */}
      <motion.div variants={fadeUp} className="mt-6 grid gap-4 md:grid-cols-2">
        <AnalyticCard icon={Dumbbell} title="💪 نقاط القوة" tone="border-emerald-500/25 bg-emerald-500/5">
          {strongSections.length > 0 ? (
            <ul className="space-y-1.5">
              {strongSections.map((s) => (
                <li key={s} className="flex items-center gap-2 text-emerald-200">
                  <Check className="h-4 w-4 shrink-0" /> {sectionLabel[s]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">لم تكتمل أي فقرة دون أخطاء — راجع الفقرات المقترحة.</p>
          )}
        </AnalyticCard>

        <AnalyticCard icon={Target} title="⚠️ يحتاج مراجعة" tone="border-amber-500/25 bg-amber-500/5">
          {weakSections.length > 0 ? (
            <ul className="space-y-1.5">
              {weakSections.map((s) => (
                <li key={s.section} className="flex items-center justify-between gap-2 text-amber-200">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    {sectionLabel[s.section]}
                  </span>
                  <span className="text-xs text-amber-300/80">
                    {s.wrong}/{s.total} أخطاء
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-emerald-200">لا توجد فقرات ضعيفة — عمل مثالي! 🎉</p>
          )}
        </AnalyticCard>
      </motion.div>

      {/* مقاييس الفهم */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MeterCard icon={Target} title="🎯 مستوى الفهم" value={understanding} percentage={percentage} />
        <MeterCard icon={BookOpen} title="📖 مستوى الحفظ" value={`${percentage}%`} percentage={percentage} />
        <MeterCard icon={BrainCircuit} title="🧠 مستوى الاستيعاب" value={understanding} percentage={percentage} />
      </div>

      {/* التقييم العام */}
      <motion.div
        variants={fadeUp}
        className="mt-4 rounded-2xl border border-border-soft/70 bg-gradient-to-b from-card/60 to-secondary/40 p-6"
      >
        <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
          <Gauge className="h-5 w-5 text-accent" /> 📈 التقييم العام
        </h4>
        <div className="h-3 overflow-hidden rounded-full bg-card/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-primary via-accent to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 leading-relaxed text-slate-200">
          {weakSections.length > 0 ? (
            <>
              هناك ضعف في فقرة:{" "}
              <span className="font-bold text-amber-300">
                {sectionLabel[weakSections[0].section]}
              </span>
              {weakSections.length > 1 && (
                <>
                  {" "}و{" "}
                  <span className="font-bold text-amber-300">
                    {sectionLabel[weakSections[1].section]}
                  </span>
                </>
              )}
              . ننصحك بمراجعة هذه الفقرات فقط ثم إعادة الاختبار.
            </>
          ) : (
            <>فهمك للفصل ممتاز — لا حاجة لمراجعة أي فقرة، تابع للفصل التالي.</>
          )}
        </p>
      </motion.div>

      {/* بطاقة تحفيزية */}
      <motion.div
        variants={fadeUp}
        className={`mt-4 rounded-2xl border bg-gradient-to-br p-6 text-center ${motivation.tone}`}
      >
        <motivation.icon className="mx-auto mb-2 h-8 w-8" />
        <p className="text-2xl font-extrabold">{motivation.text}</p>
        <p className="mt-1 text-sm opacity-90">{motivation.note}</p>
      </motion.div>

      {/* أزرار */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setReviewing(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-card/50 px-6 py-3 text-sm font-semibold transition-all hover:border-accent/50 hover:text-accent"
        >
          <ListChecks className="h-4 w-4" />
          مراجعة الإجابات
        </button>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-primary to-accent px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة الاختبار
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  مراجعة الإجابات مع الشرح                                           */
/* ------------------------------------------------------------------ */

function Review({
  quizItems,
  answers,
  onBack,
  onRestart,
}: {
  quizItems: PreparedQuestion[];
  answers: (number | null)[];
  onBack: () => void;
  onRestart: () => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">مراجعة الإجابات</h3>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-card/50 px-4 py-2 text-sm font-semibold transition-all hover:border-accent/50 hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
          العودة للنتائج
        </button>
      </div>

      <div className="space-y-4">
        {quizItems.map((q, i) => {
          const a = answers[i];
          const isCorrect = a === q.correct;
          const isSkipped = a === null;
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className={`rounded-2xl border p-5 ${
                isSkipped
                  ? "border-slate-500/30 bg-slate-500/5"
                  : isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5"
              }`}
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-card/70 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <p className="font-bold leading-relaxed text-white">{q.question}</p>
              </div>

              <div className="space-y-2">
                {q.shuffled.map((opt, oi) => {
                  const isRight = oi === q.correct;
                  const isChosen = oi === a;
                  return (
                    <div
                      key={oi}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                        isRight
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                          : isChosen
                            ? "border-rose-500/40 bg-rose-500/15 text-rose-100"
                            : "border-border-soft/60 bg-card/30 text-slate-300"
                      }`}
                    >
                      {isRight ? (
                        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : isChosen ? (
                        <X className="h-4 w-4 shrink-0 text-rose-400" />
                      ) : (
                        <span className="h-4 w-4 shrink-0" />
                      )}
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {isSkipped && (
                <p className="mt-3 text-sm font-semibold text-slate-400">لم تتم الإجابة على هذا السؤال.</p>
              )}

              <div className="mt-3 rounded-xl border border-accent/20 bg-accent/5 p-3">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-cyan-100">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="font-bold text-accent">الشرح: </span>
                    {q.explanation}
                  </span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-card/50 px-6 py-3 text-sm font-semibold transition-all hover:border-accent/50 hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
          العودة للنتائج
        </button>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-primary to-accent px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة الاختبار
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  بطاقات مساعدة                                                      */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  ring,
}: {
  icon: typeof Check;
  label: string;
  value: number | string;
  tone: string;
  ring: string;
}) {
  return (
    <motion.div
      variants={zoomIn}
      className="rounded-2xl border border-border-soft/70 bg-gradient-to-b from-card/60 to-secondary/40 p-5 text-center"
    >
      <span className={`mx-auto mb-2 grid h-11 w-11 place-items-center rounded-xl ring-1 ${ring}`}>
        <Icon className={`h-5 w-5 ${tone}`} />
      </span>
      <p className={`text-2xl font-extrabold ${tone}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </motion.div>
  );
}

function AnalyticCard({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: typeof Check;
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${tone}`}>
      <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
        <Icon className="h-5 w-5 text-accent" />
        {title}
      </h4>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function MeterCard({
  icon: Icon,
  title,
  value,
  percentage,
}: {
  icon: typeof Check;
  title: string;
  value: string;
  percentage: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-border-soft/70 bg-gradient-to-b from-card/60 to-secondary/40 p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-muted">
          <Icon className="h-4 w-4 text-accent" />
          {title}
        </span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-card/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
