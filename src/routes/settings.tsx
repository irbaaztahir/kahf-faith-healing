import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Kahf" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Settings</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">Your space, <span className="italic">your way.</span></h1>

        <div className="mt-10 space-y-6">
          <Section title="Profile">
            <Field label="Name" defaultValue="Maryam Khan" />
            <Field label="Email" defaultValue="maryam@example.com" />
            <Field label="Preferred language" defaultValue="English" />
          </Section>

          <Section title="Subscription">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Monthly plan</p>
                <p className="text-sm text-muted-foreground">$220/mo · Renews Dec 12</p>
              </div>
              <Button variant="outline" className="rounded-full">Manage in Stripe</Button>
            </div>
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
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="rounded-full">Download my data</Button>
              <Button variant="outline" size="sm" className="rounded-full">Confidentiality notice</Button>
            </div>
          </Section>

          <div className="pt-4">
            <Button asChild variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Link to="/">Sign out</Link>
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

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs text-muted-foreground">{label}</label>
      <Input defaultValue={defaultValue} className="h-11 rounded-xl border-border bg-background" />
    </div>
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
