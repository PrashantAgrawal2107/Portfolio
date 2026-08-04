import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills — Prashant Agrawal",
};

export default function SkillsPage() {
  return <Skills />;
}
