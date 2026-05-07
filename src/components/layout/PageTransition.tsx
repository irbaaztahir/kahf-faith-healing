import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [key, setKey] = useState(path);
  useEffect(() => { setKey(path); }, [path]);
  return (
    <div key={key} className="kahf-page">
      {children}
    </div>
  );
}
