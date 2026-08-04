import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio.vercel.app"),
  title: "Prashant Agrawal — Agentic AI & Full-Stack Engineer",
  description:
    "Software Engineer building agentic AI systems, LangGraph-orchestrated workflows, RAG pipelines, and full-stack platforms.",
  keywords: [
    "Prashant Agrawal",
    "Agentic AI",
    "LangGraph",
    "RAG Pipeline",
    "FastAPI",
    "Software Engineer",
    "Portfolio",
  ],
  openGraph: {
    title: "Prashant Agrawal — Agentic AI & Full-Stack Engineer",
    description:
      "Software Engineer building agentic AI systems, LangGraph-orchestrated workflows, RAG pipelines, and full-stack platforms.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
