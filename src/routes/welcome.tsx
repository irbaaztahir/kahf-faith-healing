import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { KahfLogo } from "@/components/brand/KahfLogo";
import { Heart, Stethoscope, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome to Kahf — Who are you?" }] }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();

  const choose = (role: "client" | "therapist") => {
    try {
      sessionStorage.setItem("kahf:signup-role", role);
    } catch {
      /* ignore */
    }
    navigate({ to: "/signup", search: { role } as never });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <KahfLogo className="h-12 w-auto" />
          <h1 className="mt-6 font-display text-4xl text-dusk sm:text-5xl">
            Welcome to Kahf — <span className="italic">Who are you?</span>
          </h1>
          <p className="mt-3 max-w-xl text-[14px] text-cool">
            Choose how you'd like to use Kahf. You can always change later from your profile.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <RoleCard
            icon={<Heart className="h-6 w-6 text-dusk" />}
            title="I am looking for support"
            description="Find verified Muslim therapists, book private sessions, and journal your journey."
            onClick={() => choose("client")}
          />
          <RoleCard
            icon={<Stethoscope className="h-6 w-6 text-dusk" />}
            title="I am a Therapist"
            description="Offer sessions, manage your schedule, and connect with clients who need your care."
            onClick={() => choose("therapist")}
          />
        </div>

        <p className="mt-8 text-center text-[13px] text-cool">
          Already have an account?{" "}
          <a href="/signin" className="text-dusk underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="kahf-btn group flex h-full flex-col items-start gap-3 rounded-[20px] bg-warm p-8 text-left transition hover:-translate-y-0.5"
      style={{
        border: "1px solid rgba(201,192,224,0.35)",
        boxShadow: "0 20px 60px rgba(58,47,82,0.1)",
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender/30">
        {icon}
      </div>
      <h3 className="font-display text-2xl text-dusk">{title}</h3>
      <p className="text-[13px] leading-relaxed text-cool">{description}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-dusk">
        Continue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
