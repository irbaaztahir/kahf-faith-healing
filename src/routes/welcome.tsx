import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome to Kahf" }] }),
  component: WelcomeRedirect,
});

function WelcomeRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      sessionStorage.setItem("kahf:signup-role", "client");
    } catch {
      /* ignore */
    }
    navigate({ to: "/signup", search: { role: "client" } as never, replace: true });
  }, [navigate]);
  return null;
}
