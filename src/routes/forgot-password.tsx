import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset your password — Kahf" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div
        className="w-full max-w-[400px] rounded-[20px] bg-warm p-10 kahf-modal-content"
        style={{ border: "1px solid rgba(201,192,224,0.35)", boxShadow: "0 20px 60px rgba(58,47,82,0.1)" }}
      >
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          {sent ? (
            <>
              <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-sage/30">
                <Check className="h-7 w-7 text-sage" />
              </div>
              <p className="mt-5 font-display text-2xl text-dusk">Check your inbox</p>
              <p className="mt-2 text-[13px] text-cool">A reset link is on its way.</p>
            </>
          ) : (
            <>
              <h2 className="mt-5 font-display text-3xl text-dusk">Reset your password</h2>
              <p className="mt-2 text-[13px] text-cool">Enter your email and we'll send you a reset link.</p>
            </>
          )}
        </div>

        {!sent && (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-[12px] font-medium text-dusk">Email address</label>
              <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
            </div>
            <Button disabled={loading} type="submit" className="kahf-btn h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
              {loading ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
        )}

        <p className="mt-7 text-center text-[13px] text-cool">
          <Link to="/signin" className="text-dusk underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
