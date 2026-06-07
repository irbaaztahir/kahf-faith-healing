import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type SignupRole = "client" | "therapist";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — Kahf" }] }),
  component: SignupPage,
});

async function withTimeout<T>(promise: Promise<T>, message: string, timeoutMs = 15000): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function readInitialRole(): SignupRole | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("role");
  if (fromUrl === "client" || fromUrl === "therapist") return fromUrl;
  try {
    const stored = sessionStorage.getItem("kahf:signup-role");
    if (stored === "client" || stored === "therapist") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<SignupRole | null>(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // client extras
  const [lookingFor, setLookingFor] = useState("");
  // therapist extras
  const [license, setLicense] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [specializations, setSpecializations] = useState("");

  useEffect(() => {
    const r = readInitialRole();
    if (!r) {
      navigate({ to: "/welcome", replace: true });
      return;
    }
    setRole(r);
  }, [navigate]);

  if (!role) return null;

  const isTherapist = role === "therapist";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setFormError("");
    setStatusMessage("");

    const trimmedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) return setFormError("Please enter your full name.");
    if (!normalizedEmail) return setFormError("Please enter your email address.");
    if (password !== confirm) return setFormError("Passwords don't match.");
    if (password.length < 6) return setFormError("Password must be at least 6 characters.");

    if (isTherapist) {
      if (!license.trim()) return setFormError("Please enter your professional license or qualification.");
      if (!yearsExperience.trim() || Number.isNaN(Number(yearsExperience))) {
        return setFormError("Please enter your years of experience as a number.");
      }
      if (!specializations.trim()) return setFormError("Please list at least one specialization.");
    }

    const specArr = specializations
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setLoading(true);
    setStatusMessage("Creating your account…");

    try {
      const metaData: Record<string, unknown> = {
        display_name: trimmedName,
        full_name: trimmedName,
        role,
      };
      if (isTherapist) {
        metaData.license = license.trim();
        metaData.years_experience = yearsExperience.trim();
        metaData.specializations = specArr;
      } else if (lookingFor.trim()) {
        metaData.looking_for = lookingFor.trim();
      }

      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: metaData,
          },
        }),
        "Creating your account took too long. Please check your connection and try again.",
      );
      if (error) throw error;

      let activeSession = data.session;
      if (!activeSession && data.user) {
        setStatusMessage("Account created. Signing you in…");
        const { data: signInData, error: signInError } = await withTimeout(
          supabase.auth.signInWithPassword({ email: normalizedEmail, password }),
          "Your account was created, but sign-in took too long. Please try signing in.",
        );
        if (signInError) throw signInError;
        activeSession = signInData.session;
      }
      if (!activeSession) {
        throw new Error("Account created, but we couldn't start your session. Please sign in.");
      }

      // Make sure role + extra fields are saved (in case the trigger raced)
      const userId = activeSession.user.id;
      await supabase.from("profiles").upsert(
        {
          id: userId,
          display_name: trimmedName,
          role,
          ...(isTherapist
            ? {
                license: license.trim(),
                years_experience: Number(yearsExperience),
                specializations: specArr,
              }
            : { looking_for: lookingFor.trim() || null }),
        },
        { onConflict: "id" },
      );

      try {
        sessionStorage.removeItem("kahf:signup-role");
      } catch {
        /* ignore */
      }

      setStatusMessage("Redirecting…");
      toast.success("Welcome to Kahf");
      await navigate({ to: isTherapist ? "/therapist" : "/client", replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to create your account. Please try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div
        className="w-full max-w-[480px] rounded-[20px] bg-warm p-10 kahf-modal-content"
        style={{ border: "1px solid rgba(201,192,224,0.35)", boxShadow: "0 20px 60px rgba(58,47,82,0.1)" }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/welcome" })}
          className="mb-4 inline-flex items-center gap-1 text-[12px] text-cool transition-colors hover:text-dusk"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Change role
        </button>
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          <h2 className="mt-5 font-display text-3xl text-dusk">
            {isTherapist ? "Join as a Therapist" : "Create your sanctuary"}
          </h2>
          <p className="mt-2 text-[13px] text-cool">
            {isTherapist
              ? "Tell us a little about your practice."
              : "Your healing journey begins here. Completely private."}
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <FieldLabel label="Full name">
            <Input required autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Email address">
            <Input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-12 rounded-[10px] border-lavender bg-warm" />
          </FieldLabel>
          <FieldLabel label="Password">
            <PasswordField value={password} onChange={setPassword} show={show1} onToggle={() => setShow1(!show1)} placeholder="Create a password" />
          </FieldLabel>
          <FieldLabel label="Confirm password">
            <PasswordField value={confirm} onChange={setConfirm} show={show2} onToggle={() => setShow2(!show2)} placeholder="Confirm your password" />
          </FieldLabel>

          {isTherapist ? (
            <>
              <FieldLabel label="Professional license or qualification">
                <Input required value={license} onChange={(e) => setLicense(e.target.value)} placeholder="e.g. LCSW #12345, PhD Clinical Psych" className="h-12 rounded-[10px] border-lavender bg-warm" />
              </FieldLabel>
              <FieldLabel label="Years of experience">
                <Input required type="number" min={0} value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} placeholder="e.g. 5" className="h-12 rounded-[10px] border-lavender bg-warm" />
              </FieldLabel>
              <FieldLabel label="Specializations (comma separated)">
                <Input required value={specializations} onChange={(e) => setSpecializations(e.target.value)} placeholder="Anxiety, Marriage, Trauma" className="h-12 rounded-[10px] border-lavender bg-warm" />
              </FieldLabel>
            </>
          ) : (
            <FieldLabel label="What are you looking for help with? (optional)">
              <Textarea value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} placeholder="Share as much or as little as you'd like…" className="min-h-[88px] rounded-[10px] border-lavender bg-warm" />
            </FieldLabel>
          )}

          <label className="flex items-start gap-2 pt-2 text-[12px] text-cool">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-lavender" />
            <span>I agree to Kahf's <a className="text-dusk underline">Terms of Service</a> and <a className="text-dusk underline">Privacy Policy</a></span>
          </label>

          {formError && (
            <div role="alert" className="rounded-[10px] border border-destructive/40 bg-destructive/10 px-4 py-3 text-[13px] leading-relaxed text-destructive">
              {formError}
            </div>
          )}
          {statusMessage && !formError && (
            <div role="status" className="rounded-[10px] border border-lavender bg-lavender/10 px-4 py-3 text-[13px] leading-relaxed text-dusk">
              {statusMessage}
            </div>
          )}

          <Button disabled={loading} type="submit" className="kahf-btn mt-3 h-12 w-full rounded-[12px] bg-gold text-[15px] font-medium text-dusk hover:bg-gold/90">
            {loading ? "Creating account…" : isTherapist ? "Create Therapist Account" : "Create My Account"}
          </Button>
        </form>

        {!isTherapist && (
          <>
            <Divider />
            <SocialButtons />
          </>
        )}

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
