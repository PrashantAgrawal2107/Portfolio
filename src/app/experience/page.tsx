import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience — Prashant Agrawal",
};

export default function ExperiencePage() {
  return <Experience />;
}
