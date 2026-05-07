import { Link } from "@tanstack/react-router";

export function KahfLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M24 4 L29 19 L44 19 L32 28 L37 43 L24 34 L11 43 L16 28 L4 19 L19 19 Z" />
        <circle cx="24" cy="24" r="5" />
        <path d="M24 14 L24 19 M24 29 L24 34 M14 24 L19 24 M29 24 L34 24" />
      </g>
    </svg>
  );
}

export function KahfWordmark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 text-dusk ${className}`}>
      <KahfLogo className="h-7 w-7" />
      <span className="font-display text-2xl font-bold tracking-[0.18em]">KAHF</span>
    </Link>
  );
}
