import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/programs/family")({
  head: () => ({
    meta: [
      { title: "Family Program — Kahf" },
      { name: "description", content: "Faith-integrated family therapy and parenting support for Muslim households." },
      { property: "og:title", content: "Family Program — Kahf" },
      { property: "og:description", content: "Healing together. Faith-integrated family support." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="For Families"
      title="Healing the family, together."
      description="Counsellors who understand Muslim family dynamics — marriage, parenting, intergenerational care. Launching soon."
    />
  ),
});
