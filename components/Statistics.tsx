"use client";

import { motion } from "motion/react";
import { getIcon } from "@/lib/icons";
import { stats } from "@/lib/site-data";
import { staggerContainer, zoomIn, viewportOnce } from "@/lib/motion";

export function Statistics() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = getIcon(stat.icon);
        return (
          <motion.div
            key={stat.label}
            variants={zoomIn}
            className="relative overflow-hidden rounded-2xl border border-border-soft/70 bg-gradient-to-b from-card/60 to-secondary/40 p-6 text-center backdrop-blur-sm"
          >
            <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-accent ring-1 ring-primary/25">
              <Icon className="h-6 w-6" />
            </span>
            <p className="text-3xl font-extrabold text-gradient sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-muted">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
