"use client";

import { motion } from "motion/react";
import { getIcon } from "@/lib/icons";
import { type Feature } from "@/lib/site-data";
import { fadeUp } from "@/lib/motion";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = getIcon(feature.icon);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border-soft/70 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
    >
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-accent ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-bold">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {feature.description}
      </p>
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
