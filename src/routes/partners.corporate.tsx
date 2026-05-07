import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Lock, Sparkles } from "lucide-react";
import { ApplicationModal } from "./partners.clinical";

export const Route = createFileRoute("/partners/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Wellness Program — KAHF" },
      { name: "description", content: "Subsidized therapy, quarterly live sessions, and a 4-stop healing journey for your team. Faith-rooted mental wellness for Muslim employees." },
      { property: "og:title", content: "KAHF Corporate Wellness" },
      { property: "og:description", content: "Invest in your people. Build a culture that actually cares." },
    ],
  }),
  component: Corporate,
});

const STATS = [
  "73% of Muslim employees feel unsupported at work",
  "28% lower absenteeism in companies with wellness programs",
  "1 in 3 employees would use therapy if their employer provided it",
  "4.8 / 5 average KAHF session satisfaction rating",
];

const PILLARS = [
  { t: "Subsidized therapy access", d: "Your company purchases a pool of session credits at 35% below standard pricing ($55/session vs $85–$110 retail). Employees redeem credits anonymously through their own private KAHF accounts. The employer never sees who used what — only aggregate usage numbers." },
  { t: "Quarterly live sessions", d: "Once per quarter, KAHF delivers a live 90-minute mental wellness session to your enrolled employees — in-person or virtual, your choice. Led by a verified Islamic psychologist and/or scholar. Sessions are recorded and added to your company's KAHF portal." },
  { t: "Employee enrollment portal", d: "Your organization receives a private branded KAHF portal at kahf.app/partners/[yourcompany]. Employees enroll themselves — no HR involvement in their personal journey. All individual data is encrypted and invisible to employers." },
];

const STOPS = [
  {
    n: 1, status: "complete", title: "Foundation", months: "Month 1–2",
    items: [
      "Welcome 1:1 session with a KAHF therapist — baseline assessment, goal setting",
      "Recorded workshop: 'Understanding your mental wellness baseline' (45 min)",
      "Mood tracking activated — 5 gentle journal prompts over 2 weeks",
      "Milestone unlocked: 'Foundation Complete'",
    ],
  },
  {
    n: 2, status: "active", title: "Awareness", months: "Month 3–4",
    items: [
      "2 therapy sessions on identifying emotional patterns and triggers",
      "Live group session: 'Islamic perspectives on stress and resilience'",
      "Mental health chit-chat: 30-minute open conversation, no agenda",
      "Milestone: 'Awareness Complete'",
    ],
  },
  {
    n: 3, status: "locked", title: "Tools", months: "Month 5–6",
    items: [
      "2 therapy sessions on practical coping strategies",
      "Therapist-led skills workshop: breathing, journaling, dua practice, Islamic reframing",
      "Mid-journey check-in with structured progress note",
      "Milestone: 'Tools Complete'",
    ],
  },
  {
    n: 4, status: "locked", title: "Integration", months: "Month 7–8",
    items: [
      "2 therapy sessions on sustaining progress and long-term independence",
      "Company-wide quarterly live session (90 min, all enrolled employees)",
      "Journey graduation: downloadable 'Healing Journey Complete' certificate",
      "Post-program: 20% alumni discount on KAHF subscriptions",
    ],
  },
];

const TIERS = [
  { name: "Starter", emp: "up to 25 employees", price: "$1,500", per: "/quarter", features: ["50 session credits ($55/session)", "1 quarterly live session", "Basic employer dashboard", "4-stop journey for all enrolled"] },
  { name: "Growth", emp: "up to 100 employees", price: "$4,500", per: "/quarter", featured: true, features: ["200 session credits", "2 quarterly live sessions", "Full dashboard with journey analytics", "Dedicated KAHF partner contact"] },
  { name: "Enterprise", emp: "100+ employees", price: "Custom", per: "", features: ["Unlimited session credits", "Monthly live sessions", "Custom branded employee portal", "Dedicated KAHF account manager"] },
];

