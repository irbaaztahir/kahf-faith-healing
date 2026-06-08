import { useLocation } from "@tanstack/react-router";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // key on pathname so the page re-mounts and replays the entrance animation
  return (
    <div key={location.pathname} className="kahf-page">
      {children}
    </div>
  );
}
