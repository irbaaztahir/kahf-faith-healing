import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { moodScale } from "@/data/kahf";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Journal — KAHF" }] }),
  component: JournalPage,
});

const prompts = [
  "What are you grateful for today?",
  "What would you ask Allah for?",
  "Where did you feel most yourself?",
  "What can you forgive yourself for?",
];

// Faux mood data for the calendar
const moodData: Record<number, number> = {
  2: 3, 4: 4, 5: 5, 7: 2, 9: 4, 11: 3, 13: 5, 15: 4, 17: 3, 19: 4, 21: 5, 23: 3, 25: 4,
};

const moodColors: Record<number, string> = {
  1: "bg-neutral-300",
  2: "bg-secondary/50",
  3: "bg-secondary",
  4: "bg-accent/60",
  5: "bg-accent",
};

function JournalPage() {
  const [mood, setMood] = useState<number | null>(null);
  const [text, setText] = useState("");
  const today = new Date();
  const days = Array.from({ length: today.getDate() }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Journal</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">A quiet place to <span className="italic">notice.</span></h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-3.5 w-3.5" /> Private. Never shared, unless you choose to.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">New entry</p>
              <h2 className="mt-2 font-display text-2xl text-foreground">{today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</h2>

              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Mood</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {moodScale.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`rounded-2xl border p-3 text-center transition ${mood === m.value ? "border-dusk bg-dusk text-mist" : "border-border bg-background hover:border-dusk/40"}`}
                  >
                    <div className="text-2xl">{m.emoji}</div>
                    <div className="mt-1 text-xs">{m.label}</div>
                  </button>
                ))}
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Prompts</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {prompts.map((p) => (
                  <button key={p} onClick={() => setText((t) => (t ? t : p + "\n\n"))} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:border-dusk/40">
                    {p}
                  </button>
                ))}
              </div>

              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Begin gently…" className="mt-4 min-h-[260px] rounded-2xl border-border bg-background font-display text-lg leading-relaxed" />

              <Button className="mt-6 h-11 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">Save entry</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{today.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
              <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="text-[10px] uppercase tracking-wider text-muted-foreground">{d}</div>
                ))}
                {days.map((d) => {
                  const m = moodData[d];
                  return (
                    <div key={d} className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border/40 bg-background p-1 text-[10px]">
                      <span className="text-muted-foreground">{d}</span>
                      {m && <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${moodColors[m]}`} />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 space-y-2 text-xs">
                <p className="uppercase tracking-[0.2em] text-muted-foreground">Mood key</p>
                {moodScale.map((m) => (
                  <div key={m.value} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${moodColors[m.value]}`} />
                    <span className="text-foreground">{m.emoji} {m.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
