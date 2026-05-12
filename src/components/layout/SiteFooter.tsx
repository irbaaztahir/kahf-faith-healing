import { Link } from "@tanstack/react-router";
import { KahfWordmark } from "@/components/brand/KahfLogo";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-night text-cream">
      <div
        className="border-t"
        style={{ borderColor: "rgba(201,168,76,0.2)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
          <div className="space-y-4">
            <KahfWordmark className="text-cream" />
            <p className="max-w-xs text-sm leading-relaxed text-cream/70">
              Healing rooted in faith, guided by science.
            </p>
            <p className="font-arabic text-lg text-gold/80" style={{ direction: "rtl" }}>
              بِسْمِ اللَّهِ
            </p>
          </div>
          <FooterCol
            title="Programs"
            links={[
              { to: "/partners/doctor", label: "Doctor Program" },
              { to: "/partners/corporate", label: "Corporate Program" },
              { to: "/programs/student", label: "Student Program" },
              { to: "/programs/family", label: "Family Program" },
            ]}
          />
          <FooterCol
            title="Platform"
            links={[
              { to: "/therapists", label: "Find a Therapist" },
              { to: "/resources", label: "Resources" },
              { to: "/blog", label: "Blog" },
              { to: "/about", label: "About" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { to: "/contact", label: "Contact Us" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
            ]}
          />
        </div>
        <div className="border-t" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream/60 md:flex-row">
            <p>© {new Date().getFullYear()} Kahf. All rights reserved.</p>
            <p className="max-w-xl text-center md:text-right">
              Kahf is not a crisis service. If you are in immediate danger, please contact emergency services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-cream/75 transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
