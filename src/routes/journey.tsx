import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Award, Lock, Download, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Your healing journey — Kahf" },
      { name: "description", content: "A personal map of every session, journal entry, and step on your healing journey." },
    ],
  }),
  component: Journey,
});

type Mood = { mood: number; created_at: string };
type Journal = { id: string; created_at: string };
type Sess = { id: string; scheduled_at: string; status: string; therapist_name: string | null };

const MILESTONES = [
  { id: "first", title: "First step", threshold: { sessions: 1 } },
  { id: "open", title: "Open heart", threshold: { journals: 1 } },
  { id: "show", title: "Showing up", threshold: { sessions: 3 } },
  { id: "words", title: "Finding words", threshold: { journals: 5 } },
  { id: "consist", title: "Consistent", threshold: { streak: 5 } },
  { id: "month", title: "One month", threshold: { days: 30 } },
  { id: "half", title: "Halfway there", threshold: { sessions: 6 } },
  { id: "trust", title: "Trusted", threshold: { sessions: 10 } },
  { id: "moment", title: "Momentum", threshold: { streak: 14 } },
  { id: "commit", title: "Committed", threshold: { days: 90 } },
  { id: "complete", title: "Journey complete", threshold: { sessions: 20 } },
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function computeStreak(checkins: Mood[]): number {
  if (!checkins.length) return 0;
  const days = new Set(checkins.map((c) => startOfDay(new Date(c.created_at)).toISOString()));
  let streak = 0;
  const today = startOfDay(new Date());
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (days.has(d.toISOString())) streak++;
    else if (i > 0) break;
    else continue; // today missing is allowed; streak counts from yesterday
  }
  return streak;
}

