import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { therapists, moodScale } from "@/data/kahf";
import { MessageCircle, NotebookPen, Calendar, Compass, Settings as SettingsIcon } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.jpg";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Your space — KAHF" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [mood, setMood] = useState<number | null>(null);
  const upcoming = therapists[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.18]" style={{ backgroundImage: `url(${heroPattern})`, backgroundSize: "420px" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Assalāmu ʿalaykum</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">
            A gentle <span className="italic">welcome back</span>, Maryam.
          </h1>
          <p className="mt-2 text-muted-foreground">However today feels — there's space for it here.</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60 bg-card shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Today's check-in</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">How are you, right now?</h2>
            <div className="mt-6 grid grid-cols-5 gap-2">
              {moodScale.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`rounded-2xl border p-4 text-center transition ${mood === m.value ? "border-dusk bg-dusk text-mist" : "border-border bg-background hover:border-dusk/40"}`}
                >
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="mt-1 text-xs">{m.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-dusk text-mist shadow-soft">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-mist/70">Upcoming</p>
            <h2 className="mt-2 font-display text-2xl">Tomorrow · 10:00</h2>
            <div className="mt-4 flex items-center gap-3">
              <img src={upcoming.photo} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div className="text-sm">
                <p>{upcoming.name}</p>
                <p className="text-mist/70">50-min session</p>
              </div>
            </div>
            <Button asChild className="mt-6 w-full rounded-full bg-mist text-dusk hover:bg-mist/90">
              <Link to="/session">Enter waiting room</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card shadow-soft lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recent journal</p>
              <Link to="/journal" className="text-xs text-dusk">Open journal →</Link>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { d: "Mon", t: "Felt the dua I made on Sunday begin to settle…" },
                { d: "Sat", t: "A heavy day. Sat with it instead of fixing it." },
              ].map((e) => (
                <div key={e.d} className="flex gap-4 rounded-xl border border-border bg-background p-4">
                  <span className="font-display text-2xl text-accent">{e.d}</span>
                  <p className="text-sm leading-relaxed text-foreground">{e.t}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Messages</p>
            <div className="mt-4 flex items-start gap-3">
              <img src={upcoming.photo} alt="" className="h-10 w-10 rounded-xl object-cover" />
              <div className="text-sm">
                <p className="font-medium text-foreground">{upcoming.name}</p>
                <p className="line-clamp-2 text-muted-foreground">Looking forward to our session tomorrow…</p>
              </div>
            </div>
            <Button variant="outline" className="mt-5 w-full rounded-full border-border">
              <MessageCircle className="mr-2 h-4 w-4" /> Open thread
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-3">
          <QuickLink to="/therapists" icon={Compass} label="Browse therapists" />
          <QuickLink to="/journal" icon={NotebookPen} label="Mood journal" />
          <QuickLink to="/settings" icon={SettingsIcon} label="Settings" />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label }: { to: string; icon: typeof Calendar; label: string }) {
  return (
    <Link to={to} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-dusk/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/40 text-dusk">
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-display text-lg text-foreground">{label}</span>
    </Link>
  );
}
