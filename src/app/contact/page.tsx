import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Prashant Agrawal",
};

export default function ContactPage() {
  return <Contact />;
}
