import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { therapists } from "@/data/kahf";
import { ArrowLeft, Check, Star, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Find your therapist — KAHF" }] }),
  component: QuizPage,
});

type QType = "single" | "multi" | "chips";
interface Question {
  id: string;
  type: QType;
  title: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { id: "q1", type: "single", title: "What brings you to Kahf today?", options: [
    "Anxiety or worry", "Feeling low or depressed", "Relationship or marriage issues",
    "Grief or loss", "Family conflict", "Work stress or burnout",
    "Identity or belonging", "I'm not sure — I just need to talk to someone",
  ]},
  { id: "q2", type: "single", title: "How long have you been feeling this way?", options: [
    "Just recently (a few days)", "A few weeks", "A few months",
    "More than a year", "For as long as I can remember",
  ]},
  { id: "q3", type: "single", title: "How often do these feelings affect your daily life?", options: [
    "Rarely — I mostly feel okay", "Sometimes — a few times a week",
    "Often — most days", "Almost always — it affects everything I do",
  ]},
  { id: "q4", type: "single", title: "How has your sleep been lately?", options: [
    "I sleep well and wake up rested", "I have trouble falling asleep",
    "I wake up frequently during the night", "I sleep too much and still feel tired",
    "My sleep pattern is very irregular",
  ]},
  { id: "q5", type: "multi", title: "Have you been experiencing any of the following?", options: [
    "Fatigue or low energy", "Headaches or body tension",
    "Loss of appetite or overeating", "Difficulty concentrating",
    "Racing heart or chest tightness", "None of the above",
  ]},
  { id: "q6", type: "single", title: "Do you have people around you who you can talk to honestly?", options: [
    "Yes, I have strong support from family and friends",
    "I have some people but I feel I can't fully open up",
    "I mostly keep things to myself",
    "I feel quite alone in what I'm going through",
  ]},
  { id: "q7", type: "single", title: "How does your faith play a role in how you're feeling?", options: [
    "My faith gives me strength and comfort",
    "I feel disconnected from my faith right now",
    "I feel guilty about my struggles — like I should be stronger in my faith",
    "I want therapy that understands and respects my Islamic values",
    "I prefer to keep faith and therapy separate",
  ]},
  { id: "q8", type: "single", title: "Have you ever spoken to a therapist or counsellor before?", options: [
    "No, this would be my first time",
    "Yes, and it was helpful",
    "Yes, but it didn't feel right — the therapist didn't understand my culture or faith",
    "I've thought about it but never followed through",
    "I've spoken to a religious figure (imam, scholar) but not a therapist",
  ]},
  { id: "q9", type: "single", title: "How would you describe the intensity of what you're going through right now?", options: [
    "Mild — I'm managing but want support",
    "Moderate — it's affecting my daily life",
    "Significant — I'm really struggling",
    "Severe — I'm finding it very hard to cope",
  ]},
  { id: "q10", type: "single", title: "What is your current relationship or family situation?", options: [
    "Single", "In a relationship but not married", "Married", "Married with children",
    "Divorced or separated", "Widowed", "I'd prefer not to say",
  ]},
  { id: "q11", type: "single", title: "How would you describe your current stress level from work or daily responsibilities?", options: [
    "Low — I feel generally balanced",
    "Moderate — manageable but present",
    "High — I feel overwhelmed quite often",
    "Very high — I'm burning out",
  ]},
  { id: "q12", type: "single", title: "Do you have a preference for your therapist's gender?", options: [
    "No preference", "I would prefer a female therapist", "I would prefer a male therapist",
  ]},
  { id: "q13", type: "chips", title: "What language would you like your sessions to be in?", options: [
    "English", "Arabic", "Urdu", "French", "Turkish", "Malay", "Other",
  ]},
  { id: "q14", type: "single", title: "How would you prefer to connect with your therapist?", options: [
    "Video call (face to face online)",
    "Voice call only (no video)",
    "Text chat only",
    "I'm open to any format",
  ]},
  { id: "q15", type: "single", title: "What would you most like to feel after working with a therapist on Kahf?", options: [
    "Calmer and less anxious",
    "More connected to myself and my faith",
    "Better able to manage my relationships",
    "More motivated and purposeful",
    "Understood — just truly heard by someone",
    "Stronger and more resilient",
  ]},
];

const STORAGE = "kahf-quiz-progress";

type Answers = Record<string, string | string[]>;

