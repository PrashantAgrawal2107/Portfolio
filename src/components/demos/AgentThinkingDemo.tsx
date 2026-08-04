"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Play, RotateCcw } from "lucide-react";
import { DemoCard, DemoButton, PrimaryButton } from "./DemoCard";

type StepType = "thought" | "action" | "observation" | "check" | "escalate" | "answer";

type Step = {
  type: StepType;
  text: string;
  meta?: string;
  confidence?: number;
};

const STEP_STYLE: Record<StepType, { label: string; dot: string; text: string }> = {
  thought: { label: "Thought", dot: "bg-accent-violet", text: "text-accent-violet" },
  action: { label: "Action", dot: "bg-accent-cyan", text: "text-accent-cyan" },
  observation: { label: "Observation", dot: "bg-slate-400", text: "text-slate-300" },
  check: { label: "Self-check", dot: "bg-amber-400", text: "text-amber-300" },
  escalate: { label: "Escalate", dot: "bg-accent-rose", text: "text-accent-rose" },
  answer: { label: "Final answer", dot: "bg-emerald-400", text: "text-emerald-300" },
};

const SCENARIOS: { id: string; label: string; query: string; steps: Step[] }[] = [
  {
    id: "direct",
    label: "Claims below confidence bar",
    query: "How many claims were denied in the last 30 days, and why?",
    steps: [
      { type: "thought", text: "Structured aggregation over claim records. Plan: NL-to-SQL query, then mask any identifying columns before responding." },
      { type: "action", text: "sql_tool.query(claims, status='denied', window='30d')", meta: "NL-to-SQL" },
      { type: "observation", text: "214 rows returned across 6 denial reason codes. Columns include patient_name, ssn — flagged as sensitive." },
      { type: "check", text: "Sensitive columns detected in result set → routing through masking layer before aggregation is returned.", confidence: 0.55 },
      { type: "action", text: "masking_tool.apply(rows, fields=['patient_name','ssn'])", meta: "PII/PHI Masking" },
      { type: "observation", text: "Rows masked. Aggregate counts re-validated against pre-mask totals — match ✓." },
      { type: "thought", text: "Aggregate-only answer needed, no row-level PII required. Confidence sufficient to respond directly.", confidence: 0.94 },
      { type: "answer", text: "214 claims were denied in the last 30 days — 61% for missing prior authorization, 24% for coding mismatches, 15% for coverage lapses." },
    ],
  },
  {
    id: "escalate",
    label: "Low-confidence → escalation",
    query: "Does our telehealth consent policy cover minors in emergency visits?",
    steps: [
      { type: "thought", text: "Policy question over unstructured documents. Plan: vector search over the compliance corpus." },
      { type: "action", text: "vector_search.query('telehealth consent minors emergency')", meta: "RAG Retrieval" },
      { type: "observation", text: "Top-3 chunks retrieved from general consent policy — none directly address the minors + emergency combination." },
      { type: "check", text: "Retrieved context doesn't fully answer the question. Confidence below threshold (0.4).", confidence: 0.4 },
      { type: "escalate", text: "Escalating: broadening retrieval to related policy sections and prior addenda instead of answering on weak grounding." },
      { type: "action", text: "vector_search.query(expanded_scope=['pediatric_addendum','emergency_care_policy'])", meta: "Adaptive Retrieval" },
      { type: "observation", text: "Found pediatric emergency addendum — explicitly covers verbal guardian consent for emergency telehealth visits." },
      { type: "thought", text: "Now grounded in the right section. Confidence sufficient to answer.", confidence: 0.91 },
      { type: "answer", text: "Yes — per the pediatric emergency addendum, verbal guardian consent is permitted for emergency telehealth visits, with written consent required within 24 hours." },
    ],
  },
];

export function AgentThinkingDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [running, setRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    if (!running) return;
    if (visibleCount >= scenario.steps.length) return;
    const timeout = setTimeout(() => {
      setVisibleCount((c) => {
        const next = c + 1;
        if (next >= scenario.steps.length) setRunning(false);
        return next;
      });
    }, 750);
    return () => clearTimeout(timeout);
  }, [running, visibleCount, scenario.steps.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  const run = () => {
    setVisibleCount(0);
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setVisibleCount(0);
  };

  const selectScenario = (idx: number) => {
    setScenarioIdx(idx);
    setVisibleCount(0);
    setRunning(false);
  };

  const latestConfidence = [...scenario.steps.slice(0, visibleCount)].reverse().find((s) => s.confidence)?.confidence;

  return (
    <DemoCard
      icon={<BrainCircuit size={20} />}
      title="Agentic reasoning trace"
      description="Not a single LLM call — a planner loop that acts, observes, checks its own confidence, and escalates to deeper retrieval when needed."
      controls={
        <>
          {SCENARIOS.map((s, idx) => (
            <DemoButton key={s.id} active={scenarioIdx === idx} onClick={() => selectScenario(idx)}>
              {s.label}
            </DemoButton>
          ))}
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-panel-border bg-background-alt px-4 py-3">
        <p className="text-sm text-foreground/90">
          <span className="text-muted">Query — </span>
          &ldquo;{scenario.query}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <PrimaryButton onClick={run} disabled={running}>
            <Play size={13} /> Run agent
          </PrimaryButton>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset"
            className="rounded-full border border-panel-border p-2 text-muted hover:text-foreground"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="mt-4 max-h-[380px] space-y-3 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {scenario.steps.slice(0, visibleCount).map((step, i) => (
            <motion.div
              key={`${scenario.id}-${i}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-3 rounded-xl border border-panel-border bg-background-alt/60 p-3.5"
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STEP_STYLE[step.type].dot}`} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-[11px] uppercase tracking-wider ${STEP_STYLE[step.type].text}`}>
                    {STEP_STYLE[step.type].label}
                  </span>
                  {step.meta ? (
                    <span className="rounded-full border border-panel-border px-2 py-0.5 font-mono text-[10px] text-muted">
                      {step.meta}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {running && visibleCount < scenario.steps.length ? (
          <div className="flex items-center gap-1.5 pl-1 text-muted">
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-cyan" />
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-cyan [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-cyan [animation-delay:300ms]" />
          </div>
        ) : null}
      </div>

      {latestConfidence !== undefined ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Model confidence</span>
            <span className="font-mono">{Math.round(latestConfidence * 100)}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              animate={{ width: `${latestConfidence * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${latestConfidence < 0.6 ? "bg-accent-rose" : "bg-emerald-400"}`}
            />
          </div>
        </div>
      ) : null}
    </DemoCard>
  );
}
