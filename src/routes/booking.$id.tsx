import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { therapists } from "@/data/kahf";
import { Check, CalendarPlus, Bell } from "lucide-react";

type Search = { kind?: "consult" | "session" };

export const Route = createFileRoute("/booking/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    kind: s.kind === "session" ? "session" : "consult",
  }),
  loader: ({ params }) => {
    const therapist = therapists.find((t) => t.id === params.id);
    if (!therapist) throw notFound();
    return { therapist };
  },
  head: () => ({ meta: [{ title: "Book a session — KAHF" }] }),
  notFoundComponent: () => <div className="p-12 text-center">Therapist not found</div>,
  errorComponent: ({ error }) => <div className="p-12 text-center">{error.message}</div>,
  component: BookingPage,
});

function BookingPage() {
  const { therapist } = Route.useLoaderData() as { therapist: typeof therapists[number] };
  const { kind } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const slots = ["10:00", "11:30", "14:00", "16:30", "18:00", "20:00"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <img src={therapist.photo} alt={therapist.name} className="h-14 w-14 rounded-2xl object-cover" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{kind === "consult" ? "Free 15-min consult" : "Full session"}</p>
            <h1 className="font-display text-3xl text-foreground">with {therapist.name}</h1>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-dusk" : "bg-muted"}`} />
          ))}
        </div>

        {step === 0 && (
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl text-foreground">Choose a time</h2>
              <p className="mt-1 text-sm text-muted-foreground">All times shown in your local timezone.</p>
              <div className="mt-8 grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date(); d.setDate(d.getDate() + i);
                  return (
                    <div key={i} className="rounded-xl border border-border bg-background p-2 text-center text-xs">
                      <div className="text-muted-foreground">{d.toLocaleDateString(undefined, { weekday: "short" })}</div>
                      <div className="font-display text-lg text-foreground">{d.getDate()}</div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Tomorrow</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`rounded-xl border py-3 text-sm transition ${slot === s ? "border-dusk bg-dusk text-mist" : "border-border bg-background hover:border-dusk/40"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Button disabled={!slot} onClick={() => setStep(1)} className="mt-8 h-12 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90 disabled:opacity-40">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl text-foreground">A note for {therapist.name.split(" ")[0]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Optional. Just a sentence about what's on your heart.</p>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="I've been carrying…" className="mt-6 min-h-[140px] rounded-2xl border-border bg-background" />
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="flex-1 rounded-full">Back</Button>
                <Button onClick={() => setStep(2)} className="flex-1 rounded-full bg-dusk text-mist hover:bg-dusk/90">Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl text-foreground">Confirm</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <Row label="Therapist" value={therapist.name} />
                <Row label="When" value={`Tomorrow at ${slot}`} />
                <Row label="Type" value={kind === "consult" ? "Free 15-min consult" : "50-min session"} />
                <Row label="Total" value={kind === "consult" ? "Free" : `$${therapist.price}`} />
              </dl>
              {kind === "session" && (
                <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-xs text-muted-foreground">
                  Payment is processed securely via Stripe. You won't be charged until the session is confirmed.
                </div>
              )}
              <Button onClick={() => setStep(3)} className="mt-8 h-12 w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">
                {kind === "consult" ? "Confirm booking" : `Pay $${therapist.price} & confirm`}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="rounded-2xl border-border/60 bg-card text-center shadow-soft">
            <CardContent className="p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-dusk">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-6 font-display text-3xl text-foreground">You're booked.</h2>
              <p className="mt-3 text-muted-foreground">Tomorrow at {slot} with {therapist.name}.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button variant="outline" className="rounded-full"><CalendarPlus className="mr-2 h-4 w-4" /> Add to calendar</Button>
                <Button variant="outline" className="rounded-full"><Bell className="mr-2 h-4 w-4" /> Add reminders</Button>
              </div>
              <Button onClick={() => navigate({ to: "/dashboard" })} className="mt-6 rounded-full bg-dusk text-mist hover:bg-dusk/90">
                Go to your space
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
