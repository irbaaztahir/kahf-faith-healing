import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Kahf" },
      { name: "description", content: "How Kahf protects your privacy and data." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="Trust"
      title="Privacy, by design."
      description="Our full privacy policy is being finalised by counsel. In short: end-to-end encrypted sessions, no data sold, ever."
    />
  ),
});