function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const total = QUESTIONS.length;
  const finished = step >= total;

  // resume from session storage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.step === "number") setStep(Math.min(parsed.step, total));
      }
    } catch {}
  }, [total]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE, JSON.stringify({ step, answers }));
  }, [step, answers]);

  const q = QUESTIONS[step];
  const current = q ? answers[q.id] : undefined;

  const canNext = useMemo(() => {
    if (!q) return false;
    if (q.type === "multi") return Array.isArray(current) && current.length > 0;
    return typeof current === "string" && current.length > 0;
  }, [q, current]);

  const next = () => { setDirection("forward"); setStep((s) => Math.min(s + 1, total)); };
  const back = () => { setDirection("back"); setStep((s) => Math.max(s - 1, 0)); };

  const setSingle = (val: string) => q && setAnswers({ ...answers, [q.id]: val });
  const toggleMulti = (val: string) => {
    if (!q) return;
    const arr = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
    const exists = arr.includes(val);
    let nextArr = exists ? arr.filter((x) => x !== val) : [...arr, val];
    if (val === "None of the above" && !exists) nextArr = ["None of the above"];
    else if (nextArr.includes("None of the above") && val !== "None of the above")
      nextArr = nextArr.filter((x) => x !== "None of the above");
    setAnswers({ ...answers, [q.id]: nextArr });
  };

  const severeWarning = q?.id === "q9" && current === "Severe — I'm finding it very hard to cope";

  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {!finished && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={back}
                disabled={step === 0}
                className="kahf-btn flex items-center gap-2 text-sm text-cool disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-xs uppercase tracking-[0.25em] text-cool">
                Question {step + 1} of {total}
              </span>
            </div>
            <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-cool/20">
              <div
                className="h-full rounded-full bg-lavender transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </>
        )}

        {!finished && q && (
          <div
            key={`${q.id}-${direction}`}
            className="space-y-6"
            style={{
              animation: direction === "forward"
                ? "kahf-q-in-right 280ms ease-out both"
                : "kahf-q-in-left 280ms ease-out both",
            }}
          >
            <h1 className="text-center font-display text-3xl leading-tight text-dusk md:text-4xl">
              {q.title}
            </h1>

            {severeWarning && (
              <div className="flex items-start gap-3 rounded-[12px] border border-lavender bg-lavender/20 p-4 text-sm text-dusk kahf-slide-down">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-dusk" />
                <p>
                  We hear you. A therapist can help. You'll be matched as a priority. If you're in
                  crisis, please contact emergency services.
                </p>
              </div>
            )}

            {q.type === "chips" ? (
              <div className="flex flex-wrap justify-center gap-2 kahf-stagger">
                {q.options.map((opt) => {
                  const active = current === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSingle(opt)}
                      className={`kahf-btn rounded-full border px-5 py-2.5 text-sm ${
                        active
                          ? "border-lavender bg-lavender/30 text-dusk"
                          : "border-border bg-warm text-dusk hover:bg-lavender/10"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-3 kahf-stagger">
                {q.options.map((opt) => {
                  const active = q.type === "multi"
                    ? Array.isArray(current) && current.includes(opt)
                    : current === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => q.type === "multi" ? toggleMulti(opt) : setSingle(opt)}
                      className={`kahf-card flex items-center gap-3 rounded-[14px] border bg-warm px-5 py-4 text-left text-[15px] text-dusk hover:bg-lavender/10 ${
                        active ? "border-2 border-lavender" : "border-border"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          active ? "border-sage bg-sage text-warm" : "border-cool/40 bg-mist"
                        }`}
                      >
                        {active && <Check className="h-3 w-3" />}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {canNext && (
              <div className="pt-2 text-center" style={{ animation: "kahf-stagger-in 200ms ease-out both" }}>
                <Button
                  onClick={next}
                  className="kahf-btn h-12 rounded-[12px] bg-gold px-10 text-dusk hover:bg-gold/90"
                >
                  {step === total - 1 ? "See your matches" : "Next"}
                </Button>
              </div>
            )}
          </div>
        )}

        {finished && <Results answers={answers} onRestart={() => { setStep(0); setAnswers({}); sessionStorage.removeItem(STORAGE); }} />}
      </div>

      <style>{`
        @keyframes kahf-q-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes kahf-q-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const concern = (answers["q1"] as string) || "what you're navigating";
  const summary = `Based on what you've shared, you'd benefit from a therapist who specialises in ${concern.toLowerCase()} and understands the role faith plays in your life.`;

  return (
    <div className="space-y-8 kahf-page">
      <div className="text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cool">Your matches</p>
        <h1 className="font-display text-4xl leading-tight text-dusk md:text-5xl">
          We've found therapists who are right for you.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-body">{summary}</p>
      </div>

      <div className="grid gap-4 kahf-stagger">
        {therapists.map((t, i) => (
          <div key={t.id} className="kahf-card overflow-hidden rounded-[16px] border border-border bg-warm p-5 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <img src={t.photo} alt={t.name} loading="lazy" className="h-20 w-20 rounded-[14px] object-cover" />
                {i === 0 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sage px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-dusk">
                    Kahf's Choice
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl text-dusk">{t.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-cool">
                    <Star className="h-3 w-3 fill-gold text-gold" /> {t.rating}
                  </span>
                </div>
                <p className="text-xs text-cool">{t.credentials}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.specialties.map((s) => (
                    <span key={s} className="rounded-full bg-sage/30 px-2 py-0.5 text-[11px] text-dusk">{s}</span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-dusk">Next available: {t.nextSlot}</p>
              </div>
              <Button asChild className="kahf-btn rounded-[12px] bg-gold text-dusk hover:bg-gold/90">
                <Link to="/therapists/$id" params={{ id: t.id }}>Book free 15-min consult</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <Link to="/therapists" className="text-sm text-dusk underline-offset-4 hover:underline">
          Browse all therapists
        </Link>
        <button onClick={onRestart} className="text-xs text-cool hover:text-dusk">
          Restart quiz
        </button>
      </div>
    </div>
  );
}
