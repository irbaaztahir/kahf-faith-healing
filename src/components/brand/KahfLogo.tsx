import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/kahf-logo.png";

export function KahfLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logoSrc} alt="KAHF" className={className} />;
}

export function KahfWordmark({
  className = "",
  logoClassName = "h-10 w-auto",
  textClassName = "text-2xl",
}: {
  className?: string;
  logoClassName?: string;
  textClassName?: string;
}) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 text-dusk ${className}`}>
      <KahfLogo className={logoClassName} />
      <span className={`font-display font-bold tracking-[0.18em] ${textClassName}`}>KAHF</span>
    </Link>
  );
}
