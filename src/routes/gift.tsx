import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Lock, Heart } from "lucide-react";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Gift a Session — Kahf" },
      { name: "description", content: "Give the gift of healing. Send a single therapy session, a session trio, or a monthly Kahf membership." },
      { property: "og:title", content: "Gift a Session — Kahf" },
      { property: "og:description", content: "A thoughtful gift for someone you love." },
    ],
  }),
  component: Gift,
});

const OPTIONS = [
  { id: "single", title: "Single session", price: "$95", desc: "One full therapy session with any Kahf therapist. They choose who feels right for them.", note: "Sessions range from $85–$110 depending on therapist. This credit covers any session." },
  { id: "trio", title: "Session trio", price: "$270", desc: "Three sessions — enough to begin, enough to feel the difference.", badge: "Most thoughtful" },
  { id: "monthly", title: "Monthly membership", price: "$59/month", desc: "A full month of healing. 4 sessions, journaling, and the Kahf Companion. Cancel anytime." },
];
const OCCASIONS = ["Just because", "Eid gift", "Ramadan reflection", "New baby / new mother", "Exam or study stress", "Supporting a friend", "Divorce or separation", "Grief and loss", "Wedding or new marriage", "Other"];

function Gift() {
  const [step, setStep] = useState(1);
  const [pick, setPick] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const chosen = OPTIONS.find((o) => o.id === pick);

  if (done) {
    return (
      <div className="min-h-screen bg-mist">
        <SiteHeader />
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage/40"><Check className="h-8 w-8 text-dusk" /></div>
          <h1 className="font-display text-4xl text-dusk">Your gift is on its way.</h1>
          <p className="mt-3 text-body">{name} will receive your gift at {email}. Thank you for thinking of them.</p>
          <Button asChild className="kahf-btn mt-8 rounded-[12px] bg-gold text-dusk hover:bg-gold/90"><Link to="/dashboard">Back to your space</Link></Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-3 flex items-center gap-2 text-cool"><Heart className="h-4 w-4" /><span className="text-xs uppercase tracking-[0.25em]">Gift a session</span></div>
        <h1 className="font-display text-4xl text-dusk md:text-5xl">Give the gift of healing</h1>

        {/* Step indicator */}
        <div className="mt-8 flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-2.5 w-2.5 rounded-full transition ${s <= step ? "bg-lavender" : "bg-cool/40"}`} />
              {s < 3 && <div className="h-px w-8 bg-cool/30" />}
            </div>
          ))}
          <span className="ml-3 text-xs text-cool">Step {step} of 3</span>
        </div>

        <div className="mt-10">
          {step === 1 && (
            <div className="grid gap-5 md:grid-cols-3 kahf-stagger">
              {OPTIONS.map((o) => (
                <button key={o.id} onClick={() => setPick(o.id)} className={`kahf-card rounded-[16px] border bg-warm p-6 text-left ${pick === o.id ? "border-2 border-lavender" : "border-border"}`}>
                  {o.badge && <span className="mb-3 inline-block rounded-full bg-sage/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-dusk">{o.badge}</span>}
                  <h3 className="font-display text-2xl text-dusk">{o.title}</h3>
                  <p className="mt-3 text-sm text-cool">{o.desc}</p>
                  <p className="mt-5 font-display text-3xl font-bold text-dusk">{o.price}</p>
                  {o.note && <p className="mt-2 text-[11px] text-cool">{o.note}</p>}
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 rounded-[16px] border border-border bg-warm p-6">
              <Field label="Recipient's first name" value={name} onChange={setName} />
              <Field label="Recipient's email" type="email" value={email} onChange={setEmail} />
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-cool">Gift occasion</span>
                <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk">
                  <option value="">Choose...</option>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 flex justify-between text-xs uppercase tracking-[0.15em] text-cool"><span>Personal message</span><span className="normal-case tracking-normal">{msg.length}/200</span></span>
                <textarea maxLength={200} value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="Write something warm. They'll see this when they open their gift." className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk" />
              </label>
            </div>
          )}
          {step === 3 && chosen && (
            <div className="rounded-[16px] border border-border bg-warm p-7">
              <h2 className="font-display text-2xl text-dusk">Review your gift</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Recipient" value={name || "—"} />
                <Row label="Email" value={email || "—"} />
                <Row label="Occasion" value={occasion || "—"} />
                <Row label="Gift" value={chosen.title} />
                <Row label="Total" value={chosen.price} />
              </dl>
              <p className="mt-6 flex items-center gap-2 text-xs text-cool"><Lock className="h-3.5 w-3.5" /> Secure payment. Your recipient's therapy journey is completely private.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)} className="kahf-btn rounded-[12px] border-border">Back</Button>
          {step < 3 ? (
            <Button disabled={step === 1 && !pick} onClick={() => setStep(step + 1)} className="kahf-btn rounded-[12px] bg-gold text-dusk hover:bg-gold/90">Continue</Button>
          ) : (
            <Button onClick={() => setDone(true)} className="kahf-btn rounded-[12px] bg-gold text-dusk hover:bg-gold/90">Send gift</Button>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-cool">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-[10px] border border-border bg-mist px-4 py-3 text-sm text-dusk" />
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border pb-2"><dt className="text-cool">{label}</dt><dd className="text-dusk">{value}</dd></div>
  );
}
