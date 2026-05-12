import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Kahf" },
      { name: "description", content: "Articles, audio, and guided practices on Islamic mental wellness." },
      { property: "og:title", content: "Resources — Kahf" },
      { property: "og:description", content: "Articles, audio and reflections on faith-aligned wellness." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="Library"
      title="A quiet library, opening soon."
      description="Essays, guided reflections, and audio practices grounded in Islamic psychology — curated by our clinical team."
    />
  ),
});
