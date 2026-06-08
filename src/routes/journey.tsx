import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Award, Lock, Download, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Your healing journey — Kahf" },
      { name: "description", content: "A personal map of every session, journal entry, and step on your healing journey." },
      { property: "og:title", content: "Your healing journey — Kahf" },
      { property: "og:description", content: "Every session, every entry, every step — it all matters." },
    ],
  }),
  component: Journey,
});

const MOOD_DATA = Array.from({ length: 30 }).map((_, i) => ({
  day: `D${i + 1}`,
  mood: 2.5 + Math.sin(i / 4) * 0.8 + i / 40 + (i % 7 === 0 ? -0.5 : 0),
}));

const MILESTONES = [
  { id: "first", title: "First step", date: "Mar 12", unlocked: true },
  { id: "open", title: "Open heart", date: "Mar 14", unlocked: true },
  { id: "show", title: "Showing up", date: "Apr 02", unlocked: true },
  { id: "words", title: "Finding words", date: "Apr 18", unlocked: true },
  { id: "consist", title: "Consistent", date: "Apr 25", unlocked: true },
  { id: "month", title: "One month", date: "Apr 12", unlocked: true },
  { id: "half", title: "Halfway there", date: "May 04", unlocked: false },
  { id: "trust", title: "Trusted", date: "—", unlocked: false },
  { id: "moment", title: "Momentum", date: "—", unlocked: false },
  { id: "commit", title: "Committed", date: "—", unlocked: false },
  { id: "complete", title: "Journey complete", date: "—", unlocked: false },
];

const TIMELINE = [
  { type: "session", label: "Session with Dr. Amina", date: "Mar 12" },
  { type: "journal", label: "Journal entry", date: "Mar 14" },
  { type: "mood", label: "Mood check-in", date: "Mar 15" },
  { type: "milestone", label: "First step", date: "Mar 12" },
  { type: "session", label: "Session with Leila", date: "Mar 28" },
  { type: "journal", label: "Journal entry", date: "Apr 02" },
  { type: "milestone", label: "Showing up", date: "Apr 02" },
  { type: "mood", label: "Mood check-in", date: "Apr 05" },
  { type: "session", label: "Session with Dr. Amina", date: "Apr 18" },
];

function Journey() {
  const [range, setRange] = useState<"30" | "90" | "all">("30");
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-dusk md:text-5xl">Your healing journey</h1>
        <p className="mt-2 text-cool">Every session, every entry, every step — it all matters.</p>

        {/* Range tabs */}
        <div className="mt-6 inline-flex gap-1 rounded-[12px] border border-border bg-warm p-1">
          {[["30", "Last 30 days"], ["90", "Last 3 months"], ["all", "All time"]].map(([k, l]) => (
            <button key={k} onClick={() => setRange(k as any)} className={`kahf-btn rounded-[10px] px-4 py-2 text-xs ${range === k ? "bg-lavender text-dusk" : "text-cool"}`}>{l}</button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 kahf-stagger">
          <Stat label="Sessions completed" value="6" />
          <Stat label="Journal entries" value="14" />
          <Stat label="Days on Kahf" value="42" />
          <Stat label="Check-in streak" value="9" />
        </div>

        {/* Mood chart */}
        <div className="mt-8 rounded-[16px] border border-border bg-warm p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-dusk">Mood arc</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/40 px-3 py-1 text-xs text-dusk"><TrendingUp className="h-3.5 w-3.5" /> Trending upward</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={MOOD_DATA}>
                <defs>
                  <linearGradient id="moodArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a8c5b0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#a8c5b0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#8a8498" fontSize={10} />
                <YAxis domain={[1, 5]} stroke="#8a8498" fontSize={10} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(201,192,224,0.3)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="mood" stroke="#a8c5b0" strokeWidth={2.5} fill="url(#moodArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 rounded-[16px] border border-border bg-warm p-6">
          <h2 className="mb-5 font-display text-xl text-dusk">Journey timeline</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {TIMELINE.map((e, i) => (
              <div key={i} className="flex min-w-[140px] flex-col items-center text-center">
                <div className={`flex h-10 w-10 items-center justify-center ${
                  e.type === "session" ? "rounded-full bg-lavender" :
                  e.type === "journal" ? "rounded-[6px] bg-sage" :
                  e.type === "milestone" ? "rounded-full bg-gold text-dusk" :
                  "h-3 w-3 rounded-full bg-cool/50"
                }`}>
                  {e.type === "milestone" && <Award className="h-5 w-5" />}
                </div>
                <p className="mt-2 text-xs font-medium text-dusk">{e.label}</p>
                <p className="text-[11px] text-cool">{e.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-8">
          <h2 className="mb-5 font-display text-xl text-dusk">Milestones</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 kahf-stagger">
            {MILESTONES.map((m) => (
              <div key={m.id} className={`rounded-[16px] border p-5 text-center kahf-card ${
                m.unlocked ? "border-2 border-gold/60 bg-lavender/30" : "border-border bg-mist"
              }`}>
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[12px] ${m.unlocked ? "bg-warm text-sage" : "bg-cool/20 text-cool"}`}>
                  {m.unlocked ? <Award className="h-7 w-7" /> : <Lock className="h-5 w-5" />}
                </div>
                <p className={`mt-3 font-display text-base ${m.unlocked ? "text-dusk" : "text-cool"}`}>{m.title}</p>
                <p className="text-[11px] text-cool">{m.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="kahf-btn rounded-[12px] border-2 border-gold text-dusk hover:bg-gold/10">
            <Download className="mr-2 h-4 w-4" /> Download my journey summary
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-border border-t-4 border-t-sage bg-warm p-6 kahf-card">
      <p className="text-xs uppercase tracking-[0.2em] text-cool">{label}</p>
      <p className="mt-3 font-display text-4xl font-bold text-dusk kahf-count">{value}</p>
    </div>
  );
}
