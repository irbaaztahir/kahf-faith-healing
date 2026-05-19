import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set a new password — Kahf" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    navigate({ to: "/signin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div
        className="w-full max-w-[400px] rounded-[20px] bg-warm p-10 kahf-modal-content"
        style={{ border: "1px solid rgba(201,192,224,0.35)", boxShadow: "0 20px 60px rgba(58,47,82,0.1)" }}
      >
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          <h2 className="mt-5 font-display text-3xl text-dusk">Set a new password</h2>
          <p className="mt-2 text-[13px] text-cool">Choose something you'll remember.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[12px] font-medium text-dusk">New password</label>
            <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-[10px] border-lavender bg-warm" />
          </div>
          <div>
            <label className="mb-2 block text-[12px] font-medium text-dusk">Confirm password</label>
            <Input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12 rounded-[10px] border-lavender bg-warm" />
          </div>
          <Button disabled={loading} type="submit" className="kahf-btn h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
            {loading ? "Updating…" : "Update Password"}
          </Button>
        </form>

        <p className="mt-7 text-center text-[13px] text-cool">
          <Link to="/signin" className="text-dusk underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
