"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { profile } from "@/lib/content";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

const ROTATING_WORDS = ["Agentic AI Agents", "LangGraph Workflows", "RAG Pipelines", "NL-to-SQL", "FastAPI Backends"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-grid pt-24 pb-16">
      <div className="absolute inset-0 opacity-70">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent-violet/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs sm:text-sm tracking-[0.3em] text-accent-cyan uppercase"
        >
          Software Engineer · Argusoft Pvt Ltd
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground"
        >
          Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
        </motion.h1>

        <div className="mt-5 h-10 sm:h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={ROTATING_WORDS[wordIndex]}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-medium text-muted"
            >
              I build{" "}
              <span className="text-foreground font-semibold">{ROTATING_WORDS[wordIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            See the work in action
          </Link>
          <a
            href={profile.links.resume}
            className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-white/[0.03] px-5 py-3 text-sm text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            <FileDown size={16} /> Resume
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-white/[0.03] px-5 py-3 text-sm text-foreground transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            <Mail size={16} /> Contact
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent-cyan"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
