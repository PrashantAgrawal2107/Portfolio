"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Columns3,
  FileSpreadsheet,
  GitBranch,
  GitMerge,
  FlipHorizontal,
  PlayCircle,
  Rows3,
  Workflow,
} from "lucide-react";
import { DemoCard, DemoButton, PrimaryButton } from "./DemoCard";

type IconType = typeof PlayCircle;

type WNode = {
  id: string;
  kind: "endpoint" | "router" | "block";
  label: string;
  sub?: string;
  icon: IconType;
  x: number;
  y: number;
  layer: number;
};

type WEdge = { from: string; to: string };

type Preset = { id: string; label: string; task: string; nodes: WNode[]; edges: WEdge[] };

const PRESETS: Preset[] = [
  {
    id: "clean-and-report",
    label: "Clean & merge report",
    task: "\"Pull in this month's two branch sheets, clean out null rows, total each region, and give me one merged report.\"",
    nodes: [
      { id: "start", kind: "endpoint", label: "Start", icon: PlayCircle, x: 60, y: 180, layer: 0 },
      { id: "selector", kind: "block", label: "Select source sheets", icon: FileSpreadsheet, x: 250, y: 180, layer: 1 },
      { id: "plan", kind: "router", label: "Plan transformation", icon: GitBranch, x: 460, y: 180, layer: 2 },
      { id: "pycode", kind: "block", label: "Python: drop null rows", icon: Code2, x: 670, y: 90, layer: 3 },
      { id: "colcalc", kind: "block", label: "Column calc: region totals", icon: Columns3, x: 670, y: 270, layer: 3 },
      { id: "merge", kind: "block", label: "Merge results", icon: GitMerge, x: 860, y: 180, layer: 4 },
      { id: "result", kind: "endpoint", label: "Result sheet", icon: CheckCircle2, x: 1000, y: 180, layer: 5 },
    ],
    edges: [
      { from: "start", to: "selector" },
      { from: "selector", to: "plan" },
      { from: "plan", to: "pycode" },
      { from: "plan", to: "colcalc" },
      { from: "pycode", to: "merge" },
      { from: "colcalc", to: "merge" },
      { from: "merge", to: "result" },
    ],
  },
  {
    id: "pivot-reshape",
    label: "Pivot & reshape",
    task: "\"Take this wide sheet, transpose it into long format, and calculate a running total per row.\"",
    nodes: [
      { id: "start", kind: "endpoint", label: "Start", icon: PlayCircle, x: 60, y: 180, layer: 0 },
      { id: "selector", kind: "block", label: "Select source sheet", icon: FileSpreadsheet, x: 250, y: 180, layer: 1 },
      { id: "plan", kind: "router", label: "Plan transformation", icon: GitBranch, x: 460, y: 180, layer: 2 },
      { id: "transpose", kind: "block", label: "Transpose", icon: FlipHorizontal, x: 670, y: 90, layer: 3 },
      { id: "pycode", kind: "block", label: "Python: reshape", icon: Code2, x: 670, y: 270, layer: 3 },
      { id: "rowcalc", kind: "block", label: "Row calc: running total", icon: Rows3, x: 860, y: 180, layer: 4 },
      { id: "result", kind: "endpoint", label: "Result sheet", icon: CheckCircle2, x: 1000, y: 180, layer: 5 },
    ],
    edges: [
      { from: "start", to: "selector" },
      { from: "selector", to: "plan" },
      { from: "plan", to: "transpose" },
      { from: "plan", to: "pycode" },
      { from: "transpose", to: "rowcalc" },
      { from: "pycode", to: "rowcalc" },
      { from: "rowcalc", to: "result" },
    ],
  },
];

const NODE_STYLE: Record<WNode["kind"], string> = {
  endpoint: "border-accent-cyan/60 text-accent-cyan",
  router: "border-accent-violet/60 text-accent-violet",
  block: "border-panel-border text-foreground/85",
};

const VIEW_W = 1040;
const VIEW_H = 360;

