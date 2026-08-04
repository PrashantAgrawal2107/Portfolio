"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, GitBranch, Play, RotateCcw, Search, Sparkles } from "lucide-react";
import { DemoCard, DemoButton, PrimaryButton } from "./DemoCard";

type Route = "sql" | "vector" | "both";

type Scenario = {
  id: string;
  label: string;
  query: string;
  route: Route;
  sql?: string;
  doc?: string;
  reconcile: string;
  answer: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "sql",
    label: "Structured data",
    query: "What's our average claim turnaround time this quarter?",
    route: "sql",
    sql: "SELECT AVG(resolved_at - submitted_at)\nFROM claims\nWHERE submitted_at >= date_trunc('quarter', now());",
    reconcile: "Single structured source is authoritative — no reconciliation needed.",
    answer: "Average claim turnaround this quarter is 4.6 days, down from 6.1 days last quarter.",
  },
  {
    id: "vector",
    label: "Unstructured policy",
    query: "What does our HIPAA policy say about breach notification timelines?",
    route: "vector",
    doc: "\"...covered entities must notify affected individuals without unreasonable delay, and in no case later than 60 calendar days following discovery of a breach...\"\n— Section 4.2, Breach Notification Policy",
    reconcile: "Single document source is authoritative — no reconciliation needed.",
    answer: "Per Section 4.2 of the policy, affected individuals must be notified within 60 calendar days of discovering a breach.",
  },
  {
    id: "both",
    label: "Structured + policy",
    query: "Is our current denied-claim volume within what our SLA policy allows?",
    route: "both",
    sql: "SELECT COUNT(*) FROM claims\nWHERE status = 'denied'\n  AND submitted_at >= now() - interval '30 days';",
    doc: "\"...denial rates should not exceed 8% of total monthly submitted claims under the standard service tier...\"\n— Section 2.1, SLA Policy",
    reconcile: "214 denied / 2,850 submitted = 7.5% — cross-checked against the 8% SLA ceiling from policy. Within bounds.",
    answer: "Yes — current denial rate is 7.5%, just under the 8% ceiling defined in Section 2.1 of the SLA policy.",
  },
];

const STAGES = ["query", "route", "retrieve", "reconcile", "answer"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_LABEL: Record<Stage, string> = {
  query: "Query",
  route: "Route",
  retrieve: "Retrieve",
  reconcile: "Reconcile",
  answer: "Answer",
};

export function RagPipelineDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const scenario = SCENARIOS[scenarioIdx];

  useEffect(() => {
    if (!running) return;
    if (stageIdx >= STAGES.length - 1) return;
    const t = setTimeout(() => {
      setStageIdx((s) => {
        const next = s + 1;
        if (next >= STAGES.length - 1) setRunning(false);
        return next;
      });
    }, 900);
    return () => clearTimeout(t);
  }, [running, stageIdx]);

  const run = () => {
    setStageIdx(-1);
    setRunning(true);
    setTimeout(() => setStageIdx(0), 50);
  };

  const reset = () => {
    setRunning(false);
    setStageIdx(-1);
  };

  const selectScenario = (idx: number) => {
    setScenarioIdx(idx);
    reset();
  };

  const currentStage: Stage | null = stageIdx >= 0 ? STAGES[stageIdx] : null;
  const showSql = scenario.route === "sql" || scenario.route === "both";
  const showDoc = scenario.route === "vector" || scenario.route === "both";

  return (
    <DemoCard
      icon={<Database size={20} />}
      title="RAG + NL-to-SQL pipeline"
      description="Natural-language questions route to vector search, NL-to-SQL, or both — then get reconciled into one grounded answer."
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
            <Play size={13} /> Run pipeline
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

      <div className="mt-6 flex items-center">
        {STAGES.map((stage, idx) => {
          const state = stageIdx > idx ? "done" : stageIdx === idx ? "active" : "pending";
          return (
            <div key={stage} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                    state === "active"
                      ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[0_0_14px_rgba(79,216,232,0.45)]"
                      : state === "done"
                        ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                        : "border-panel-border text-muted"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-[11px] ${state === "pending" ? "text-muted" : "text-foreground/80"}`}
                >
                  {STAGE_LABEL[stage]}
                </span>
              </div>
              {idx < STAGES.length - 1 ? (
                <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    animate={{ width: stageIdx > idx ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-6 min-h-[168px]">
        <AnimatePresence mode="wait">
          {currentStage === "query" ? (
            <motion.div key="query" {...fadeProps} className="rounded-xl border border-panel-border bg-background-alt p-4">
              <p className="text-sm text-foreground/85">
                Parsing intent and entities from the natural-language question before deciding a retrieval path.
              </p>
            </motion.div>
          ) : null}

          {currentStage === "route" ? (
            <motion.div key="route" {...fadeProps} className="flex items-center gap-3 rounded-xl border border-panel-border bg-background-alt p-4">
              <GitBranch size={18} className="text-accent-violet" />
              <p className="text-sm text-foreground/85">
                Router decision: {" "}
                <span className="font-mono text-accent-cyan">
                  {scenario.route === "both" ? "vector_search + nl_to_sql" : scenario.route === "sql" ? "nl_to_sql" : "vector_search"}
                </span>
              </p>
            </motion.div>
          ) : null}

          {currentStage === "retrieve" ? (
            <motion.div key="retrieve" {...fadeProps} className="grid gap-3 sm:grid-cols-2">
              {showDoc ? (
                <div className="rounded-xl border border-accent-cyan/30 bg-background-alt p-4">
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-cyan">
                    <Search size={12} /> Vector search
                  </p>
                  <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-foreground/80">
                    {scenario.doc}
                  </pre>
                </div>
              ) : null}
              {showSql ? (
                <div className="rounded-xl border border-accent-violet/30 bg-background-alt p-4">
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-violet">
                    <Database size={12} /> NL-to-SQL
                  </p>
                  <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-foreground/80">
                    {scenario.sql}
                  </pre>
                </div>
              ) : null}
            </motion.div>
          ) : null}

          {currentStage === "reconcile" ? (
            <motion.div key="reconcile" {...fadeProps} className="rounded-xl border border-panel-border bg-background-alt p-4">
              <p className="text-sm text-foreground/85">{scenario.reconcile}</p>
            </motion.div>
          ) : null}

          {currentStage === "answer" ? (
            <motion.div
              key="answer"
              {...fadeProps}
              className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.04] p-4"
            >
              <Sparkles size={18} className="mt-0.5 shrink-0 text-emerald-300" />
              <p className="text-sm leading-relaxed text-foreground/90">{scenario.answer}</p>
            </motion.div>
          ) : null}

          {currentStage === null ? (
            <motion.div key="idle" {...fadeProps} className="flex h-full items-center justify-center rounded-xl border border-dashed border-panel-border p-8">
              <p className="text-sm text-muted">Press &ldquo;Run pipeline&rdquo; to watch the query flow through.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </DemoCard>
  );
}

const fadeProps = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3 },
};
