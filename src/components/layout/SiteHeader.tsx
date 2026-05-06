import { Link, useRouterState } from "@tanstack/react-router";
import { KahfWordmark } from "@/components/brand/KahfLogo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/therapists", label: "Therapists" },
  { to: "/quiz", label: "Take quiz" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/journal", label: "Journal" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <KahfWordmark />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm transition-colors hover:text-foreground ${
                path === n.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full bg-dusk text-mist hover:bg-dusk/90">
            <Link to="/quiz">Find your therapist</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
