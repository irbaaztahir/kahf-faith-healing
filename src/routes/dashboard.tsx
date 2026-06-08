import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useProfileRole } from "@/hooks/use-profile-role";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Your space — Kahf" }] }),
  component: DashboardRouter,
});

function DashboardRouter() {
  const { user, role, loading } = useProfileRole();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist text-sm text-cool">
        Loading your space…
      </div>
    );
  }
  if (!user) return <Navigate to="/signin" replace />;
  if (role === "therapist") return <Navigate to="/therapist" replace />;
  if (role === "client") return <Navigate to="/client" replace />;
  return <Navigate to="/welcome" replace />;
}
