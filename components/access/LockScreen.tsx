"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LockKeyhole,
  KeyRound,
  Loader2,
  AlertCircle,
  Send,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { getDeviceFingerprint } from "@/lib/access/fingerprint";

const TELEGRAM_URL = "http://t.me/Sarah_halaf";

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "رمز الدخول غير صحيح.",
  device: "هذا الرمز مستخدم على جهاز آخر.",
  "no-fingerprint": "تعذّر التعرّف على جهازك. فعّل إعدادات المتصفح ثم أعد المحاولة.",
  generic: "حدث خطأ ما. حاول مرة أخرى.",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function LockScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setError(null);

    const trimmed = code.trim();
    if (!trimmed) {
      setError(ERROR_MESSAGES.invalid);
      return;
    }

    setStatus("loading");
    try {
      const fingerprint = await getDeviceFingerprint();
      const res = await fetch("/api/access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed, fingerprint }),
      });

      if (res.ok) {
        setStatus("success");
        // Re-render the current URL; the proxy now sees a valid session and
        // serves the real content in place of this lock screen.
        router.refresh();
        return;
      }

      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(ERROR_MESSAGES[data?.error ?? "generic"] ?? ERROR_MESSAGES.generic);
      setStatus("idle");
    } catch {
      setError(ERROR_MESSAGES.generic);
      setStatus("idle");
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      {/* Ambient glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.28), transparent 62%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="glass-strong glow-primary w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border-soft)] bg-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
        >
          <span className="animate-pulse-soft absolute h-20 w-20 rounded-2xl bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] blur-md" />
          <LockKeyhole className="relative h-10 w-10 text-[var(--color-accent)]" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          هذا المحتوى محمي
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
          أدخل رمز الدخول للوصول إلى هذا المحتوى.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 text-right">
          <div className="relative">
            <KeyRound className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-2)]" />
            <input
              type={show ? "text" : "password"}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(null);
              }}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="LGC-XXXX-XXXX"
              dir="ltr"
              disabled={status === "loading" || status === "success"}
              className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[color-mix(in_oklab,var(--color-background)_60%,transparent)] py-3.5 pr-12 pl-12 text-center font-mono tracking-widest text-white placeholder:text-[var(--color-muted-2)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "إخفاء الرمز" : "إظهار الرمز"}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--color-muted-2)] transition hover:text-white"
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="glow-primary flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                جارٍ التحقق…
              </>
            ) : status === "success" ? (
              <>
                <ShieldCheck className="h-5 w-5" />
                تم التحقق
              </>
            ) : (
              "دخول"
            )}
          </button>
        </form>

        {/* Get access — always visible call to action */}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition hover:text-white"
        >
          <Send className="h-4 w-4" />
          الحصول على رمز الدخول
        </a>
      </motion.div>
    </section>
  );
}
