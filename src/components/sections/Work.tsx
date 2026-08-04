import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { flagshipProjects } from "@/lib/content";
import { MaskingDemo } from "@/components/demos/MaskingDemo";
import { AgentThinkingDemo } from "@/components/demos/AgentThinkingDemo";
import { RagPipelineDemo } from "@/components/demos/RagPipelineDemo";
import { WorkflowBuilderDemo } from "@/components/demos/WorkflowBuilderDemo";
import { WorkflowEditDemo } from "@/components/demos/WorkflowEditDemo";

export function Work() {
  const { aegis, compass } = flagshipProjects;

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="See the agents actually work"
        description="These are interactive re-creations of the systems I built, using synthetic data — press play on each one below."
      />

      {/* Aegis */}
      <div className="mt-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-violet">01 · Healthcare Compliance</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{aegis.title}</h3>
          <p className="text-muted">{aegis.subtitle}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
          <p>{aegis.description}</p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {aegis.highlights.map((h) => (
            <RevealItem key={h.title}>
              <div className="glass-panel h-full rounded-2xl p-5">
                <h4 className="text-sm font-semibold text-foreground">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">Agentic planner build phases</p>
          <div className="flex flex-wrap gap-2">
            {aegis.architecturePhases.map((phase, i) => (
              <span key={phase} className="flex items-center gap-1.5 text-xs text-muted">
                <span className="font-mono text-accent-cyan">{String(i + 1).padStart(2, "0")}</span>
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

        <div className="mt-10 space-y-6">
          <Reveal>
            <AgentThinkingDemo />
          </Reveal>
          <Reveal delay={0.05}>
            <RagPipelineDemo />
          </Reveal>
          <Reveal delay={0.1}>
            <MaskingDemo />
          </Reveal>
        </div>
      </div>

      <div className="my-20 h-px bg-gradient-to-r from-transparent via-panel-border to-transparent" />

      {/* Compass */}
      <div>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">02 · Workflow Automation</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">{compass.title}</h3>
          <p className="text-muted">{compass.subtitle}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
          <p>{compass.description}</p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {compass.highlights.map((h) => (
            <RevealItem key={h.title}>
              <div className="glass-panel h-full rounded-2xl p-5">
                <h4 className="text-sm font-semibold text-foreground">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
          {compass.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </Reveal>

        <div className="mt-10 space-y-6">
          <Reveal>
            <WorkflowBuilderDemo />
          </Reveal>
          <Reveal delay={0.05}>
            <WorkflowEditDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
