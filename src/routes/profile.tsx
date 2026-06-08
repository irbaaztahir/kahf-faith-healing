import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My profile — Kahf" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, bio, looking_for, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setDisplayName(data?.display_name ?? "");
      setBio(data?.bio ?? "");
      setLookingFor(data?.looking_for ?? "");
      setAvatarPath(data?.avatar_url ?? null);
      if (data?.avatar_url) {
        const { data: signed } = await supabase.storage
          .from("avatars")
          .createSignedUrl(data.avatar_url, 60 * 60);
        if (!cancelled && signed?.signedUrl) setAvatarUrl(signed.signedUrl);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/signin" />;

  const initial = (displayName || user.email || "?").charAt(0).toUpperCase();

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { error: pErr } = await supabase
        .from("profiles")
        .upsert({ id: user.id, avatar_url: path }, { onConflict: "id" });
      if (pErr) throw pErr;
      setAvatarPath(path);
      const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60);
      if (signed?.signedUrl) setAvatarUrl(signed.signedUrl);
      toast.success("Profile picture updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        looking_for: lookingFor.trim() || null,
      },
      { onConflict: "id" },
    );
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Account</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">
          My <span className="italic">profile</span>
        </h1>

        <Card className="mt-10 rounded-2xl border-border/60 bg-card shadow-soft">
          <CardContent className="flex flex-col items-center gap-4 p-8 sm:flex-row sm:items-center sm:text-left">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-lavender/30 text-3xl font-display text-dusk">
                {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : <span>{initial}</span>}
              </div>
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-dusk text-mist shadow-md hover:bg-dusk/90"
                aria-label="Change profile picture"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
              <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">{displayName || "Welcome"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, up to 5MB.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-2xl border-border/60 bg-card shadow-soft">
          <CardContent className="space-y-5 p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Personal information</h2>
            <Field label="Full name">
              <Input
                value={loading ? "" : displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                disabled={loading}
                className="h-11 rounded-xl border-border bg-background"
              />
            </Field>
            <Field label="Email">
              <Input value={user.email ?? ""} disabled className="h-11 rounded-xl border-border bg-background" />
            </Field>
            <Field label="About you">
              <Textarea
                value={loading ? "" : bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A short bio (optional)"
                disabled={loading}
                className="min-h-[100px] rounded-xl border-border bg-background"
              />
            </Field>
            <Field label="What are you looking for help with?">
              <Textarea
                value={loading ? "" : lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                placeholder="Optional"
                disabled={loading}
                className="min-h-[88px] rounded-xl border-border bg-background"
              />
            </Field>
            <div className="pt-2">
              <Button onClick={handleSave} disabled={saving || loading} className="rounded-full bg-dusk text-mist hover:bg-dusk/90">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
