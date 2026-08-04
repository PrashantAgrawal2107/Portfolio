import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { education, skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="Toolbox" title="Skills & tools" />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <RevealItem key={group.category}>
            <div className="glass-panel h-full rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-accent-cyan">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-panel-border bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-8">
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Education</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{education.degree}</h3>
          <p className="text-sm text-muted">
            {education.school} · {education.period} · {education.gpa}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <span key={c} className="rounded-full border border-panel-border px-3 py-1 text-xs text-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
