import {
  Cpu,
  Binary,
  CircuitBoard,
  BookOpen,
  GraduationCap,
  FileQuestion,
  Calculator,
  BrainCircuit,
  Home,
  Sigma,
  ToggleRight,
  ListChecks,
  Sparkles,
  PencilRuler,
  Image as ImageIcon,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Central icon registry so plain data files can reference an icon by name
 * (a string safely crosses the server → client boundary; a component cannot).
 */
export const iconMap = {
  Cpu,
  Binary,
  CircuitBoard,
  BookOpen,
  GraduationCap,
  FileQuestion,
  Calculator,
  BrainCircuit,
  Home,
  Sigma,
  ToggleRight,
  ListChecks,
  Sparkles,
  PencilRuler,
  ImageIcon,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}
