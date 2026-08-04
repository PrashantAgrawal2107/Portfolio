import { Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-panel-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, React Three Fiber &amp; Framer Motion.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent-cyan"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent-cyan"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.links.leetcode}
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            className="text-muted transition-colors hover:text-accent-cyan"
          >
            <Code2 size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent-cyan"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
