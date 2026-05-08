import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

const STORAGE_KEY = "kahf-signup-dismissed-until";
const SESSION_KEY = "kahf-signup-shown-this-session";

export function SignupPopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // never show to logged-in users (heuristic: any supabase auth token)
    const isLoggedIn = Object.keys(localStorage).some(
      (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
    );
    if (isLoggedIn) return;

    // already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // dismissed within last 7 days
    const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (until && Date.now() < until) return;

    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setClosing(true);
    localStorage.setItem(
      STORAGE_KEY,
      String(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );
    setTimeout(() => setOpen(false), 220);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
        style={{ background: "rgba(58, 47, 82, 0.3)" }}
        onClick={dismiss}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md overflow-hidden bg-warm shadow-elevated
          rounded-t-[20px] md:rounded-[20px]
          ${closing ? "" : "kahf-sheet-up md:kahf-modal-content"}
        `}
        style={{ transition: closing ? "transform 220ms ease-in, opacity 220ms ease-in" : undefined, transform: closing ? "translateY(20px)" : undefined, opacity: closing ? 0 : 1 }}
      >
        {/* Top accent strip */}
        <div className="h-1 w-full bg-lavender" aria-hidden />

        <button
          aria-label="Close"
          onClick={dismiss}
          className="kahf-btn absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-full text-cool hover:bg-mist"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-7 pb-8 pt-7 text-center">
          <p className="mb-4 font-display text-xl tracking-tight text-dusk">KAHF</p>
          <h2 className="font-display text-3xl leading-tight text-dusk">
            Your sanctuary is waiting.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-cool">
            Create a free account to find your therapist, track your journey, and access the
            Kahf Companion — all in one private, faith-safe space.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="kahf-btn block w-full rounded-[12px] bg-gold py-3 text-center text-[14px] font-medium text-dusk hover:bg-gold/90"
            >
              Create free account
            </Link>
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="block text-[13px] text-dusk underline-offset-4 hover:underline"
            >
              I already have an account — log in
            </Link>
          </div>

          <p className="mt-5 text-[11px] text-cool">
            No credit card required. Your data is always private.
          </p>
        </div>
      </div>
    </div>
  );
}
