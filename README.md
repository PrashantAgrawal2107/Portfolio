# Prashant Agrawal — Portfolio

A 3D, animation-driven portfolio built with Next.js, React Three Fiber, and Framer Motion. Instead of just describing the agentic AI work done at Argusoft, the site includes live, interactive re-creations of it:

- **Live PII/PHI masking** — type text and watch sensitive fields get detected and redacted in real time.
- **Agentic reasoning trace** — press play to watch a planner loop think, act, self-check, and escalate.
- **RAG + NL-to-SQL pipeline** — an animated flow diagram showing routing, retrieval, and reconciliation.
- **LangGraph workflow builder** — watch an agent "design" a workflow graph node-by-node.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber / drei / postprocessing · lucide-react

## Project structure

```
src/
  app/                  # routes, layout, metadata, generated favicon (icon.tsx)
  components/
    layout/              Navbar, Footer
    three/                3D hero background (NeuralField, HeroScene)
    ui/                   Reveal (scroll-in animation), SectionHeading, Badge
    demos/                The 4 interactive demos + shared DemoCard chrome
    sections/             Hero, About, Experience, Work, OtherProjects, Skills, Contact
    icons/                Inline GitHub/LinkedIn brand SVGs (lucide-react dropped these)
  lib/
    content.ts            *** All editable copy lives here: name, links, experience,
                           project descriptions, skills, education ***
```

## Before you deploy — things to fill in

Everything you need to change is in **`src/lib/content.ts`**, plus two things below it:

1. **`profile.links`** — swap the placeholder `github` / `linkedin` / `leetcode` URLs for your real profile URLs.
2. **`public/resume.pdf`** — already contains your resume; replace this file if you update your resume.
3. **Project codenames** — `PDS` and `Zvaluate` (real, confidential Argusoft client projects) are presented here as **"Project Aegis"** and **"Project Compass"** with a visible confidentiality note, per your call on how to handle NDA-sensitive project names. Rename/adjust in `flagshipProjects` in `content.ts` if you'd rather use the real names or word it differently.
4. **`metadataBase`** in `src/app/layout.tsx` — currently a placeholder (`https://your-portfolio.vercel.app`); update it to your real Vercel URL once you have one, for correct Open Graph/social preview links.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

This is a stock Next.js app — zero configuration needed.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset "Next.js" is auto-detected. Click **Deploy**.

Every subsequent push to your main branch redeploys automatically.
