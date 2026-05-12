import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { therapists } from "@/data/kahf";
import { ShieldCheck, DollarSign, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/therapist-portal")({
  head: () => ({ meta: [{ title: "Therapist portal — Kahf" }] }),
  component: TherapistPortal,
});

function TherapistPortal() {
  const me = therapists[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Therapist portal</p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">Welcome, <span className="italic">{me.name.split(" ")[1] ?? me.name}</span></h1>
          </div>
          <Badge className="rounded-full bg-secondary px-4 py-2 text-xs text-secondary-foreground">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Verified
          </Badge>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          <Stat icon={Calendar} label="This week" value="12" />
          <Stat icon={Users} label="Active patients" value="38" />
          <Stat icon={DollarSign} label="This month" value="$4,290" />
          <Stat icon={ShieldCheck} label="Rating" value={`${me.rating} ★`} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl text-foreground">Upcoming sessions</h2>
              <div className="mt-6 space-y-3">
                {[
                  { name: "Maryam K.", time: "Today · 16:00", type: "Session" },
                  { name: "Yusuf A.", time: "Tomorrow · 10:00", type: "Consult" },
                  { name: "Aisha M.", time: "Thu · 18:30", type: "Session" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                    <div>
                      <p className="font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.time} · {s.type}</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full">Open</Button>
                  </div>
                ))}
              </div>
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
                <Field label="Display name" defaultValue={me.name} />
                <Field label="Credentials" defaultValue={me.credentials} />
                <Field label="Languages" defaultValue={me.languages.join(", ")} />
                <Field label="Session price (USD)" defaultValue={String(me.price)} />
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">About</label>
                  <Textarea defaultValue={me.bio} className="min-h-[120px] rounded-2xl border-border bg-background" />
                </div>
              </div>
              <Button className="mt-6 rounded-full bg-dusk text-mist hover:bg-dusk/90">Save changes</Button>
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

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <Input defaultValue={defaultValue} className="h-11 rounded-xl border-border bg-background" />
    </div>
  );
}
