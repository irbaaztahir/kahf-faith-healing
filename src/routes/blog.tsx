import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Kahf" },
      { name: "description", content: "Reflections, clinical insights, and stories from the Kahf community." },
      { property: "og:title", content: "Blog — Kahf" },
      { property: "og:description", content: "Reflections and insights from our therapists." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="Journal"
      title="Words for the journey."
      description="Long-form reflections from our clinicians, scholars, and members. Publishing soon."
    />
  ),
});
