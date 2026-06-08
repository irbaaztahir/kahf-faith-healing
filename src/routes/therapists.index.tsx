import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { therapists, languages, concerns } from "@/data/kahf";
import { Search, Star, Sparkles } from "lucide-react";

export const Route = createFileRoute("/therapists/")({
  head: () => ({ meta: [{ title: "Browse therapists — Kahf" }] }),
  component: TherapistsPage,
});

function TherapistsPage() {
  const [q, setQ] = useState("");
  const [gender, setGender] = useState<string>("Any");
  const [lang, setLang] = useState<string>("Any");

  const filtered = therapists.filter((t) => {
    if (q && !t.name.toLowerCase().includes(q.toLowerCase()) && !t.specialties.join(" ").toLowerCase().includes(q.toLowerCase())) return false;
    if (gender !== "Any" && t.gender !== gender.toLowerCase()) return false;
    if (lang !== "Any" && !t.languages.includes(lang)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Therapists</p>
          <h1 className="font-display text-5xl leading-tight text-foreground">
            Find someone who <span className="italic">gets it.</span>
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, specialty…" className="h-11 rounded-full border-border bg-card pl-10" />
            </div>
            <FilterGroup label="Gender">
              {["Any", "Female", "Male"].map((g) => (
                <Chip key={g} active={gender === g} onClick={() => setGender(g)}>{g}</Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Language">
              {["Any", ...languages.filter((l) => l !== "Other")].map((l) => (
                <Chip key={l} active={lang === l} onClick={() => setLang(l)}>{l}</Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Specialty">
              {concerns.slice(0, 6).map((s) => (
                <Chip key={s} onClick={() => setQ(s)}>{s}</Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Madhab sensitivity">
              {["Any", "Hanafi", "Shafi'i", "Maliki", "Hanbali", "Ja'fari"].map((m) => (
                <Chip key={m}>{m}</Chip>
              ))}
            </FilterGroup>
          </aside>

          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((t) => (
              <Card key={t.id} className={`overflow-hidden rounded-2xl border-border/60 bg-card shadow-soft transition hover:shadow-elevated ${t.kahfPick ? "ring-2 ring-secondary" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  <img src={t.photo} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                  {t.kahfPick && (
                    <Badge className="absolute left-3 top-3 gap-1 rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-secondary-foreground">
                      <Sparkles className="h-3 w-3" /> Kahf Pick
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl text-foreground">{t.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.credentials}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" /> {t.rating}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.specialties.map((s) => (
                      <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">{t.languages.join(" · ")}</div>
                  <div className="mt-1 text-xs text-dusk">Next: {t.nextSlot}</div>
                  <div className="mt-5 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 rounded-full border-border">
                      <Link to="/therapists/$id" params={{ id: t.id }}>View profile</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 rounded-full bg-dusk text-mist hover:bg-dusk/90">
                      <Link to="/booking/$id" params={{ id: t.id }}>Book consult</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-12 text-center text-muted-foreground">No therapists match those filters yet.</p>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-dusk bg-dusk text-mist" : "border-border bg-card text-foreground hover:border-dusk/40"}`}
    >
      {children}
    </button>
  );
}
