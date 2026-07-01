"use client";

import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Logic gate glyphs (stylised silhouettes)                          */
/* ------------------------------------------------------------------ */
type GateType = "AND" | "OR" | "XOR" | "NAND" | "NOR" | "XNOR" | "NOT";

function GateGlyph({ type }: { type: GateType }) {
  const hasBubble = type === "NAND" || type === "NOR" || type === "XNOR" || type === "NOT";
  const isOrFamily = type === "OR" || type === "NOR" || type === "XOR" || type === "XNOR";
  const isXor = type === "XOR" || type === "XNOR";

  return (
    <svg viewBox="0 0 64 40" className="h-full w-full" fill="none">
      {/* input leads */}
      <line x1="0" y1="13" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="27" x2="12" y2="27" stroke="currentColor" strokeWidth="1.5" />
      {/* output lead */}
      <line x1="52" y1="20" x2="64" y2="20" stroke="currentColor" strokeWidth="1.5" />

      {type === "AND" || type === "NAND" ? (
        <path
          d="M12 6 H30 C42 6 50 12 50 20 C50 28 42 34 30 34 H12 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      ) : type === "NOT" ? (
        <path
          d="M14 6 L46 20 L14 34 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M10 6 Q22 20 10 34 C28 34 42 32 52 20 C42 8 28 6 10 6 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      )}

      {/* XOR extra back arc */}
      {isXor && (
        <path d="M6 6 Q18 20 6 34" stroke="currentColor" strokeWidth="1.75" />
      )}

      {/* inverting bubble */}
      {hasBubble && (
        <circle
          cx={type === "NOT" ? 50 : isOrFamily ? 56 : 54}
          cy="20"
          r="3"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Deterministic layout data (avoids hydration mismatch)             */
/* ------------------------------------------------------------------ */
const gates: {
  type: GateType;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}[] = [
  { type: "AND", top: "12%", left: "8%", size: 92, duration: 8, delay: 0 },
  { type: "OR", top: "22%", left: "82%", size: 84, duration: 9, delay: 1.2 },
  { type: "XOR", top: "62%", left: "12%", size: 78, duration: 10, delay: 0.6 },
  { type: "NAND", top: "72%", left: "78%", size: 96, duration: 8.5, delay: 1.8 },
  { type: "NOR", top: "40%", left: "46%", size: 70, duration: 11, delay: 0.3 },
  { type: "NOT", top: "80%", left: "40%", size: 64, duration: 9.5, delay: 2.1 },
  { type: "XNOR", top: "30%", left: "26%", size: 74, duration: 10.5, delay: 1.5 },
];

const bits: {
  char: "0" | "1";
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}[] = [
  { char: "1", top: "18%", left: "20%", size: 22, duration: 7, delay: 0 },
  { char: "0", top: "30%", left: "68%", size: 28, duration: 9, delay: 0.8 },
  { char: "1", top: "55%", left: "34%", size: 18, duration: 8, delay: 1.4 },
  { char: "0", top: "68%", left: "60%", size: 24, duration: 10, delay: 0.4 },
  { char: "1", top: "45%", left: "88%", size: 20, duration: 7.5, delay: 2 },
  { char: "0", top: "85%", left: "24%", size: 26, duration: 9.5, delay: 1.1 },
  { char: "1", top: "10%", left: "54%", size: 16, duration: 8.5, delay: 1.7 },
  { char: "0", top: "50%", left: "6%", size: 22, duration: 11, delay: 0.2 },
];

// PCB traces + travelling pulse for each
const traces = [
  "M0 90 H120 L160 130 H320 L360 90 H520",
  "M700 40 H840 L880 80 H1040 L1080 40 H1200",
  "M100 300 H260 L300 260 H460",
  "M1240 260 H1080 L1040 220 H860",
];

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* PCB traces */}
      <svg
        className="absolute inset-0 h-full w-full text-accent/25"
        viewBox="0 0 1280 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {traces.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            {/* solder nodes */}
            <motion.circle
              r="8"
              fill="var(--color-accent)"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.8, 0.15] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <animateMotion dur={`${5 + i}s`} repeatCount="indefinite" path={d} />
            </motion.circle>
          </g>
        ))}
      </svg>

      {/* Floating logic gates */}
      {gates.map((g, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/25"
          style={{ top: g.top, left: g.left, width: g.size, height: g.size * 0.62 }}
          animate={{ y: [0, -20, 0], rotate: [0, 4, 0] }}
          transition={{
            duration: g.duration,
            delay: g.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GateGlyph type={g.type} />
        </motion.div>
      ))}

      {/* Binary digits */}
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute font-mono font-bold text-accent/20 select-none"
          style={{ top: b.top, left: b.left, fontSize: b.size }}
          animate={{ y: [0, -26, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {b.char}
        </motion.span>
      ))}

      {/* Digital particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute h-1 w-1 rounded-full bg-accent"
          style={{
            top: `${(i * 61) % 100}%`,
            left: `${(i * 37) % 100}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{
            duration: 3 + (i % 4),
            delay: (i % 5) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
