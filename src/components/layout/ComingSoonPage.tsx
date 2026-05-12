import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";

export function ComingSoonPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-dusk md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild className="kahf-btn h-11 rounded-full bg-deep-teal px-6 text-warm-white hover:bg-deep-teal/90">
            <Link to="/">Back home</Link>
          </Button>
          <Button asChild variant="outline" className="kahf-btn h-11 rounded-full border-deep-teal bg-transparent px-6 text-deep-teal hover:bg-cream">
            <Link to="/therapists">Find a therapist</Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
