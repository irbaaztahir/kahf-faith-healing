import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/programs/student")({
  head: () => ({
    meta: [
      { title: "Student Program — Kahf" },
      { name: "description", content: "Mental wellness program for Muslim students at universities and colleges." },
      { property: "og:title", content: "Student Program — Kahf" },
      { property: "og:description", content: "Faith-aligned mental wellness for Muslim students." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="For Students & Universities"
      title="Mental wellness, made for Muslim students."
      description="A culturally rooted program for university Islamic societies and student wellbeing offices. Launching soon — get in touch to bring Kahf to your campus."
    />
  ),
});
