"use client";

import { motion } from "motion/react";
import type { DiagramStep } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";

const BOX_W = 138;
const BOX_H = 52;
const GAP = 42;
const PAD = 8;

export function FlowDiagram({
  steps,
  loop,
  locale,
}: {
  steps: DiagramStep[];
  loop?: string;
  locale: Locale;
}) {
  const width = PAD * 2 + steps.length * BOX_W + (steps.length - 1) * GAP;
  const height = loop ? 150 : 96;
  const boxY = 18;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full min-w-[520px]"
        role="img"
        aria-label={steps.map((s) => pick(s.label, locale)).join(" → ")}
      >
        {steps.map((step, i) => {
          const x = PAD + i * (BOX_W + GAP);
          const stroke = step.accent ? "var(--s-accent)" : "var(--s-line)";
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.14 }}
            >
              <rect
                x={x}
                y={boxY}
                width={BOX_W}
                height={BOX_H}
                fill="var(--s-panel)"
                stroke={stroke}
                strokeWidth="1"
              />
              {/* tick de coin */}
              <path
                d={`M ${x} ${boxY + 8} V ${boxY} H ${x + 8}`}
                fill="none"
                stroke={step.accent ? "var(--s-accent)" : "var(--s-hairline)"}
                strokeWidth="1.5"
              />
              <text
                x={x + BOX_W / 2}
                y={boxY + (step.sub ? 22 : 30)}
                textAnchor="middle"
                className="font-mono font-medium"
                fontSize="12"
                fill={step.accent ? "var(--s-accent)" : "var(--s-ink)"}
              >
                {pick(step.label, locale)}
              </text>
              {step.sub ? (
                <text
                  x={x + BOX_W / 2}
                  y={boxY + 38}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="10"
                  fill="var(--s-dim)"
                >
                  {pick(step.sub, locale)}
                </text>
              ) : null}
            </motion.g>
          );
        })}

        {steps.slice(0, -1).map((_, i) => {
          const x1 = PAD + i * (BOX_W + GAP) + BOX_W;
          const x2 = x1 + GAP - 6;
          const y = boxY + BOX_H / 2;
          return (
            <motion.g key={`a-${i}`}>
              <motion.line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="var(--s-hairline)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.14 }}
              />
              <motion.path
                d={`M ${x2} ${y - 3.5} L ${x2 + 6} ${y} L ${x2} ${y + 3.5}`}
                fill="none"
                stroke="var(--s-hairline)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.4 + i * 0.14 }}
              />
            </motion.g>
          );
        })}

        {loop ? (
          <>
            <motion.path
              d={`M ${width - PAD - BOX_W / 2} ${boxY + BOX_H}
                  C ${width - PAD - BOX_W / 2} ${height - 26},
                    ${PAD + BOX_W / 2} ${height - 26},
                    ${PAD + BOX_W / 2} ${boxY + BOX_H + 4}`}
              fill="none"
              stroke="var(--s-accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
            />
            <motion.path
              d={`M ${PAD + BOX_W / 2 - 3.5} ${boxY + BOX_H + 10} L ${PAD + BOX_W / 2} ${boxY + BOX_H + 4} L ${PAD + BOX_W / 2 + 3.5} ${boxY + BOX_H + 10}`}
              fill="none"
              stroke="var(--s-accent)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            />
            <motion.text
              x={width / 2}
              y={height - 32}
              textAnchor="middle"
              className="font-mono"
              fontSize="10"
              fill="var(--s-accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {loop}
            </motion.text>
          </>
        ) : null}
      </svg>
    </div>
  );
}
