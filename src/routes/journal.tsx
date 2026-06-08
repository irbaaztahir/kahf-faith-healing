import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { moodScale } from "@/data/kahf";
import { Lock, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Journal — Kahf" }] }),
  component: JournalPage,
});

const prompts = [
  "What are you grateful for today?",
  "What would you ask Allah for?",
  "Where did you feel most yourself?",
  "What can you forgive yourself for?",
];

const moodColors: Record<number, string> = {
  1: "bg-neutral-300",
  2: "bg-secondary/50",
  3: "bg-secondary",
  4: "bg-accent/60",
  5: "bg-accent",
};

type Entry = { id: string; entry: string; mood: number | null; created_at: string };

function JournalPage() {
  const { user, loading: authLoading } = useAuth();
  const [mood, setMood] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const today = new Date();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("journal_entries")
        .select("id, entry, mood, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setEntries((data ?? []) as Entry[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const moodByDay = useMemo(() => {
    const m: Record<number, number> = {};
    entries.forEach((e) => {
      const d = new Date(e.created_at);
      if (d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear() && e.mood) {
        m[d.getDate()] = e.mood;
      }
    });
    return m;
  }, [entries, today]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/signin" replace />;

  const days = Array.from({ length: today.getDate() }, (_, i) => i + 1);

  const save = async () => {
    if (!text.trim() && !mood) {
      toast.error("Add a mood or a note first.");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .insert({ user_id: user.id, entry: text.trim(), mood })
      .select("id, entry, mood, created_at")
      .single();
    if (mood) {
      await supabase.from("mood_checkins").insert({ user_id: user.id, mood });
    }
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEntries((prev) => [data as Entry, ...prev]);
    setText("");
    setMood(null);
    toast.success("Entry saved");
  };

  const remove = async (id: string) => {
    const prev = entries;
    setEntries((e) => e.filter((x) => x.id !== id));
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      setEntries(prev);
    }
  };

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

              <Button onClick={save} disabled={saving} className="mt-6 h-11 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">
                {saving ? "Saving…" : "Save entry"}
              </Button>
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
                  const m = moodByDay[d];
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

        <div className="mt-12">
          <h2 className="font-display text-2xl text-foreground">Past entries</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          ) : entries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No entries yet — yours will show up here.</p>
          ) : (
            <div className="mt-6 space-y-3">
              {entries.map((e) => {
                const m = e.mood ? moodScale.find((x) => x.value === e.mood) : null;
                return (
                  <Card key={e.id} className="rounded-2xl border-border/60 bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {new Date(e.created_at).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
                          </p>
                          {m && <p className="mt-1 text-sm text-foreground">{m.emoji} {m.label}</p>}
                        </div>
                        <button onClick={() => remove(e.id)} aria-label="Delete entry" className="text-muted-foreground hover:text-foreground">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {e.entry && <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{e.entry}</p>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
