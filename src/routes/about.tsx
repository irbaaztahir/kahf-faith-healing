import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kahf" },
      { name: "description", content: "Our story, mission, and the team behind Kahf." },
      { property: "og:title", content: "About Kahf" },
      { property: "og:description", content: "Healing rooted in faith, guided by science." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="About Kahf"
      title="Healing rooted in faith, guided by science."
      description="Our story, our team, and our commitment to making faith-aligned mental health care accessible to every Muslim. Full page coming soon."
    />
  ),
});
