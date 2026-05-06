import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { concerns, languages, moodScale, therapists } from "@/data/kahf";
import { Check, ArrowLeft, Star } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Find your therapist — KAHF" }] }),
  component: QuizPage,
});

type Answers = {
  concerns: string[];
  gender: string;
  language: string;
  mood: number | null;
};

function QuizPage() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ concerns: [], gender: "", language: "", mood: null });
  const total = 4;

  const next = () => setStep((s) => Math.min(s + 1, total));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-16">
        {step < total && (
          <>
            <div className="mb-10 flex items-center justify-between">
              <button onClick={back} disabled={step === 0} className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-30">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step {step + 1} of {total}</span>
            </div>
            <div className="mb-12 h-1 w-full rounded-full bg-muted">
              <div className="h-1 rounded-full bg-dusk transition-all" style={{ width: `${((step + 1) / total) * 100}%` }} />
            </div>
          </>
        )}

        {step === 0 && (
          <Step title="What brings you here?" subtitle="Choose any that feel close. There's no wrong answer.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {concerns.map((c) => {
                const active = a.concerns.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => setA({ ...a, concerns: active ? a.concerns.filter((x) => x !== c) : [...a.concerns, c] })}
                    className={`rounded-2xl border p-5 text-left text-sm transition ${active ? "border-dusk bg-dusk text-mist" : "border-border bg-card hover:border-dusk/40"}`}
                  >
                    {active && <Check className="mb-2 h-4 w-4" />}
                    {c}
                  </button>
                );
              })}
            </div>
            <NextBtn onClick={next} disabled={a.concerns.length === 0} />
          </Step>
        )}

        {step === 1 && (
          <Step title="A gender preference for your therapist?" subtitle="Whatever feels safest is always right.">
            <div className="grid gap-3 sm:grid-cols-3">
              {["No preference", "Female", "Male"].map((g) => (
                <PillBtn key={g} active={a.gender === g} onClick={() => setA({ ...a, gender: g })}>{g}</PillBtn>
              ))}
            </div>
            <NextBtn onClick={next} disabled={!a.gender} />
          </Step>
        )}

        {step === 2 && (
          <Step title="What language feels most like home?" subtitle="Therapy works best in your own words.">
            <div className="grid gap-3 sm:grid-cols-3">
              {languages.map((l) => (
                <PillBtn key={l} active={a.language === l} onClick={() => setA({ ...a, language: l })}>{l}</PillBtn>
              ))}
            </div>
            <NextBtn onClick={next} disabled={!a.language} />
          </Step>
        )}

        {step === 3 && (
          <Step title="How are you feeling, right now?" subtitle="Honestly. Just for you.">
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {moodScale.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setA({ ...a, mood: m.value })}
                  className={`rounded-2xl border p-4 text-center transition ${a.mood === m.value ? "border-dusk bg-dusk text-mist" : "border-border bg-card hover:border-dusk/40"}`}
                >
                  <div className="text-3xl">{m.emoji}</div>
                  <div className="mt-2 text-xs">{m.label}</div>
                </button>
              ))}
            </div>
            <NextBtn onClick={next} disabled={a.mood === null} label="See your matches →" />
          </Step>
        )}

        {step === total && <Results />}
      </div>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-sm transition ${active ? "border-dusk bg-dusk text-mist" : "border-border bg-card hover:border-dusk/40"}`}
    >
      {children}
    </button>
  );
}

function NextBtn({ onClick, disabled, label = "Continue" }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <Button onClick={onClick} disabled={disabled} size="lg" className="mt-4 h-12 rounded-full bg-dusk px-8 text-mist hover:bg-dusk/90 disabled:opacity-40">
      {label}
    </Button>
  );
}

function Results() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Your matches</p>
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          A few therapists who feel <span className="italic">aligned.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">No sign-up needed. Take your time.</p>
      </div>
      <div className="grid gap-4">
        {therapists.map((t) => (
          <Card key={t.id} className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <img src={t.photo} alt={t.name} loading="lazy" className="h-20 w-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl text-foreground">{t.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" /> {t.rating}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{t.credentials}</p>
                <p className="mt-1 text-xs text-dusk">Next: {t.nextSlot}</p>
              </div>
              <Button asChild className="rounded-full bg-dusk text-mist hover:bg-dusk/90">
                <Link to="/therapists/$id" params={{ id: t.id }}>View profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
