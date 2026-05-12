import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Kahf" },
      { name: "description", content: "Kahf terms of service." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="Trust"
      title="Terms of Service."
      description="Our full terms are being finalised. Reach out to legal@kahf.app for the current draft."
    />
  ),
});
