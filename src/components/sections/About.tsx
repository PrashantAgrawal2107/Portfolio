import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="About"
        title="I like agents that actually decide things."
        description="Most 'AI features' are a single prompt wearing a trench coat. I work on the other kind — systems that plan, call tools, check their own work, and only ask a human when it genuinely matters. That's the kind of system I've spent the last year and a half building: compliance-grade agentic platforms for healthcare data and workflow automation."
      />

      <RevealGroup className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="glass-panel rounded-2xl px-5 py-6 h-full">
              <p className="text-2xl sm:text-3xl font-semibold text-gradient">{stat.value}</p>
              <p className="mt-2 text-sm text-muted leading-snug">{stat.label}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-14 grid gap-6 sm:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">Plan</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Break a request into sub-goals, pick the right tool for each, and decide what to do next based on what
            actually came back — not a fixed script.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">Protect</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Mask PII/PHI automatically before it crosses a trust boundary, so compliance isn&apos;t bolted on — it&apos;s
            structural.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">Retrieve</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Ground answers in real data — vector search over documents, NL-to-SQL over structured records — and
            reconcile the two before responding.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
