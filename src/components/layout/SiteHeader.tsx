import { Link, useRouterState } from "@tanstack/react-router";
import { KahfWordmark } from "@/components/brand/KahfLogo";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Menu, X, Stethoscope, Building2, GraduationCap, Users, ChevronDown } from "lucide-react";

const nav = [
  { to: "/therapists", label: "Therapists" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const programs = [
  { to: "/partners/doctor", icon: Stethoscope, label: "Doctor Program", sub: "For clinicians & healthcare providers" },
  { to: "/partners/corporate", icon: Building2, label: "Corporate Program", sub: "For companies & organizations" },
  { to: "/programs/student", icon: GraduationCap, label: "Student Program", sub: "For universities & student bodies" },
  { to: "/programs/family", icon: Users, label: "Family Program", sub: "For families navigating together" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPartnerOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setPartnerOpen(false), 200);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-mist/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <KahfWordmark logoClassName="h-10 w-auto" textClassName="text-2xl" />
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm transition-colors hover:text-dusk ${
                path.startsWith(n.to) ? "text-dusk font-medium" : "text-cool"
              }`}
            >
              {n.label}
            </Link>
          ))}
          {/* Programs dropdown */}
          <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button
              onClick={() => setPartnerOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm transition-colors hover:text-dusk ${
                path.startsWith("/partners") || path.startsWith("/programs") ? "text-dusk font-medium" : "text-cool"
              }`}
            >
              Programs <ChevronDown className={`h-3.5 w-3.5 transition-transform ${partnerOpen ? "rotate-180" : ""}`} />
            </button>
            {partnerOpen && (
              <div
                className="kahf-dropdown absolute left-0 top-full mt-2 w-[280px] rounded-[16px] p-2"
                style={{
                  background: "rgba(253,250,245,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  boxShadow: "0 12px 40px rgba(13,27,42,0.16)",
                }}
              >
                {programs.map((p, i) => (
                  <div key={p.to}>
                    {i > 0 && <div className="my-1 h-px" style={{ background: "rgba(13,27,42,0.07)" }} />}
                    <Link
                      to={p.to}
                      onClick={() => setPartnerOpen(false)}
                      className="flex items-start gap-3 rounded-[10px] p-3 transition-colors hover:bg-cream"
                    >
                      <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-deep-teal" />
                      <div>
                        <p className="text-sm font-medium text-dusk">{p.label}</p>
                        <p className="text-[11px] font-light text-cool">{p.sub}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="sm" className="kahf-btn h-10 rounded-[10px] border-lavender bg-transparent px-5 text-dusk hover:bg-lavender/15">
            <Link to="/signin">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="kahf-btn h-10 rounded-[10px] bg-gold px-5 text-dusk hover:bg-gold/90">
            <Link to="/quiz">Find your therapist</Link>
          </Button>
        </div>
        <button
          className="kahf-btn flex h-10 w-10 items-center justify-center rounded-[10px] text-dusk md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-warm md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-[10px] px-3 py-3 text-sm text-dusk hover:bg-mist">
                {n.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-[11px] uppercase tracking-[0.2em] text-cool">Programs</p>
            {programs.map((p) => (
              <Link key={p.to} to={p.to} onClick={() => setOpen(false)} className="rounded-[10px] px-3 py-3 text-sm text-dusk hover:bg-mist">
                {p.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button asChild variant="outline" className="flex-1 rounded-[10px] border-lavender"><Link to="/signin" onClick={() => setOpen(false)}>Sign in</Link></Button>
              <Button asChild className="kahf-btn flex-1 rounded-[10px] bg-gold text-dusk hover:bg-gold/90"><Link to="/quiz" onClick={() => setOpen(false)}>Find your therapist</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
