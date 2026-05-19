import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — Kahf" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: fullName, full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Check your email to verify.");
    navigate({ to: "/signin" });
  };

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

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <FieldLabel label="Full name">
            <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Email address">
            <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Password">
            <PasswordField value={password} onChange={setPassword} show={show1} onToggle={() => setShow1(!show1)} placeholder="Create a password" />
          </FieldLabel>
          <FieldLabel label="Confirm password">
            <PasswordField value={confirm} onChange={setConfirm} show={show2} onToggle={() => setShow2(!show2)} placeholder="Confirm your password" />
          </FieldLabel>

          <label className="flex items-start gap-2 pt-2 text-[12px] text-cool">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-lavender" />
            <span>I agree to Kahf's <a className="text-dusk underline">Terms of Service</a> and <a className="text-dusk underline">Privacy Policy</a></span>
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

function PasswordField({ value, onChange, show, onToggle, placeholder }: { value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; placeholder: string }) {
  return (
    <div className="relative">
      <Input required value={value} onChange={(e) => onChange(e.target.value)} type={show ? "text" : "password"} placeholder={placeholder} className="h-12 rounded-[10px] border-lavender bg-warm pr-12" />
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
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) {
      setLoading(false);
      toast.error(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    window.location.href = "/dashboard";
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="kahf-btn flex h-12 w-full items-center justify-center gap-3 rounded-[10px] border border-lavender bg-warm text-[14px] text-dusk hover:bg-lavender/10 disabled:opacity-60"
      >
        <GoogleIcon /> {loading ? "Connecting…" : "Continue with Google"}
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
