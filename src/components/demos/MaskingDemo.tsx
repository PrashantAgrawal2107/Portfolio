"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Shuffle } from "lucide-react";
import { DemoCard, DemoButton } from "./DemoCard";

const SAMPLES = [
  "Patient: Jordan Blake, DOB: 04/12/1988, SSN: 221-09-4453.\nPhone: (415) 555-0192, Email: jordan.blake@example.com\nNote: Presented for follow-up on hypertension management. Reachable at above number after 5pm.",
  "Claimant: Priya Nandan, DOB: 09/23/1991, SSN: 118-45-2207.\nPhone: (312) 555-0148, Email: priya.n@example.com\nNote: Denied claim #4471 pending resubmission with updated diagnosis code.",
  "Patient: Marcus Webb, DOB: 01/07/1979, SSN: 552-31-8890.\nPhone: (206) 555-0173, Email: marcus.webb@example.com\nNote: Scheduled telehealth consult for medication review next Tuesday.",
];

type Entity = { type: "name" | "dob" | "ssn" | "phone" | "email"; label: string };

const ENTITY_STYLES: Record<Entity["type"], { border: string; text: string; label: string }> = {
  name: { border: "border-accent-violet/50", text: "text-accent-violet", label: "Name" },
  dob: { border: "border-accent-rose/50", text: "text-accent-rose", label: "DOB" },
  ssn: { border: "border-red-400/50", text: "text-red-300", label: "SSN" },
  phone: { border: "border-accent-cyan/50", text: "text-accent-cyan", label: "Phone" },
  email: { border: "border-amber-400/50", text: "text-amber-300", label: "Email" },
};

const PATTERNS: { type: Entity["type"]; regex: RegExp }[] = [
  { type: "ssn", regex: /\b\d{3}-\d{2}-\d{4}\b/g },
  { type: "dob", regex: /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g },
  { type: "email", regex: /[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/g },
  { type: "phone", regex: /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g },
  { type: "name", regex: /(?:Patient|Claimant|Name)(:\s*)([A-Z][a-z]+\s[A-Z][a-z]+)/g },
];

type Chunk = { text: string; entity?: Entity["type"] };

function tokenize(input: string): Chunk[] {
  const marks: { start: number; end: number; type: Entity["type"] }[] = [];

  for (const { type, regex } of PATTERNS) {
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input))) {
      const full = match[0];
      const nameGroup = type === "name" ? match[2] : null;
      const start = type === "name" && nameGroup ? match.index + match[0].indexOf(nameGroup) : match.index;
      const value = type === "name" && nameGroup ? nameGroup : full;
      marks.push({ start, end: start + value.length, type });
    }
  }

  marks.sort((a, b) => a.start - b.start);
  const filtered: typeof marks = [];
  let lastEnd = -1;
  for (const mark of marks) {
    if (mark.start >= lastEnd) {
      filtered.push(mark);
      lastEnd = mark.end;
    }
  }

  const chunks: Chunk[] = [];
  let cursor = 0;
  for (const mark of filtered) {
    if (mark.start > cursor) chunks.push({ text: input.slice(cursor, mark.start) });
    chunks.push({ text: input.slice(mark.start, mark.end), entity: mark.type });
    cursor = mark.end;
  }
  if (cursor < input.length) chunks.push({ text: input.slice(cursor) });

  return chunks;
}

function maskValue(value: string) {
  return value.replace(/[^\s]/g, "█");
}

export function MaskingDemo() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [input, setInput] = useState(SAMPLES[0]);

  const chunks = useMemo(() => tokenize(input), [input]);
  const entityCount = chunks.filter((c) => c.entity).length;

  const cycleSample = () => {
    const next = (sampleIndex + 1) % SAMPLES.length;
    setSampleIndex(next);
    setInput(SAMPLES[next]);
  };

  return (
    <DemoCard
      icon={<ShieldCheck size={20} />}
      title="Live PII / PHI masking"
      description="Type your own text below (or load a synthetic sample) and watch the agent's masking layer redact sensitive fields in real time, before they leave the trust boundary."
      controls={
        <DemoButton onClick={cycleSample}>
          <span className="inline-flex items-center gap-1.5">
            <Shuffle size={13} /> New sample
          </span>
        </DemoButton>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">Raw input · agent receives</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            spellCheck={false}
            className="w-full resize-none rounded-xl border border-panel-border bg-background-alt p-4 font-mono text-[13px] leading-relaxed text-foreground/90 outline-none focus:border-accent-cyan/50"
          />
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            Masked output · leaves trust boundary
          </p>
          <div className="relative h-[152px] overflow-y-auto rounded-xl border border-panel-border bg-background-alt p-4 font-mono text-[13px] leading-relaxed">
            <AnimatePresence mode="popLayout">
              {chunks.map((chunk, i) =>
                chunk.entity ? (
                  <motion.span
                    key={`${sampleIndex}-${i}-${chunk.text}`}
                    initial={{ opacity: 0.3, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.35 }}
                    className={`rounded border px-0.5 ${ENTITY_STYLES[chunk.entity].border} ${ENTITY_STYLES[chunk.entity].text}`}
                    title={ENTITY_STYLES[chunk.entity].label}
                  >
                    {maskValue(chunk.text)}
                  </motion.span>
                ) : (
                  <span key={`${sampleIndex}-${i}`} className="whitespace-pre-wrap text-foreground/70">
                    {chunk.text}
                  </span>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-xs text-muted">
          {entityCount} sensitive field{entityCount === 1 ? "" : "s"} detected &amp; masked
        </span>
        {(Object.keys(ENTITY_STYLES) as Entity["type"][]).map((type) => (
          <span key={type} className={`flex items-center gap-1.5 text-xs ${ENTITY_STYLES[type].text}`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-current`} />
            {ENTITY_STYLES[type].label}
          </span>
        ))}
      </div>
    </DemoCard>
  );
}