function Journey() {
  const { user, loading: authLoading } = useAuth();
  const [range, setRange] = useState<"30" | "90" | "all">("30");
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [sessions, setSessions] = useState<Sess[]>([]);
  const [joinedAt, setJoinedAt] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const [m, j, s, p] = await Promise.all([
        supabase.from("mood_checkins").select("mood, created_at").eq("user_id", user.id).order("created_at", { ascending: true }),
        supabase.from("journal_entries").select("id, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("sessions").select("id, scheduled_at, status, therapist_name").eq("client_id", user.id).order("scheduled_at", { ascending: false }),
        supabase.from("profiles").select("created_at").eq("id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;
      setMoods((m.data ?? []) as Mood[]);
      setJournals((j.data ?? []) as Journal[]);
      setSessions((s.data ?? []) as Sess[]);
      setJoinedAt((p.data as { created_at?: string } | null)?.created_at ?? user.created_at ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const stats = useMemo(() => {
    const completed = sessions.filter((s) => s.status === "completed").length;
    const days = joinedAt ? Math.max(0, Math.floor((Date.now() - new Date(joinedAt).getTime()) / 86400000)) : 0;
    return {
      sessions: completed,
      journals: journals.length,
      days,
      streak: computeStreak(moods),
    };
  }, [sessions, journals, moods, joinedAt]);

  const moodChart = useMemo(() => {
    const cutoffDays = range === "30" ? 30 : range === "90" ? 90 : 365 * 5;
    const cutoff = Date.now() - cutoffDays * 86400000;
    const filtered = moods.filter((m) => new Date(m.created_at).getTime() >= cutoff);
    return filtered.map((m, i) => ({
      day: `D${i + 1}`,
      mood: m.mood,
    }));
  }, [moods, range]);

  const trend = useMemo(() => {
    if (moodChart.length < 2) return 0;
    const first = moodChart.slice(0, Math.ceil(moodChart.length / 3)).reduce((a, b) => a + b.mood, 0) / Math.ceil(moodChart.length / 3);
    const last = moodChart.slice(-Math.ceil(moodChart.length / 3)).reduce((a, b) => a + b.mood, 0) / Math.ceil(moodChart.length / 3);
    return last - first;
  }, [moodChart]);

  const timeline = useMemo(() => {
    const items: { type: string; label: string; date: string; ts: number }[] = [];
    sessions.forEach((s) => items.push({
      type: "session",
      label: s.therapist_name ? `Session with ${s.therapist_name}` : "Session",
      date: new Date(s.scheduled_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      ts: new Date(s.scheduled_at).getTime(),
    }));
    journals.forEach((j) => items.push({
      type: "journal",
      label: "Journal entry",
      date: new Date(j.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      ts: new Date(j.created_at).getTime(),
    }));
    moods.forEach((m) => items.push({
      type: "mood",
      label: "Mood check-in",
      date: new Date(m.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      ts: new Date(m.created_at).getTime(),
    }));
    return items.sort((a, b) => b.ts - a.ts).slice(0, 12);
  }, [sessions, journals, moods]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-dusk md:text-5xl">Your healing journey</h1>
        <p className="mt-2 text-cool">Every session, every entry, every step — it all matters.</p>

        <div className="mt-6 inline-flex gap-1 rounded-[12px] border border-border bg-warm p-1">
          {[["30", "Last 30 days"], ["90", "Last 3 months"], ["all", "All time"]].map(([k, l]) => (
            <button key={k} onClick={() => setRange(k as "30" | "90" | "all")} className={`kahf-btn rounded-[10px] px-4 py-2 text-xs ${range === k ? "bg-lavender text-dusk" : "text-cool"}`}>{l}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Sessions completed" value={loading ? "—" : String(stats.sessions)} />
          <Stat label="Journal entries" value={loading ? "—" : String(stats.journals)} />
          <Stat label="Days on Kahf" value={loading ? "—" : String(stats.days)} />
          <Stat label="Check-in streak" value={loading ? "—" : String(stats.streak)} />
        </div>

        <div className="mt-8 rounded-[16px] border border-border bg-warm p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-dusk">Mood arc</h2>
            {moodChart.length >= 2 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/40 px-3 py-1 text-xs text-dusk">
                <TrendingUp className={`h-3.5 w-3.5 ${trend < 0 ? "rotate-180" : ""}`} />
                {trend > 0.2 ? "Trending upward" : trend < -0.2 ? "Trending downward" : "Holding steady"}
              </span>
            )}
          </div>
          {moodChart.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-cool">
              {loading ? "Loading…" : "Log your first mood check-in to see your arc here."}
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={moodChart}>
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
          )}
        </div>

        <div className="mt-8 rounded-[16px] border border-border bg-warm p-6">
          <h2 className="mb-5 font-display text-xl text-dusk">Journey timeline</h2>
          {timeline.length === 0 ? (
            <p className="text-sm text-cool">Your timeline will fill in as you check in, journal, and meet with therapists.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-3">
              {timeline.map((e, i) => (
                <div key={i} className="flex min-w-[140px] flex-col items-center text-center">
                  <div className={`flex h-10 w-10 items-center justify-center ${
                    e.type === "session" ? "rounded-full bg-lavender" :
                    e.type === "journal" ? "rounded-[6px] bg-sage" :
                    "rounded-full bg-gold/60"
                  }`} />
                  <p className="mt-2 text-xs font-medium text-dusk">{e.label}</p>
                  <p className="text-[11px] text-cool">{e.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="mb-5 font-display text-xl text-dusk">Milestones</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {MILESTONES.map((m) => {
              const unlocked =
                (m.threshold.sessions !== undefined && stats.sessions >= m.threshold.sessions) ||
                (m.threshold.journals !== undefined && stats.journals >= m.threshold.journals) ||
                (m.threshold.streak !== undefined && stats.streak >= m.threshold.streak) ||
                (m.threshold.days !== undefined && stats.days >= m.threshold.days);
              return (
                <div key={m.id} className={`rounded-[16px] border p-5 text-center ${
                  unlocked ? "border-2 border-gold/60 bg-lavender/30" : "border-border bg-mist"
                }`}>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[12px] ${unlocked ? "bg-warm text-sage" : "bg-cool/20 text-cool"}`}>
                    {unlocked ? <Award className="h-7 w-7" /> : <Lock className="h-5 w-5" />}
                  </div>
                  <p className={`mt-3 font-display text-base ${unlocked ? "text-dusk" : "text-cool"}`}>{m.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" disabled={stats.sessions + stats.journals + moods.length === 0} className="kahf-btn rounded-[12px] border-2 border-gold text-dusk hover:bg-gold/10">
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
    <div className="rounded-[16px] border border-border border-t-4 border-t-sage bg-warm p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cool">{label}</p>
      <p className="mt-3 font-display text-4xl font-bold text-dusk">{value}</p>
    </div>
  );
}
