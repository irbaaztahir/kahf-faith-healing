import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GraduationCap, Network, IdCard, BookOpenCheck, BadgeCheck, Mic2, Check, ChevronDown, X } from "lucide-react";

export const Route = createFileRoute("/partners/clinical")({
  head: () => ({
    meta: [
      { title: "Clinical Partnership Program — Kahf" },
      { name: "description", content: "Self-paced, CME/CPD-accredited Islamic mental health training for doctors, GPs, psychiatrists, and counsellors." },
      { property: "og:title", content: "Clinical Partnership Program — Kahf" },
      { property: "og:description", content: "Understand your Muslim patients. Deliver better care." },
    ],
  }),
  component: Clinical,
});

const TRAINING = [
  "Islamic views on mental health and reducing stigma",
  "How to communicate with Muslim patients and their families",
  "Ramadan, fasting, and medication management",
  "End-of-life care and grief from an Islamic perspective",
  "Mahram dynamics and gender sensitivity in clinical settings",
  "Integrating halal-compatible approaches into CBT and mindfulness therapy",
];

const BENEFITS = [
  { Icon: GraduationCap, t: "Islamic Mental Health Modules", d: "Self-paced online training covering 6 core topics, CME/CPD accredited." },
  { Icon: Network, t: "Patient Referral Network", d: "Refer Muslim patients directly to verified Kahf therapists with one link." },
  { Icon: IdCard, t: "Clinician Profile Page", d: "If you're also a therapist, receive a verified Kahf profile to attract Muslim patients." },
  { Icon: BookOpenCheck, t: "Research Digest", d: "Quarterly newsletter: Islamic mental health studies, clinical case insights, community data." },
  { Icon: BadgeCheck, t: "Partner Clinic Badge", d: "Display 'Kahf Culturally Competent Clinic' badge on your website and materials." },
  { Icon: Mic2, t: "Webinar Collaboration", d: "Co-host a live webinar with a Kahf Islamic psychologist for your patient community." },
];

const TIERS = [
  { name: "Individual clinician", price: "$249", per: "/year", features: ["1 user", "All training modules", "Patient referral link", "Partner badge"] },
  { name: "Clinic (up to 10 staff)", price: "$999", per: "/year", featured: true, features: ["Up to 10 users", "Everything in Individual", "Shared clinic profile", "Priority support"] },
  { name: "Hospital department", price: "Custom", per: "", features: ["Volume licensing", "Onsite training option", "Enterprise rates", "Dedicated success manager"] },
];

function Clinical() {
  const [open, setOpen] = useState<number | null>(0);
  const [showApply, setShowApply] = useState(false);
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cool">For clinicians</p>
        <h1 className="font-display text-5xl font-bold text-dusk md:text-6xl">Clinical Partnership Program</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-body">Understand your Muslim patients. Deliver better care.</p>
        <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-lavender/50 px-5 py-2 text-sm text-dusk">
          Self-paced · CME/CPD accredited · Online
        </div>
      </section>

      {/* Problem statement */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-[16px] border border-border bg-warm p-8 md:p-10">
          <h2 className="font-display text-3xl text-dusk">Your Muslim patients deserve culturally competent care</h2>
          <p className="mt-4 leading-relaxed text-body">
            Many doctors, GPs, psychiatrists and counsellors treat Muslim patients daily but lack training in Islamic cultural nuances — halal considerations in medication and therapy, family dynamics, faith-based coping, and how to communicate without inadvertently causing distrust. Kahf exists to close that gap.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 font-display text-4xl text-dusk">What you get</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 kahf-stagger">
          {BENEFITS.map((b) => (
            <div key={b.t} className="rounded-[16px] border border-border bg-warm p-6 kahf-card">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-sage/40 text-dusk">
                <b.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl text-dusk">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cool">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Training accordion */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-8 font-display text-4xl text-dusk">Training topics</h2>
        <div className="space-y-2">
          {TRAINING.map((t, i) => (
            <button
              key={t}
              onClick={() => setOpen(open === i ? null : i)}
              className={`kahf-btn flex w-full items-center justify-between rounded-[12px] border px-5 py-4 text-left ${open === i ? "border-lavender border-2 bg-lavender/15" : "border-border bg-warm"}`}
            >
              <span className="font-display text-lg text-dusk">{t}</span>
              <ChevronDown className={`h-5 w-5 text-cool transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 font-display text-4xl text-dusk">Pricing</h2>
        <div className="grid gap-6 md:grid-cols-3 kahf-stagger">
          {TIERS.map((t) => (
            <div key={t.name} className={`rounded-[16px] border bg-warm p-7 kahf-card ${t.featured ? "border-lavender border-2" : "border-border"}`}>
              <p className="text-xs uppercase tracking-[0.2em] text-cool">{t.name}</p>
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

      {showApply && <ApplicationModal kind="clinical" onClose={() => setShowApply(false)} />}
      <SiteFooter />
    </div>
  );
}

export function ApplicationModal({ kind, onClose }: { kind: "clinical" | "corporate"; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dusk/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="kahf-modal-content max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[16px] bg-warm p-8 shadow-elevated">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-dusk">{kind === "clinical" ? "Clinical partnership application" : "Corporate partnership application"}</h2>
          <button onClick={onClose} className="kahf-btn rounded-[10px] p-1.5 text-cool hover:bg-mist"><X className="h-5 w-5" /></button>
        </div>
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/40">
              <Check className="h-7 w-7 text-dusk" />
            </div>
            <h3 className="font-display text-2xl text-dusk">Thank you.</h3>
            <p className="mt-2 text-sm text-cool">Our partnerships team will be in touch within 2 business days.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <Field label="Full name" />
            {kind === "clinical" ? (
              <>
                <Field label="Medical specialty" />
                <Field label="License number" />
                <Field label="Country" />
                <Field label="Clinic or hospital name" />
                <Select label="Number of Muslim patients seen per month" options={["Under 10", "10–50", "50–100", "100+"]} />
                <TextArea label="Why you want to partner" max={300} />
              </>
            ) : (
              <>
                <Field label="Company name" />
                <Select label="Industry" options={["Technology", "Finance", "Healthcare", "Education", "Government", "Retail", "Other"]} />
                <Select label="Number of employees" options={["Under 25", "25–100", "100–500", "500+"]} />
                <Field label="Job title" />
                <Field label="Work email" type="email" />
                <Select label="Which plan interests you" options={["Starter", "Growth", "Enterprise"]} />
                <Field label="How did you hear about Kahf" />
                <TextArea label="Anything else you'd like us to know (optional)" max={400} />
              </>
            )}
            <Button type="submit" className="kahf-btn h-12 w-full rounded-[12px] bg-gold text-dusk hover:bg-gold/90">Submit application</Button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-cool">{label}</span>
      <input required type={type} className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-cool">{label}</span>
      <select required className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk">
        <option value="">Select...</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function TextArea({ label, max }: { label: string; max: number }) {
  const [v, setV] = useState("");
  return (
    <label className="block">
      <span className="mb-1.5 flex justify-between text-xs uppercase tracking-[0.15em] text-cool">
        <span>{label}</span><span className="normal-case tracking-normal">{v.length}/{max}</span>
      </span>
      <textarea maxLength={max} value={v} onChange={(e) => setV(e.target.value)} rows={4} className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk" />
    </label>
  );
}
