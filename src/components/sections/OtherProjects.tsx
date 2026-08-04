import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { otherProjects } from "@/lib/content";

export function OtherProjects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="More builds"
        title="Other projects"
        description="Full-stack builds and platform work outside the two flagship agentic systems above."
      />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project) => (
          <RevealItem key={project.name}>
            <div className="glass-panel group h-full rounded-2xl p-6 transition-colors hover:border-accent-cyan/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent-cyan">{project.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{project.name}</h3>
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} repository`}
                    className="text-muted transition-colors hover:text-accent-cyan"
                  >
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
