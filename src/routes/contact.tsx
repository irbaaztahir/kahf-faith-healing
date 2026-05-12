import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kahf" },
      { name: "description", content: "Get in touch with the Kahf team." },
      { property: "og:title", content: "Contact — Kahf" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: () => (
    <ComingSoonPage
      eyebrow="Get in touch"
      title="We'd love to hear from you."
      description="Partnerships, press, support — write to us at hello@kahf.app and we'll respond within one business day."
    />
  ),
});
