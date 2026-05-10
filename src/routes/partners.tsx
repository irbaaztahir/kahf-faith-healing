import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Stethoscope, Building2, ShieldCheck, BarChart3, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partner with KAHF — Faith-rooted mental wellness for organizations" },
      { name: "description", content: "Bring faith-rooted mental wellness to clinicians and corporate teams. Clinical training, referral network, and corporate wellness programs from KAHF." },
      { property: "og:title", content: "Partner with KAHF" },
      { property: "og:description", content: "Clinical and corporate partnership programs for faith-integrated mental wellness." },
    ],
  }),
  component: PartnersLanding,
});

function PartnersLanding() {
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      {/* Hero */}
      <section className="relative overflow-hidden bg-dusk text-mist">
        <div aria-hidden className="pattern-tessellation absolute inset-0 opacity-100" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-mist/70">Become a Partner</p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-mist md:text-6xl lg:text-7xl">Partner with KAHF</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-mist/80">
            Bring faith-rooted mental wellness to the people you serve.
          </p>
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2 kahf-stagger">
            <ProgramCard
              to="/partners/doctor"
              Icon={Stethoscope}
              title="Doctor Program"
              desc="For doctors, GPs, psychiatrists and clinicians."
            />
            <ProgramCard
              to="/partners/corporate"
              Icon={Building2}
              title="Corporate Wellness"
              desc="For companies investing in their teams."
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-warm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 py-6 text-sm text-cool">
          <span>Verified Islamic therapists</span>
          <span>·</span>
          <span>HIPAA &amp; GDPR compliant</span>
          <span>·</span>
          <span>Trusted by organizations worldwide</span>
          <span>·</span>
          <span>Dedicated partner support</span>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cool">Why KAHF</p>
          <h2 className="font-display text-4xl text-dusk md:text-5xl">Built for organizations that care</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3 kahf-stagger">
          {[
            { Icon: ShieldCheck, t: "Verified Islamic therapists", d: "Every practitioner is licensed and culturally trained." },
            { Icon: BarChart3, t: "Measurable wellness outcomes", d: "Dashboard analytics on engagement and progress." },
            { Icon: Sparkles, t: "White-glove partner support", d: "A dedicated KAHF account manager from day one." },
          ].map((b) => (
            <div key={b.t} className="rounded-[16px] border border-border bg-warm p-7 kahf-card">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] bg-sage/40 text-dusk">
                <b.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl text-dusk">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cool">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-lavender/60">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="font-display text-3xl text-dusk md:text-4xl">Ready to bring KAHF to your organization?</h2>
          <Button asChild className="kahf-btn h-12 rounded-[12px] bg-gold px-8 text-dusk hover:bg-gold/90">
            <Link to="/partners/doctor">Apply for partnership <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ProgramCard({ to, Icon, title, desc }: { to: string; Icon: typeof Stethoscope; title: string; desc: string }) {
  return (
    <Link to={to} className="kahf-card group rounded-[16px] border border-border bg-mist p-7 text-left text-dusk hover:border-lavender">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-lavender/50 text-dusk">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl text-dusk">{title}</h3>
      <p className="mt-2 text-sm text-cool">{desc}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm text-dusk">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}
