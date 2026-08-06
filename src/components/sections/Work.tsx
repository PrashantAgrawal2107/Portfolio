import type { ReactNode } from "react";
import { ShieldCheck, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { flagshipProjects } from "@/lib/content";
import { MaskingDemo } from "@/components/demos/MaskingDemo";
import { AgentThinkingDemo } from "@/components/demos/AgentThinkingDemo";
import { RagPipelineDemo } from "@/components/demos/RagPipelineDemo";
import { WorkflowBuilderDemo } from "@/components/demos/WorkflowBuilderDemo";
import { WorkflowEditDemo } from "@/components/demos/WorkflowEditDemo";

type AccentKey = "violet" | "rose";

const ACCENT: Record<AccentKey, { text: string; badgeBg: string; dot: string; hover: string; glow: string }> = {
  violet: {
    text: "text-accent-violet",
    badgeBg: "bg-accent-violet/10",
    dot: "bg-accent-violet",
    hover: "hover:border-accent-violet/50 hover:text-accent-violet",
    glow: "bg-accent-violet/10",
  },
  rose: {
    text: "text-accent-rose",
    badgeBg: "bg-accent-rose/10",
    dot: "bg-accent-rose",
    hover: "hover:border-accent-rose/50 hover:text-accent-rose",
    glow: "bg-accent-rose/10",
  },
};

type DemoEntry = { id: string; label: string; node: ReactNode };

function DemoJumpNav({ demos, accent }: { demos: DemoEntry[]; accent: AccentKey }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted">Jump to a demo —</span>
      {demos.map((d) => (
        <a
          key={d.id}
          href={`#${d.id}`}
          className={`rounded-full border border-panel-border bg-white/[0.03] px-3 py-1.5 text-foreground/80 transition-colors ${ACCENT[accent].hover}`}
        >
          {d.label}
        </a>
      ))}
    </div>
  );
}

function DemoList({ demos, accent }: { demos: DemoEntry[]; accent: AccentKey }) {
  return (
    <div className="mt-10">
      {demos.map((d, i) => (
        <div key={d.id} id={d.id} className={`scroll-mt-28 ${i > 0 ? "mt-14 border-t border-panel-border pt-14" : ""}`}>
          <div className="mb-5 flex items-center gap-3">
            <span className={`font-mono text-xs tracking-widest whitespace-nowrap ${ACCENT[accent].text}`}>
              DEMO {i + 1} OF {demos.length}
            </span>
            <span className="h-px flex-1 bg-panel-border" />
          </div>
          <Reveal>{d.node}</Reveal>
        </div>
      ))}
    </div>
  );
}

function ProjectHeader({
  icon: Icon,
  accent,
  eyebrow,
  title,
  subtitle,
}: {
  icon: typeof ShieldCheck;
  accent: AccentKey;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Reveal className="flex items-start gap-4">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${ACCENT[accent].badgeBg} ${ACCENT[accent].text}`}>
        <Icon size={24} />
      </span>
      <div>
        <p className={`font-mono text-xs uppercase tracking-[0.25em] ${ACCENT[accent].text}`}>{eyebrow}</p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted">{subtitle}</p>
      </div>
    </Reveal>
  );
}

function HighlightGrid({ highlights, accent }: { highlights: { title: string; body: string }[]; accent: AccentKey }) {
  return (
    <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
      {highlights.map((h) => (
        <RevealItem key={h.title}>
          <div className="glass-panel h-full rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT[accent].dot}`} />
              <h4 className="text-sm font-semibold text-foreground">{h.title}</h4>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function Work() {
  const { aegis, compass } = flagshipProjects;

  const aegisDemos: DemoEntry[] = [
    { id: "aegis-reasoning", label: "Agentic reasoning", node: <AgentThinkingDemo /> },
    { id: "aegis-rag", label: "RAG + NL-to-SQL", node: <RagPipelineDemo /> },
    { id: "aegis-masking", label: "PII/PHI masking", node: <MaskingDemo /> },
  ];

  const compassDemos: DemoEntry[] = [
    { id: "compass-creation", label: "Pipeline creation", node: <WorkflowBuilderDemo /> },
    { id: "compass-edit", label: "Pipeline editing", node: <WorkflowEditDemo /> },
  ];

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="See the agents actually work"
        description="These are interactive re-creations of the systems I built, using synthetic data — press play on each one below."
      />

      {/* Aegis */}
      <div className="relative mt-16">
        <div className={`pointer-events-none absolute -top-10 -left-16 -z-10 h-72 w-72 rounded-full ${ACCENT.violet.glow} blur-[100px]`} />

        <ProjectHeader
          icon={ShieldCheck}
          accent="violet"
          eyebrow="01 · Healthcare Compliance"
          title={aegis.title}
          subtitle={aegis.subtitle}
        />

        <Reveal delay={0.08} className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
          <p>{aegis.description}</p>
        </Reveal>

        <HighlightGrid highlights={aegis.highlights} accent="violet" />

        <Reveal delay={0.1} className="mt-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">Agentic planner build phases</p>
          <div className="flex flex-wrap gap-2">
            {aegis.architecturePhases.map((phase, i) => (
              <span key={phase} className="flex items-center gap-1.5 text-xs text-muted">
                <span className="font-mono text-accent-violet">{String(i + 1).padStart(2, "0")}</span>
                {phase}
                {i < aegis.architecturePhases.length - 1 ? <span className="text-panel-border">→</span> : null}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-6 flex flex-wrap gap-2">
          {aegis.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </Reveal>

        <DemoJumpNav demos={aegisDemos} accent="violet" />
        <DemoList demos={aegisDemos} accent="violet" />
      </div>

      <div className="my-20 h-px bg-gradient-to-r from-transparent via-panel-border to-transparent" />

      {/* Compass */}
      <div className="relative">
        <div className={`pointer-events-none absolute -top-10 -right-16 -z-10 h-72 w-72 rounded-full ${ACCENT.rose.glow} blur-[100px]`} />

        <ProjectHeader
          icon={Workflow}
          accent="rose"
          eyebrow="02 · Workflow Automation"
          title={compass.title}
          subtitle={compass.subtitle}
        />

        <Reveal delay={0.08} className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
          <p>{compass.description}</p>
        </Reveal>

        <HighlightGrid highlights={compass.highlights} accent="rose" />

        <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
          {compass.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </Reveal>

        <DemoJumpNav demos={compassDemos} accent="rose" />
        <DemoList demos={compassDemos} accent="rose" />
      </div>
    </section>
  );
}
