import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Selected Work — Prashant Agrawal",
};

export default function WorkPage() {
  return <Work />;
}
