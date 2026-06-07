import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, DollarSign, Calendar, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/therapist-portal")({
  head: () => ({ meta: [{ title: "Therapist portal — Kahf" }] }),
  component: TherapistPortal,
});

type Sess = { id: string; scheduled_at: string; status: string; kind: string; price: number | null };

function TherapistPortal() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useProfileRole();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sessions, setSessions] = useState<Sess[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const [profileRes, sessionsRes] = await Promise.all([
        supabase.from("profiles").select("display_name, bio").eq("id", user.id).maybeSingle(),
        supabase.from("sessions").select("id, scheduled_at, status, kind, price").eq("therapist_id", user.id).order("scheduled_at", { ascending: true }),
      ]);
      if (cancelled) return;
      setDisplayName(profileRes.data?.display_name ?? "");
      setBio(profileRes.data?.bio ?? "");
      setSessions((sessionsRes.data ?? []) as Sess[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading || roleLoading) return null;
  if (!user) return <Navigate to="/signin" />;
  if (!role) return <Navigate to="/welcome" />;
  if (role !== "therapist") return <Navigate to="/client" />;

  const firstName = displayName ? displayName.split(" ")[0] : "";

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { id: user.id, display_name: displayName.trim() || null, bio: bio.trim() || null },
        { onConflict: "id" },
      );
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  const now = Date.now();
  const weekStart = now - 7 * 86400000;
  const monthStart = now - 30 * 86400000;
  const thisWeek = sessions.filter((s) => new Date(s.scheduled_at).getTime() >= weekStart && s.status !== "cancelled").length;
  const activeClients = sessions.filter((s) => s.status !== "cancelled").length;
  const monthEarnings = sessions
    .filter((s) => new Date(s.scheduled_at).getTime() >= monthStart && s.status === "completed")
    .reduce((sum, s) => sum + (Number(s.price) || 0), 0);
  const upcoming = sessions.filter((s) => new Date(s.scheduled_at).getTime() >= now && s.status === "confirmed");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Therapist portal</p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">
              Welcome{firstName ? <>, <span className="italic">{firstName}</span></> : null}
            </h1>
          </div>
          <Badge className="rounded-full bg-secondary px-4 py-2 text-xs text-secondary-foreground">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Verified
          </Badge>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          <Stat icon={Calendar} label="This week" value={loading ? "—" : String(thisWeek)} />
          <Stat icon={Users} label="Sessions booked" value={loading ? "—" : String(activeClients)} />
          <Stat icon={DollarSign} label="This month" value={loading ? "—" : `$${monthEarnings.toFixed(0)}`} />
          <Stat icon={ShieldCheck} label="Rating" value="—" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl text-foreground">Upcoming sessions</h2>
              {loading ? (
                <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
              ) : upcoming.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No upcoming sessions yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {upcoming.map((s) => (
                    <li key={s.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3 text-sm">
                      <span className="text-foreground">{new Date(s.scheduled_at).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.kind}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl text-foreground">Availability</h2>
              <p className="mt-1 text-xs text-muted-foreground">Toggle the days you're open this week.</p>
              <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-xs">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <button key={i} className={`rounded-lg border py-3 ${i < 5 ? "border-dusk bg-dusk text-mist" : "border-border bg-background text-muted-foreground"}`}>{d}</button>
                ))}
              </div>
              <Button className="mt-6 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">Manage schedule</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 bg-card shadow-soft lg:col-span-3">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl text-foreground">Profile editor</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Display name</label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" disabled={loading} className="h-11 rounded-xl border-border bg-background" />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                  <Input value={user.email ?? ""} disabled className="h-11 rounded-xl border-border bg-background" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">About</label>
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell clients about your approach…" disabled={loading} className="min-h-[120px] rounded-2xl border-border bg-background" />
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving || loading} className="mt-6 rounded-full bg-dusk text-mist hover:bg-dusk/90">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
      <CardContent className="p-5">
        <Icon className="h-4 w-4 text-dusk" />
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

