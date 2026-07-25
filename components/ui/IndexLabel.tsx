import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Étiquette d'index de section, ex: `0x02 — EXPÉRIENCE`. */
export function IndexLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("label-mono inline-flex items-baseline gap-2 text-dim", className)}>
      <span className="text-accent">{index}</span>
      <span aria-hidden>—</span>
      <span>{children}</span>
    </span>
  );
}
