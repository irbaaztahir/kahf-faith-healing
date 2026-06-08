import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Kahf" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
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
      setDisplayName(data?.display_name ?? "");
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/signin" />;

  const handleSave = async () => {
    setSaving(true);
    const trimmed = displayName.trim();
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: trimmed || null }, { onConflict: "id" });
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Settings</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">Your space, <span className="italic">your way.</span></h1>

        <div className="mt-10 space-y-6">
          <Section title="Profile">
            <div>
              <label className="mb-2 block text-xs text-muted-foreground">Name</label>
              <Input
                value={loading ? "" : displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                disabled={loading}
                className="h-11 rounded-xl border-border bg-background"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs text-muted-foreground">Email</label>
              <Input value={user.email ?? ""} disabled className="h-11 rounded-xl border-border bg-background" />
            </div>
            <Button onClick={handleSave} disabled={saving || loading} className="rounded-full bg-dusk text-mist hover:bg-dusk/90">
              {saving ? "Saving…" : "Save profile"}
            </Button>
          </Section>

          <Section title="Notifications">
            <Toggle label="Session reminders" defaultChecked />
            <Toggle label="Therapist messages" defaultChecked />
            <Toggle label="Weekly reflections" />
          </Section>

          <Section title="Privacy">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your sessions and journal entries are end-to-end encrypted. Kahf never sells data and only shares information with your therapist when you choose.
            </p>
          </Section>

          <div className="pt-4">
            <Button onClick={handleSignOut} variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-2xl border-border/60 bg-card shadow-soft">
      <CardContent className="p-6">
        <h2 className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
        <div className="space-y-4">{children}</div>
      </CardContent>
    </Card>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
