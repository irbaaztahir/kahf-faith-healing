import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — KAHF" }] }),
  component: SignupPage,
});

function SignupPage() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div
        className="w-full max-w-[440px] rounded-[20px] bg-warm p-10 kahf-modal-content"
        style={{ border: "1px solid rgba(201,192,224,0.35)", boxShadow: "0 20px 60px rgba(58,47,82,0.1)" }}
      >
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          <h2 className="mt-5 font-display text-3xl text-dusk">Create your sanctuary</h2>
          <p className="mt-2 text-[13px] text-cool">Your healing journey begins here. Completely private.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); }}>
          <FieldLabel label="Full name">
            <Input required placeholder="Your full name" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Email address">
            <Input required type="email" placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Password">
            <PasswordField show={show1} onToggle={() => setShow1(!show1)} placeholder="Create a password" />
          </FieldLabel>
          <FieldLabel label="Confirm password">
            <PasswordField show={show2} onToggle={() => setShow2(!show2)} placeholder="Confirm your password" />
          </FieldLabel>

          <label className="flex items-start gap-2 pt-2 text-[12px] text-cool">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-lavender" />
            <span>I agree to KAHF's <a className="text-dusk underline">Terms of Service</a> and <a className="text-dusk underline">Privacy Policy</a></span>
          </label>
          <label className="flex items-start gap-2 text-[12px] text-cool">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-lavender" />
            <span>I understand my data is private and encrypted</span>
          </label>

          <Button disabled={loading} type="submit" className="kahf-btn mt-3 h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
            {loading ? "Creating account…" : "Create My Account"}
          </Button>
        </form>

        <Divider />
        <SocialButtons />

        <p className="mt-7 text-center text-[13px] text-cool">
          Already have an account? <Link to="/signin" className="text-dusk underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-dusk">{label}</label>
      {children}
    </div>
  );
}

function PasswordField({ show, onToggle, placeholder }: { show: boolean; onToggle: () => void; placeholder: string }) {
  return (
    <div className="relative">
      <Input required type={show ? "text" : "password"} placeholder={placeholder} className="h-12 rounded-[10px] border-lavender bg-warm pr-12" />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-cool transition-colors hover:text-dusk">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-[12px] text-cool">
      <span className="h-px flex-1 bg-cool/30" /> or <span className="h-px flex-1 bg-cool/30" />
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="space-y-2">
      <button className="kahf-btn flex h-12 w-full items-center justify-center gap-3 rounded-[10px] border border-lavender bg-warm text-[14px] text-dusk hover:bg-lavender/10">
        <GoogleIcon /> Continue with Google
      </button>
      <button className="kahf-btn flex h-12 w-full items-center justify-center gap-3 rounded-[10px] border border-lavender bg-warm text-[14px] text-dusk hover:bg-lavender/10">
        <AppleIcon /> Continue with Apple
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.83 2.31-4.19 2.42-4.25-1.32-1.93-3.38-2.2-4.11-2.23-1.75-.18-3.42 1.03-4.31 1.03-.89 0-2.26-1-3.72-.97-1.91.03-3.68 1.11-4.66 2.82-1.99 3.45-.51 8.55 1.43 11.36.95 1.37 2.07 2.91 3.54 2.85 1.42-.06 1.96-.92 3.68-.92 1.71 0 2.2.92 3.7.89 1.53-.03 2.5-1.39 3.43-2.77 1.08-1.59 1.53-3.13 1.55-3.21-.03-.02-2.97-1.14-3-4.6zM14.39 4.06c.78-.94 1.31-2.25 1.16-3.55-1.12.05-2.48.74-3.28 1.68-.72.83-1.36 2.16-1.19 3.43 1.25.1 2.53-.63 3.31-1.56z"/>
    </svg>
  );
}
