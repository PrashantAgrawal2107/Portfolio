"use client";

import { useState } from "react";
import { Check, Copy, Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build something that actually thinks"
        description="Open to conversations about agentic AI, RAG systems, and full-stack roles. Reach out any time."
        align="center"
      />

      <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <button
            type="button"
            onClick={copyEmail}
            className="group mx-auto inline-flex items-center gap-3 rounded-full border border-panel-border bg-white/[0.03] px-6 py-3 text-base font-medium text-foreground transition-colors hover:border-accent-cyan/50"
          >
            <Mail size={18} className="text-accent-cyan" />
            {profile.email}
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-muted" />}
          </button>

          <div className="mt-8 flex items-center justify-center gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-cyan"
            >
              <GithubIcon size={17} /> GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-cyan"
            >
              <LinkedinIcon size={17} /> LinkedIn
            </a>
            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-cyan"
            >
              <Code2 size={17} /> LeetCode
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
