"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Columns3,
  FileSpreadsheet,
  GitMerge,
  PenLine,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { DemoCard, PrimaryButton } from "./DemoCard";

type IconType = typeof PlayCircle;

type Badge = "cached" | "updated" | "new" | "recomputed";

const BADGE_STYLE: Record<Badge, { icon: IconType; label: string; className: string }> = {
  cached: { icon: Zap, label: "cached", className: "border-amber-400/40 text-amber-300" },
  updated: { icon: Sparkles, label: "updated", className: "border-accent-violet/40 text-accent-violet" },
  new: { icon: Code2, label: "new block", className: "border-emerald-400/40 text-emerald-300" },
  recomputed: { icon: RefreshCw, label: "recomputed", className: "border-accent-cyan/40 text-accent-cyan" },
};

const STAGE_LABEL: Record<number, string> = {
  1: "Cutting the outdated edge…",
  2: "Reconfiguring the column-calc block…",
  3: "Inserting the new dedupe block…",
  4: "Reconnecting edges…",
  5: "Recomputing downstream…",
};

const LAST_STEP = 5;

function Node({
  x,
  y,
  width,
  height,
  isEndpoint,
  icon: Icon,
  label,
  sub,
  badge,
  highlight,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  isEndpoint?: boolean;
  icon: IconType;
  label: string;
  sub?: string;
  badge?: Badge;
  highlight?: "pulse-violet";
}) {
  const pad = 22;
  const badgeInfo = badge ? BADGE_STYLE[badge] : null;
  const BadgeIcon = badgeInfo?.icon;

  return (
    <foreignObject x={x - width / 2 - pad} y={y - height / 2 - pad} width={width + pad * 2} height={height + pad * 2}>
      <div style={{ position: "relative", width: width + pad * 2, height: height + pad * 2 }}>
        <motion.div
          layout
          className={`absolute flex items-center justify-center gap-2 rounded-2xl border bg-background px-3 text-center ${
            isEndpoint ? "rounded-full flex-col border-accent-cyan/60 text-accent-cyan" : "border-panel-border text-foreground/85"
          }`}
          style={{ left: pad, top: pad, width, height }}
          animate={
            highlight === "pulse-violet"
              ? { borderColor: ["rgba(148,163,184,0.12)", "#9f7bea", "rgba(148,163,184,0.12)"] }
              : {}
          }
          transition={{ duration: 0.9 }}
        >
          <Icon size={isEndpoint ? 20 : 16} className="shrink-0" />
          <div className={isEndpoint ? "text-[10px] leading-tight" : "text-left"}>
            <p className="text-[12px] font-medium leading-tight text-foreground/90">{label}</p>
            {sub ? <p className="font-mono text-[10px] text-muted">{sub}</p> : null}
          </div>
          <AnimatePresence>
            {badgeInfo && BadgeIcon ? (
              <motion.span
                initial={{ opacity: 0, y: -4, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute -top-2.5 -right-2.5 flex items-center gap-0.5 rounded-full border bg-background px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap ${badgeInfo.className}`}
              >
                <BadgeIcon size={9} /> {badgeInfo.label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </foreignObject>
  );
}

const VIEW_W = 1040;
const VIEW_H = 300;
const Y = 180;
const X = { start: 50, selector: 220, colcalc: 400, pycode: 590, merge: 770, result: 960 };

export function WorkflowEditDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (step >= LAST_STEP) return;
    const t = setTimeout(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= LAST_STEP) setRunning(false);
        return next;
      });
    }, 900);
    return () => clearTimeout(t);
  }, [running, step]);

  const applyEdit = () => {
    setStep(0);
    setRunning(true);
    setTimeout(() => setStep(1), 50);
  };

  const reset = () => {
    setRunning(false);
    setStep(0);
  };

  const colcalcLabel = step >= 2 ? "Column calc: totals + tax" : "Column calc: region totals";

  return (
    <DemoCard
      icon={<PenLine size={20} />}
      title="Editing a pipeline, not rebuilding it"
      description="Requirements change. Instead of regenerating the whole pipeline, the agent cuts only the affected edge, reconfigures or inserts the blocks that actually need to change, and reconnects — everything else stays cached."
      controls={
        <>
          <PrimaryButton onClick={applyEdit} disabled={running || step > 0}>
            <PenLine size={13} /> Apply edit
          </PrimaryButton>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset"
            className="rounded-full border border-panel-border p-2 text-muted hover:text-foreground"
          >
            <RotateCcw size={13} />
          </button>
        </>
      }
    >
      <div className="rounded-xl border border-panel-border bg-background-alt px-4 py-3">
        <p className="text-sm text-foreground/85">
          <span className="text-muted">New request — </span>
          &ldquo;Also adjust totals to include tax, and dedupe rows before the final merge.&rdquo;
        </p>
      </div>

      <div className="mt-3 h-5">
        <AnimatePresence mode="wait">
          {STAGE_LABEL[step] ? (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-xs text-accent-cyan"
            >
              {STAGE_LABEL[step]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-panel-border bg-background-alt/60 py-4">
        <svg width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="min-w-[1040px]">
          <defs>
            <linearGradient id="editEdgeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4fd8e8" />
              <stop offset="100%" stopColor="#9f7bea" />
            </linearGradient>
          </defs>

          {/* always-present base edges */}
          <line x1={X.start} y1={Y} x2={X.selector} y2={Y} stroke="url(#editEdgeGradient)" strokeWidth={1.5} />
          <line x1={X.selector} y1={Y} x2={X.colcalc} y2={Y} stroke="url(#editEdgeGradient)" strokeWidth={1.5} />
          <line x1={X.merge} y1={Y} x2={X.result} y2={Y} stroke="url(#editEdgeGradient)" strokeWidth={1.5} />

          {/* the edge being cut: colcalc -> merge, present at step 0-1, removed from step 2 onward */}
          <AnimatePresence>
            {step <= 1 ? (
              <motion.line
                key="colcalc-merge"
                x1={X.colcalc}
                y1={Y}
                x2={X.merge}
                y2={Y}
                strokeWidth={2}
                initial={{ stroke: "#4fd8e8", opacity: 1 }}
                animate={step === 1 ? { stroke: "#ef4444", opacity: 1 } : { stroke: "#4fd8e8", opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.35 } }}
                transition={{ duration: 0.4 }}
              />
            ) : null}
          </AnimatePresence>

          {/* reconnected edges once the new block exists */}
          {step >= 4 ? (
            <>
              <motion.line
                x1={X.colcalc}
                y1={Y}
                x2={X.pycode}
                y2={Y}
                stroke="url(#editEdgeGradient)"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.line
                x1={X.pycode}
                y1={Y}
                x2={X.merge}
                y2={Y}
                stroke="url(#editEdgeGradient)"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
            </>
          ) : null}

          {/* one-shot pulse rings */}
          {step === 2 ? (
            <motion.circle
              cx={X.colcalc}
              cy={Y}
              r={20}
              fill="none"
              stroke="#9f7bea"
              strokeWidth={2}
              initial={{ opacity: 0.7, r: 20 }}
              animate={{ opacity: 0, r: 46 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          ) : null}
          {step === 5 ? (
            <>
              <motion.circle
                cx={X.merge}
                cy={Y}
                r={20}
                fill="none"
                stroke="#4fd8e8"
                strokeWidth={2}
                initial={{ opacity: 0.7, r: 20 }}
                animate={{ opacity: 0, r: 42 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <motion.circle
                cx={X.result}
                cy={Y}
                r={20}
                fill="none"
                stroke="#4fd8e8"
                strokeWidth={2}
                initial={{ opacity: 0.7, r: 20 }}
                animate={{ opacity: 0, r: 42 }}
                transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              />
            </>
          ) : null}

          <Node x={X.start} y={Y} width={64} height={64} isEndpoint icon={PlayCircle} label="Start" />
          <Node
            x={X.selector}
            y={Y}
            width={172}
            height={62}
            icon={FileSpreadsheet}
            label="Select source sheet"
            sub="Sales_Q2.xlsx"
            badge={step >= 2 ? "cached" : undefined}
          />
          <Node
            x={X.colcalc}
            y={Y}
            width={172}
            height={62}
            icon={Columns3}
            label={colcalcLabel}
            badge={step >= 2 ? "updated" : undefined}
            highlight={step === 2 ? "pulse-violet" : undefined}
          />
          {step >= 3 ? (
            <Node x={X.pycode} y={Y} width={172} height={62} icon={Code2} label="Python: dedupe rows" badge="new" />
          ) : null}
          <Node
            x={X.merge}
            y={Y}
            width={172}
            height={62}
            icon={GitMerge}
            label="Merge with last quarter"
            badge={step >= 5 ? "recomputed" : undefined}
          />
          <Node
            x={X.result}
            y={Y}
            width={64}
            height={64}
            isEndpoint
            icon={CheckCircle2}
            label="Result sheet"
            badge={step >= 5 ? "recomputed" : undefined}
          />
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Zap size={13} className="text-amber-300" /> Cached — untouched by the edit
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-accent-violet" /> Reconfigured in place
        </span>
        <span className="flex items-center gap-1.5">
          <Code2 size={13} className="text-emerald-300" /> Newly inserted block
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCw size={13} className="text-accent-cyan" /> Recomputed downstream
        </span>
      </div>
    </DemoCard>
  );
}
