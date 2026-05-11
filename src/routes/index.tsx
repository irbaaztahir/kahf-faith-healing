import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Heart, Star, Check } from "lucide-react";
import { therapists } from "@/data/kahf";
import { KahfLogo } from "@/components/brand/KahfLogo";
import heroPattern from "@/assets/hero-pattern.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAHF — Faith Aligned Mental Health Platform" },
      { name: "description", content: "KAHF connects Muslims worldwide with verified Islamic psychologists and therapists. Faith-sensitive, clinically excellent care." },
      { property: "og:title", content: "KAHF — Faith Aligned Mental Health Platform" },
      { property: "og:description", content: "Verified Muslim therapists. End-to-end encrypted. Faith-sensitive care." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <TherapistShowcase />
      <Testimonials />
      <Pricing />
      <ClosingCTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{ backgroundImage: `url(${heroPattern})`, backgroundSize: "560px" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-90" />
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 text-center md:pt-32 md:pb-40">
        <Badge className="mb-8 rounded-full border border-border/60 bg-card/70 px-4 py-1.5 text-[11px] font-normal uppercase tracking-[0.25em] text-muted-foreground hover:bg-card/70">
          A quiet space for Muslim hearts
        </Badge>
        <div className="mb-6 flex justify-center">
          <KahfLogo className="h-[72px] w-auto" />
        </div>
        <h1 className="font-display leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-8xl font-mono text-7xl">
          Faith Aligned Mental Health Platform
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          KAHF connects you with verified Islamic psychologists worldwide — clinically excellent care that honours your values, your story, your deen.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full bg-dusk px-7 text-mist hover:bg-dusk/90">
            <Link to="/quiz">Find your therapist</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-7 text-foreground hover:bg-card/60">
            <Link to="/therapist-portal">For therapists →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Verified therapists" },
    { icon: Lock, label: "End-to-end encrypted" },
    { icon: Heart, label: "Faith-sensitive care" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-16 gap-y-4 px-6 py-6">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <it.icon className="h-4 w-4 text-dusk" />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Match", d: "A short, gentle quiz helps us understand what you carry — and who can hold it well." },
    { n: "02", t: "Book", d: "Choose a free 15-minute consult or a full session with the therapist who feels right." },
    { n: "03", t: "Heal", d: "Meet on a calm, secure call. Reflect afterwards. Keep going at your own pace." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">How it works</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          Three quiet steps. <span className="italic">No noise.</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.n} className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-8">
              <p className="font-display text-5xl text-accent">{s.n}</p>
              <h3 className="mt-6 font-display text-2xl text-foreground">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TherapistShowcase() {
  return (
    <section className="bg-card/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Meet the team</p>
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              Therapists you can <span className="italic">trust.</span>
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden rounded-full text-foreground hover:bg-card md:inline-flex">
            <Link to="/therapists">Browse all →</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {therapists.map((t) => (
            <Card key={t.id} className="overflow-hidden rounded-2xl border-border/60 bg-background shadow-soft transition hover:shadow-elevated">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
                <img src={t.photo} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                {t.kahfPick && (
                  <Badge className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-secondary-foreground">
                    KAHF Pick
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl text-foreground">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.credentials}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.specialties.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {t.rating} <span className="text-muted-foreground">({t.reviews})</span>
                  </div>
                  <Button asChild size="sm" variant="ghost" className="rounded-full text-foreground hover:bg-muted">
                    <Link to="/therapists/$id" params={{ id: t.id }}>View →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "I finally felt understood without having to translate my faith.", a: "Fatima, 28" },
    { q: "My therapist held space for both my anxiety and my prayers.", a: "Yusuf, 34" },
    { q: "Quiet, intelligent care. Nothing performative.", a: "Mariam, 41" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Voices</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          From people who've <span className="italic">found their breath.</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <Card key={t.a} className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-8">
              <p className="font-display text-2xl leading-snug text-foreground">"{t.q}"</p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">— {t.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Free consult", price: "Free", note: "15 minutes", features: ["Meet your therapist", "No commitment", "Book in 2 minutes"], cta: "Start free" },
    { name: "Monthly", price: "$220", note: "per month", features: ["4 sessions/month", "Unlimited messaging", "Priority booking", "Cancel anytime"], cta: "Begin monthly", featured: true },
    { name: "Pay per session", price: "$85+", note: "per session", features: ["50-min sessions", "Choose any therapist", "Flexible scheduling"], cta: "Book a session" },
  ];
  return (
    <section className="bg-card/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Plans</p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Soft on your <span className="italic">budget too.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={`relative rounded-2xl shadow-soft ${t.featured ? "border-dusk bg-dusk text-mist" : "border-border/60 bg-background"}`}>
              <CardContent className="p-8">
                <p className={`text-xs uppercase tracking-[0.2em] ${t.featured ? "text-mist/70" : "text-muted-foreground"}`}>{t.name}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl">{t.price}</span>
                  <span className={`text-sm ${t.featured ? "text-mist/70" : "text-muted-foreground"}`}>{t.note}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 ${t.featured ? "text-accent" : "text-dusk"}`} />
                      <span className={t.featured ? "text-mist/90" : "text-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`mt-8 h-11 w-full rounded-full ${t.featured ? "bg-mist text-dusk hover:bg-mist/90" : "bg-dusk text-mist hover:bg-dusk/90"}`}>
                  <Link to="/quiz">{t.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-center">
      <h2 className="font-display text-5xl leading-tight text-foreground md:text-6xl">
        A space to <span className="italic">breathe</span>.<br />Whenever you're ready.
      </h2>
      <Button asChild size="lg" className="mt-10 h-12 rounded-full bg-dusk px-8 text-mist hover:bg-dusk/90">
        <Link to="/quiz">Begin your journey</Link>
      </Button>
    </section>
  );
}
