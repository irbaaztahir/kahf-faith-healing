import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { therapists } from "@/data/kahf";
import { Star, Play, Globe, Video, MessageCircle, Mic } from "lucide-react";

export const Route = createFileRoute("/therapists/$id")({
  loader: ({ params }) => {
    const therapist = therapists.find((t) => t.id === params.id);
    if (!therapist) throw notFound();
    return { therapist };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.therapist.name ?? "Therapist"} — KAHF` }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Therapist not found</h1>
        <Button asChild className="mt-6 rounded-full bg-dusk text-mist"><Link to="/therapists">Browse therapists</Link></Button>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background p-12 text-center">{error.message}</div>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { therapist: t } = Route.useLoaderData() as { therapist: typeof therapists[number] };
  const formatIcons: Record<string, typeof Video> = { Video, Chat: MessageCircle, Voice: Mic };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
              <img src={t.photo} alt={t.name} className="aspect-square w-full rounded-3xl object-cover shadow-soft" />
              <div>
                {t.kahfPick && (
                  <Badge className="mb-3 rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-secondary-foreground">
                    KAHF Pick
                  </Badge>
                )}
                <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{t.name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{t.credentials}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {t.rating} <span className="text-muted-foreground">({t.reviews} reviews)</span></span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Globe className="h-4 w-4" /> {t.languages.join(", ")}</span>
                </div>
              </div>
            </div>

            <Section title="A short hello">
              <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-dusk shadow-soft">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-mist/90 text-dusk transition hover:scale-105">
                  <Play className="h-6 w-6 fill-current" />
                </button>
                <p className="absolute bottom-4 left-5 text-sm text-mist/80">Intro video · 90 seconds</p>
              </div>
            </Section>

            <Section title="About">
              <p className="text-base leading-relaxed text-foreground">{t.bio}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.approach}</p>
            </Section>

            <Section title="Specialties">
              <div className="flex flex-wrap gap-2">
                {t.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-4 py-2 text-sm text-foreground">{s}</span>
                ))}
              </div>
            </Section>

            <Section title="Session formats">
              <div className="flex flex-wrap gap-3">
                {t.formats.map((f) => {
                  const Icon = formatIcons[f] ?? Video;
                  return (
                    <div key={f} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                      <Icon className="h-4 w-4 text-dusk" /> {f}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Availability">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }).map((_, i) => {
                  const date = new Date(); date.setDate(date.getDate() + i);
                  const free = i % 3 !== 0;
                  return (
                    <button key={i} disabled={!free} className={`flex flex-col items-center rounded-xl border p-3 text-xs transition ${free ? "border-border bg-card hover:border-dusk" : "border-border/40 bg-muted/40 text-muted-foreground/50"}`}>
                      <span>{date.toLocaleDateString(undefined, { weekday: "short" })}</span>
                      <span className="mt-1 font-display text-lg text-foreground">{date.getDate()}</span>
                      <span className="mt-1 text-[10px] text-dusk">{free ? "3 slots" : "—"}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="What people say">
              <div className="space-y-4">
                {[
                  { q: "She held space for both my faith and my struggles. Rare.", a: "Anonymous" },
                  { q: "Made me feel safe from the very first session.", a: "Anonymous" },
                ].map((r) => (
                  <Card key={r.q} className="rounded-2xl border-border/60 bg-card">
                    <CardContent className="p-6">
                      <p className="font-display text-lg text-foreground">"{r.q}"</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">— {r.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-border/60 bg-card shadow-elevated">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Next available</p>
                <p className="mt-1 font-display text-2xl text-foreground">{t.nextSlot}</p>
                <Button asChild className="mt-6 h-12 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">
                  <Link to="/booking/$id" params={{ id: t.id }} search={{ kind: "consult" }}>Book free 15-min consult</Link>
                </Button>
                <Button asChild variant="outline" className="mt-2 h-12 w-full rounded-full border-border">
                  <Link to="/booking/$id" params={{ id: t.id }} search={{ kind: "session" }}>Book session · ${t.price}</Link>
                </Button>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                  All sessions are end-to-end encrypted and completely confidential.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}