export function WorkflowBuilderDemo() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [playToken, setPlayToken] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const preset = PRESETS[presetIdx];
  const nodeById = new Map(preset.nodes.map((n) => [n.id, n]));

  useEffect(() => {
    if (playToken === 0) return;
    const t = setTimeout(() => setRevealed(true), 30);
    return () => clearTimeout(t);
  }, [playToken]);

  const generate = () => {
    setRevealed(false);
    setPlayToken((t) => t + 1);
  };

  const selectPreset = (idx: number) => {
    setPresetIdx(idx);
    setRevealed(false);
  };

  return (
    <DemoCard
      icon={<Workflow size={20} />}
      title="The agent designs the transformation pipeline"
      description="Give it source sheets and a target output format — the agent plans which blocks are needed (row/column calc, Python, merge, transpose) and compiles them into a runnable pipeline."
      controls={
        <>
          {PRESETS.map((p, idx) => (
            <DemoButton key={p.id} active={presetIdx === idx} onClick={() => selectPreset(idx)}>
              {p.label}
            </DemoButton>
          ))}
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-panel-border bg-background-alt px-4 py-3">
        <p className="text-sm text-foreground/85">
          <span className="text-muted">Request — </span>
          {preset.task}
        </p>
        <PrimaryButton onClick={generate}>
          <PlayCircle size={13} /> Generate pipeline
        </PrimaryButton>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-panel-border bg-background-alt/60 py-4">
        <svg width={VIEW_W} height={VIEW_H} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="min-w-[1040px]">
          <g>
            {preset.edges.map((edge, i) => {
              const from = nodeById.get(edge.from)!;
              const to = nodeById.get(edge.to)!;
              const delay = Math.max(from.layer, to.layer) * 0.4 + 0.35;
              return (
                <motion.line
                  key={`${preset.id}-${i}-${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#edgeGradient)"
                  strokeWidth={1.5}
                  initial={false}
                  animate={{ pathLength: revealed ? 1 : 0, opacity: revealed ? 1 : 0 }}
                  transition={revealed ? { delay, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                />
              );
            })}
            <defs>
              <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4fd8e8" />
                <stop offset="100%" stopColor="#9f7bea" />
              </linearGradient>
            </defs>
          </g>

          {preset.nodes.map((node) => {
            const Icon = node.icon;
            const isEndpoint = node.kind === "endpoint";
            const width = isEndpoint ? 64 : 172;
            const height = isEndpoint ? 64 : 62;
            const delay = node.layer * 0.4 + 0.1;
            return (
              <foreignObject
                key={`${preset.id}-${node.id}`}
                x={node.x - width / 2}
                y={node.y - height / 2}
                width={width}
                height={height}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.55 }}
                  transition={revealed ? { delay, duration: 0.4, ease: "backOut" } : { duration: 0 }}
                  className={`flex h-full w-full items-center justify-center gap-2 rounded-2xl border bg-background px-3 text-center ${NODE_STYLE[node.kind]} ${
                    isEndpoint ? "rounded-full flex-col" : ""
                  }`}
                >
                  <Icon size={isEndpoint ? 20 : 16} className="shrink-0" />
                  <div className={isEndpoint ? "text-[10px] leading-tight" : "text-left"}>
                    <p className="text-[12px] font-medium leading-tight text-foreground/90">{node.label}</p>
                    {node.sub ? <p className="font-mono text-[10px] text-muted">{node.sub}</p> : null}
                  </div>
                </motion.div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <LegendItem icon={PlayCircle} color="text-accent-cyan" label="Start / Result" />
        <LegendItem icon={GitBranch} color="text-accent-violet" label="Plan / decision" />
        <LegendItem icon={Code2} color="text-foreground/70" label="Transformation block" />
      </div>
    </DemoCard>
  );
}

function LegendItem({ icon: Icon, color, label }: { icon: IconType; color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon size={13} className={color} /> {label}
    </span>
  );
}