function Corporate() {
  const [showApply, setShowApply] = useState(false);
  const [activeStop, setActiveStop] = useState(2);
  const stop = STOPS.find((s) => s.n === activeStop)!;

  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cool">For organizations</p>
        <h1 className="font-display text-5xl font-bold text-dusk md:text-6xl">Corporate Wellness Program</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-body">Invest in your people. Build a culture that actually cares.</p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 kahf-stagger">
          {STATS.map((s) => (
            <div key={s} className="rounded-[16px] border border-border border-t-4 border-t-sage bg-warm p-6 kahf-card">
              <p className="font-display text-lg leading-snug text-dusk">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-10 font-display text-4xl text-dusk">What's included</h2>
        <div className="space-y-5">
          {PILLARS.map((p, i) => (
            <div key={p.t} className="rounded-[16px] border border-border border-l-4 border-l-lavender bg-warm p-7 kahf-card">
              <p className="text-xs uppercase tracking-[0.2em] text-cool">Pillar {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl text-dusk">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-body">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Stop Healing Journey */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cool">Flagship</p>
          <h2 className="mt-3 font-display text-4xl text-dusk md:text-5xl">The 4-stop healing journey</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">Eight months. Four meaningful stops. A real path forward — taken at your team's pace.</p>
        </div>

        {/* Desktop horizontal map */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-[10%] right-[10%] top-12 h-[3px] bg-cool/30" />
            <div className="absolute left-[10%] top-12 h-[3px] bg-sage" style={{ width: `${((activeStop - 1) / 3) * 80}%` }} />
            <div className="relative flex justify-between">
              {STOPS.map((s) => {
                const state = s.n < activeStop ? "complete" : s.n === activeStop ? "active" : "locked";
                return (
                  <button
                    key={s.n}
                    onClick={() => setActiveStop(s.n)}
                    className="flex flex-col items-center"
                  >
                    <div className={`flex h-24 w-24 items-center justify-center rounded-full border-2 transition ${
                      state === "complete" ? "border-sage bg-sage text-warm" :
                      state === "active" ? "border-gold bg-warm text-dusk kahf-pulse-glow" :
                      "border-border bg-mist text-cool"
                    }`}>
                      {state === "complete" ? <Check className="h-8 w-8" /> :
                       state === "locked" ? <Lock className="h-6 w-6" /> :
                       <span className="font-display text-3xl font-bold">{s.n}</span>}
                    </div>
                    <p className={`mt-3 font-display text-lg ${state === "locked" ? "text-cool" : "text-dusk"}`}>{s.title}</p>
                    <p className="text-xs text-cool">{s.months}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical list */}
        <div className="space-y-3 md:hidden">
          {STOPS.map((s) => {
            const state = s.n < activeStop ? "complete" : s.n === activeStop ? "active" : "locked";
            return (
              <button key={s.n} onClick={() => setActiveStop(s.n)} className={`flex w-full items-center gap-4 rounded-[16px] border p-4 ${state === "active" ? "border-2 border-lavender bg-warm" : "border-border bg-warm"}`}>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                  state === "complete" ? "bg-sage text-warm" :
                  state === "active" ? "bg-gold/30 text-dusk" :
                  "bg-mist text-cool"
                }`}>
                  {state === "complete" ? <Check className="h-6 w-6" /> : state === "locked" ? <Lock className="h-5 w-5" /> : <span className="font-display text-xl font-bold">{s.n}</span>}
                </div>
                <div className="text-left">
                  <p className="font-display text-lg text-dusk">{s.title}</p>
                  <p className="text-xs text-cool">{s.months}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="mx-auto mt-10 max-w-3xl rounded-[16px] border border-border bg-warm p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cool">{stop.months}</p>
          <h3 className="mt-2 font-display text-3xl text-dusk">Stop {stop.n} — {stop.title}</h3>
          <ul className="mt-6 space-y-3">
            {stop.items.map((it) => (
              <li key={it} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lavender" /> {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Employer dashboard preview */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[16px] border border-border bg-warm p-8">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <p className="text-xs uppercase tracking-[0.2em] text-cool">Employer dashboard preview</p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            <Stat label="Enrolled employees" value="74" />
            <Stat label="Engagement rate" value="68%" />
            <Stat label="Credits used" value="118 / 200" />
            <Stat label="Next live session" value="Jun 14" />
          </div>
          <p className="mt-6 text-xs text-cool">All data is aggregated and anonymous. No individual employee data is ever visible to employers.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 font-display text-4xl text-dusk">Pricing</h2>
        <div className="grid gap-6 md:grid-cols-3 kahf-stagger">
          {TIERS.map((t) => (
            <div key={t.name} className={`relative rounded-[16px] border bg-warm p-7 kahf-card ${t.featured ? "border-2 border-lavender" : "border-border"}`}>
              {t.featured && <span className="absolute -top-3 left-7 rounded-full bg-lavender px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-dusk">Most popular</span>}
              <p className="text-xs uppercase tracking-[0.2em] text-cool">{t.name}</p>
              <p className="text-xs text-cool">{t.emp}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-dusk">{t.price}</span>
                <span className="text-sm text-cool">{t.per}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-body"><Check className="mt-0.5 h-4 w-4 text-sage" /> {f}</li>
                ))}
              </ul>
              <Button onClick={() => setShowApply(true)} className="kahf-btn mt-6 h-11 w-full rounded-[12px] bg-gold text-dusk hover:bg-gold/90">Apply</Button>
            </div>
          ))}
        </div>
      </section>

      {showApply && <ApplicationModal kind="corporate" onClose={() => setShowApply(false)} />}
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-mist p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-cool">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-dusk">{value}</p>
    </div>
  );
}
