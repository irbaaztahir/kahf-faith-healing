import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Eye, EyeOff } from "lucide-react";
import { Divider, SocialButtons } from "./signup";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign in — KAHF" }] }),
  component: SignInPage,
});

function SignInPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div
        className="w-full max-w-[440px] rounded-[20px] bg-warm p-10 kahf-modal-content"
        style={{ border: "1px solid rgba(201,192,224,0.35)", boxShadow: "0 20px 60px rgba(58,47,82,0.1)" }}
      >
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          <h2 className="mt-5 font-display text-3xl text-dusk">Welcome back</h2>
          <p className="mt-2 text-[13px] text-cool">Your sanctuary is waiting.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-2 block text-[12px] font-medium text-dusk">Email address</label>
            <Input required type="email" placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </div>
          <div>
            <label className="mb-2 block text-[12px] font-medium text-dusk">Password</label>
            <div className="relative">
              <Input required type={show ? "text" : "password"} placeholder="Your password" className="h-12 rounded-[10px] border-lavender bg-warm pr-12" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-cool transition-colors hover:text-dusk">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[12px] text-cool">
              <input type="checkbox" className="h-4 w-4 accent-lavender" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-[12px] text-dusk underline">Forgot password?</Link>
          </div>

          <Button type="submit" className="kahf-btn mt-3 h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
            Sign In
          </Button>
        </form>

        <Divider />
        <SocialButtons />

        <p className="mt-7 text-center text-[13px] text-cool">
          Don't have an account? <Link to="/signup" className="text-dusk underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
