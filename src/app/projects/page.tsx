import type { Metadata } from "next";
import { OtherProjects } from "@/components/sections/OtherProjects";

export const metadata: Metadata = {
  title: "Projects — Prashant Agrawal",
};

export default function ProjectsPage() {
  return <OtherProjects />;
}
