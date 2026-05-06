import { Link } from "@tanstack/react-router";
import { KahfWordmark } from "@/components/brand/KahfLogo";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <KahfWordmark />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Healing rooted in faith. A quiet space to grow, supported by verified Muslim therapists worldwide.
          </p>
        </div>
        <FooterCol title="Care" links={[
          { to: "/therapists", label: "Find a therapist" },
          { to: "/quiz", label: "Take the quiz" },
          { to: "/journal", label: "Mood journal" },
          { to: "/dashboard", label: "Your space" },
        ]} />
        <FooterCol title="For therapists" links={[
          { to: "/therapist-portal", label: "Therapist portal" },
          { to: "/auth", label: "Apply to join" },
        ]} />
        <FooterCol title="Trust" links={[
          { to: "/", label: "Privacy" },
          { to: "/", label: "Terms" },
          { to: "/", label: "Contact" },
        ]} />
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} KAHF. Made with care.</p>
          <p className="max-w-xl text-center md:text-right">
            KAHF is not a crisis service. If you are in immediate danger, please contact emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
