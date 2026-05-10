import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KahfLogo } from "@/components/brand/KahfLogo";
import {
  ArrowLeft, GraduationCap, Network, BadgeCheck, Calendar, BookOpen, Award,
  ChevronDown, Check, Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/partners/doctor")({
  head: () => ({
    meta: [
      { title: "Doctor Program — KAHF Clinical Partnership" },
      { name: "description", content: "Partner with KAHF as a clinician. Islamic mental health training, patient referral network, and a verified KAHF clinician profile." },
      { property: "og:title", content: "KAHF Doctor Program" },
      { property: "og:description", content: "Help your Muslim patients access culturally aligned mental health support." },
    ],
  }),
  component: DoctorPage,
});

const STATS = [
  { n: "1.8B+", d: "Muslims globally underserved in mental health" },
  { n: "90%", d: "Treatment gap in Muslim-majority countries" },
  { n: "60%+", d: "Muslim patients feel misunderstood by therapists" },
  { n: "0", d: "Faith-aligned platforms before KAHF" },
];

const PROBLEMS = [
  { t: "Cultural Disconnect", d: "Muslim patients often disengage after the first session when their faith isn't acknowledged." },
  { t: "Stigma Barrier", d: "68% of Muslims cite stigma as their primary reason for not seeking help." },
  { t: "Communication Gap", d: "Religious family dynamics, mahram protocols, and halal considerations are unfamiliar to most Western-trained therapists." },
];

const FEATURES = [
  { Icon: GraduationCap, t: "Islamic Mental Health Training", d: "Self-paced online modules covering Islamic psychology, culturally sensitive communication, halal therapy approaches, and family dynamics. CME/CPD accredited." },
  { Icon: Network, t: "Patient Referral Network", d: "Refer Muslim patients directly to verified KAHF therapists with one link. No paperwork. Matched within 24 hours. You stay informed, they get specialist care." },
  { Icon: BadgeCheck, t: "Verified Clinician Profile", d: "Receive a verified KAHF clinician profile page. Muslim patients actively searching for culturally competent doctors will find you." },
  { Icon: Calendar, t: "Quarterly Awareness Sessions", d: "Live quarterly webinars co-hosted with KAHF Islamic psychologists. Topics: Islamic grief, anxiety in Ramadan, end-of-life care, family conflict — clinically and spiritually framed." },
  { Icon: BookOpen, t: "Research Digest", d: "Monthly newsletter: Islamic mental health research, cultural competency updates, clinical case insights, and community data." },
  { Icon: Award, t: "Partner Clinic Badge", d: "Display the KAHF Culturally Competent Clinic badge on your website and clinic materials — a visible trust signal for Muslim patients." },
];

const TOPICS = [
  { t: "Islamic views on mental health — reducing stigma with Muslim patients", d: "Foundational frameworks for understanding how Muslims relate to therapy, the historical roots of stigma, and language that opens rather than closes the conversation." },
  { t: "Communicating with Muslim families — boundaries, mahram, and trust", d: "Practical guidance on family dynamics, gender boundaries, and trust-building with patients whose decisions are often family-shared." },
  { t: "Ramadan, fasting, and medication management", d: "Clinical considerations during fasting: medication timing, hydration, mood shifts, and supporting patients through the spiritual intensity of the month." },
  { t: "Grief and end-of-life care from an Islamic perspective", d: "How Muslims process loss, the role of dua and the community, and clinically holding space for grief without minimising faith." },
  { t: "Halal-compatible CBT and mindfulness approaches", d: "Adapting evidence-based modalities to honour Islamic values — including Islamic reframing, dhikr-based grounding, and tawakkul as a clinical anchor." },
  { t: "Gender sensitivity and cultural safety in clinical settings", d: "Creating environments where Muslim patients feel safe — from intake forms to physical space to therapist-patient dynamics." },
];

const TIERS = [
  { name: "Individual Clinician", price: "$249", per: "/year", features: ["All 6 training modules", "Patient referral link", "Partner badge", "Research digest", "1 user"], cta: "Apply as Individual" },
  { name: "Clinic", price: "$999", per: "/year", featured: true, sub: "Up to 10 staff", features: ["Everything in Individual", "Shared clinic profile page", "Up to 10 staff accounts", "Priority partner support", "Quarterly webinar access"], cta: "Apply as Clinic" },
  { name: "Hospital / Institution", price: "Custom", per: "", features: ["Everything in Clinic", "Unlimited staff", "Onsite training sessions", "Dedicated KAHF liaison", "Volume referral agreements"], cta: "Contact Us" },
];

