import { Link, useRouterState } from "@tanstack/react-router";
import { KahfWordmark } from "@/components/brand/KahfLogo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/therapists", label: "Therapists" },
  { to: "/library", label: "Library" },
  { to: "/journey", label: "Journey" },
  { to: "/gift", label: "Gift" },
  { to: "/partners", label: "Partners" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-mist/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <KahfWordmark />
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
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm" className="kahf-btn">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="kahf-btn rounded-[12px] bg-gold px-5 text-dusk hover:bg-gold/90">
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
            <div className="mt-2 flex gap-2">
              <Button asChild variant="outline" className="flex-1 rounded-[12px]"><Link to="/auth">Sign in</Link></Button>
              <Button asChild className="kahf-btn flex-1 rounded-[12px] bg-gold text-dusk hover:bg-gold/90"><Link to="/quiz">Find therapist</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
