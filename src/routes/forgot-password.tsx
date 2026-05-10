import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Check } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset your password — KAHF" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);

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
          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="mb-2 block text-[12px] font-medium text-dusk">Email address</label>
              <Input required type="email" placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
            </div>
            <Button type="submit" className="kahf-btn h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
              Send Reset Link
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