function DoctorPage() {
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <Link to="/partners" className="inline-flex items-center gap-2 text-sm text-cool transition-colors hover:text-dusk">
          <ArrowLeft className="h-4 w-4" /> Partners
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-dusk text-mist">
        <div aria-hidden className="pattern-tessellation absolute inset-0 opacity-[0.5]" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-28 kahf-stagger">
          <div className="flex justify-center">
            <KahfLogo className="h-12 w-auto" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-mist md:text-6xl">
            Partnering with Clinicians Who Care
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-mist/75 md:text-lg">
            Help your Muslim patients access culturally aligned mental health support — backed by Islamic psychology and clinical expertise.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="kahf-btn h-12 rounded-[12px] bg-gold px-7 text-dusk hover:bg-gold/90">
              <a href="#apply">Apply for Partnership</a>
            </Button>
            <Button asChild variant="outline" className="kahf-btn h-12 rounded-[12px] border-lavender bg-transparent px-7 text-lavender hover:bg-lavender/10 hover:text-lavender">
              <a href="#overview">Download Program Overview</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t-[3px] border-lavender bg-mist">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:divide-x md:divide-lavender/40">
          {STATS.map((s) => (
            <div key={s.d} className="px-4 text-center">
              <p className="font-display text-4xl font-bold text-dusk md:text-5xl">{s.n}</p>
              <p className="mt-2 text-[13px] leading-snug text-cool">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why this matters */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <h2 className="mb-12 max-w-2xl font-display text-3xl text-dusk md:text-4xl">
          Your Muslim Patients Deserve Better Care
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-[15px] leading-[1.75] text-body">
            Many Muslim patients avoid therapy entirely because their cultural values, Islamic beliefs, and family dynamics are misunderstood or dismissed. They fear judgment. They fear being told their faith is the problem. The result: untreated anxiety, depression, marital breakdown, and grief — silently suffered. As a clinician, you can change this.
          </p>
          <div className="space-y-4">
            {PROBLEMS.map((p) => (
              <div key={p.t} className="kahf-card rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-6">
                <h4 className="font-display text-lg text-dusk">{p.t}</h4>
                <p className="mt-2 text-[13px] leading-[1.7] text-cool">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="overview" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 font-display text-3xl text-dusk md:text-4xl">What the Clinical Partnership Includes</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 kahf-stagger">
          {FEATURES.map((f) => (
            <div key={f.t} className="kahf-card rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-7">
              <f.Icon className="h-6 w-6 text-lavender" />
              <h4 className="mt-4 font-display text-lg text-dusk">{f.t}</h4>
              <p className="mt-2 text-[13px] leading-[1.7] text-cool">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Training Topics Accordion */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-display text-3xl text-dusk md:text-4xl">Training Module Topics</h2>
        <p className="mt-3 text-[15px] text-cool">Structured learning designed by Islamic psychologists and licensed therapists</p>
        <div className="mt-10 space-y-3">
          {TOPICS.map((t, i) => (
            <Accordion key={i} title={t.t} body={t.d} />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 font-display text-3xl text-dusk md:text-4xl">Choose Your Partnership Level</h2>
        <div className="grid gap-6 md:grid-cols-3 kahf-stagger">
          {TIERS.map((t) => (
            <div key={t.name} className={`kahf-card relative rounded-[16px] border bg-warm p-7 ${t.featured ? "border-2 border-lavender" : "border-[rgba(201,192,224,0.35)]"}`}>
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-lavender px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-dusk">Most Popular</span>
              )}
              <p className="font-display text-lg text-dusk">{t.name}</p>
              {t.sub && <p className="text-[12px] text-cool">{t.sub}</p>}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-dusk">{t.price}</span>
                <span className="text-sm text-cool">{t.per}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="kahf-btn mt-7 h-12 w-full rounded-[12px] bg-gold text-dusk hover:bg-gold/90">
                <a href="#apply">{t.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-lavender/15 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-3 flex items-center gap-2 text-cool">
            <Stethoscope className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.25em]">Application</p>
          </div>
          <h2 className="font-display text-3xl text-dusk md:text-4xl">Apply for Clinical Partnership</h2>
          <p className="mt-3 text-[15px] text-cool">Our partnerships team reviews every application within 2 business days.</p>
          <DoctorForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Accordion({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-[12px] border bg-warm transition-all ${open ? "border-l-[3px] border-l-lavender border-y-[rgba(201,192,224,0.35)] border-r-[rgba(201,192,224,0.35)]" : "border-[rgba(201,192,224,0.35)]"}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="text-[14px] font-medium text-dusk">{title}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-cool transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[13px] leading-[1.7] text-cool">{body}</p>
        </div>
      </div>
    </div>
  );
}

function DoctorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState("");

  if (submitted) {
    return (
      <div className="kahf-card mt-8 rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/30">
          <Check className="h-7 w-7 text-sage" />
        </div>
        <p className="mt-5 font-display text-2xl text-dusk">Thank you.</p>
        <p className="mt-2 text-[14px] text-cool">We'll be in touch within 2 business days.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="mt-8 space-y-4 rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-7"
    >
      <Field label="Full name"><Input required className="h-12 rounded-[10px] border-lavender bg-warm" /></Field>
      <Field label="Medical specialty">
        <select required className="h-12 w-full rounded-[10px] border border-lavender bg-warm px-4 text-[14px] text-dusk">
          <option value="">Select…</option>
          {["GP", "Psychiatrist", "Psychologist", "Counsellor", "Nurse Practitioner", "Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Medical license number"><Input required className="h-12 rounded-[10px] border-lavender bg-warm" /></Field>
      <Field label="Country of practice">
        <select required className="h-12 w-full rounded-[10px] border border-lavender bg-warm px-4 text-[14px] text-dusk">
          <option value="">Select…</option>
          {["United States", "United Kingdom", "Canada", "Australia", "UAE", "Saudi Arabia", "Pakistan", "Malaysia", "Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Clinic or hospital name"><Input required className="h-12 rounded-[10px] border-lavender bg-warm" /></Field>
      <Field label="Muslim patients seen per month">
        <select required className="h-12 w-full rounded-[10px] border border-lavender bg-warm px-4 text-[14px] text-dusk">
          <option value="">Select…</option>
          {["Under 10", "10–50", "50–100", "100+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Why you want to partner">
        <Textarea
          required
          maxLength={300}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[120px] rounded-[10px] border-lavender bg-warm"
        />
        <p className="mt-1 text-right text-[11px] text-cool">{reason.length}/300</p>
      </Field>
      <Button type="submit" className="kahf-btn mt-2 h-12 w-full rounded-[12px] bg-gold text-dusk hover:bg-gold/90 sm:w-auto sm:px-10 sm:mx-auto sm:flex">
        Submit Application
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-dusk">{label} <span className="text-gold">*</span></label>
      {children}
    </div>
  );
}
