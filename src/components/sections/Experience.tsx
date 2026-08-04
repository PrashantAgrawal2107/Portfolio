import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Experience"
        title="Where the work happened"
        description="A little over a year, three roles, one steady arc: full-stack fundamentals → FastAPI & GenAI foundations → shipping agentic AI in production."
      />

      <div className="relative mt-16">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-cyan/60 via-accent-violet/40 to-transparent sm:left-[7px]" />

        <ol className="space-y-14">
          {experience.map((job, idx) => (
            <li key={job.role} className="relative pl-8">
              <Reveal delay={idx * 0.05}>
                <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent-cyan bg-background shadow-[0_0_16px_rgba(79,216,232,0.5)]" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-foreground">{job.role}</h3>
                  <span className="font-mono text-xs text-accent-cyan">{job.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {job.company} · {job.location}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm sm:text-[15px] leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
