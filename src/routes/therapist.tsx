import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, User as UserIcon } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.jpg";
import { useEffect, useState } from "react";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/therapist")({
  head: () => ({ meta: [{ title: "Therapist dashboard — Kahf" }] }),
  component: TherapistDashboard,
});

function TherapistDashboard() {
  const { user, role, loading } = useProfileRole();
  const [displayName, setDisplayName] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfileLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setDisplayName(data?.display_name?.trim() ?? "");
      setProfileLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/signin" replace />;
  if (!role) return <Navigate to="/welcome" replace />;
  if (role !== "therapist") return <Navigate to="/client" replace />;

  const firstName = displayName ? displayName.split(" ")[0] : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.18]" style={{ backgroundImage: `url(${heroPattern})`, backgroundSize: "420px" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Therapist portal</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">
            Welcome{firstName ? <>, <span className="italic">{firstName}</span></> : null}.
          </h1>
          <p className="mt-2 text-muted-foreground">
            {profileLoading ? "Loading your portal…" : "Care for your clients with calm and clarity."}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-3">
        <PortalCard
          to="/therapist-portal"
          icon={Users}
          title="My Clients"
          description="See your active clients and recent messages."
        />
        <PortalCard
          to="/therapist-portal"
          icon={Calendar}
          title="My Schedule"
          description="Manage availability and view upcoming sessions."
        />
        <PortalCard
          to="/settings"
          icon={UserIcon}
          title="My Profile"
          description="Update your bio, specializations and credentials."
        />
      </div>
    </div>
  );
}

function PortalCard({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: typeof Users;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lavender/30">
          <Icon className="h-5 w-5 text-dusk" />
        </div>
        <h2 className="font-display text-2xl text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button asChild className="mt-auto w-full rounded-full bg-dusk text-mist hover:bg-dusk/90">
          <Link to={to}>Open</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
