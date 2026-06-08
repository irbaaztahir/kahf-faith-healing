import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from "lucide-react";
import { therapists } from "@/data/kahf";
import heroPattern from "@/assets/hero-pattern.jpg";

export const Route = createFileRoute("/session")({
  head: () => ({ meta: [{ title: "Session room — Kahf" }] }),
  component: SessionRoom,
});

function SessionRoom() {
  const [stage, setStage] = useState<"waiting" | "active" | "reflect">("waiting");
  const [seconds, setSeconds] = useState(0);
  const [reflection, setReflection] = useState("");
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const navigate = useNavigate();
  const therapist = therapists[0];

  useEffect(() => {
    if (stage !== "active") return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [stage]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (stage === "waiting") {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-hero">
        <div aria-hidden className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url(${heroPattern})`, backgroundSize: "440px" }} />
        <div className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-8 h-2 w-2 animate-pulse rounded-full bg-sage" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Waiting room</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground">Take a breath.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">{therapist.name} will join shortly. This space is yours.</p>
          <Button onClick={() => setStage("active")} size="lg" className="mt-12 h-12 rounded-full bg-dusk px-8 text-mist hover:bg-dusk/90">
            Join session
          </Button>
          <Link to="/dashboard" className="mt-4 text-sm text-muted-foreground hover:text-foreground">Leave waiting room</Link>
        </div>
      </div>
    );
  }

  if (stage === "active") {
    return (
      <div className="flex min-h-screen flex-col bg-dusk text-mist">
        <header className="flex items-center justify-between border-b border-mist/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
            <span className="text-sm text-mist/80">In session with {therapist.name}</span>
          </div>
          <span className="font-display text-2xl tabular-nums">{mm}:{ss}</span>
        </header>
        <main className="relative grid flex-1 place-items-center p-6">
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-3xl bg-black/30 ring-1 ring-mist/10">
            <img src={therapist.photo} alt="" className="h-full w-full object-cover opacity-80" />
            <div className="absolute bottom-4 right-4 aspect-video w-44 overflow-hidden rounded-xl bg-mist/10 ring-1 ring-mist/20">
              <div className="flex h-full items-center justify-center text-xs text-mist/70">You</div>
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-center gap-3 border-t border-mist/10 py-5">
          <ControlBtn active={mic} onClick={() => setMic(!mic)} on={Mic} off={MicOff} />
          <ControlBtn active={cam} onClick={() => setCam(!cam)} on={VideoIcon} off={VideoOff} />
          <button onClick={() => setStage("reflect")} className="flex h-12 items-center gap-2 rounded-full bg-destructive px-6 text-destructive-foreground">
            <PhoneOff className="h-4 w-4" /> End session
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Post-session reflection</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground">What stayed with you?</h1>
        <p className="mt-2 text-muted-foreground">Just a few words. Only for you.</p>
        <Card className="mt-8 rounded-2xl border-border/60 bg-card shadow-soft">
          <CardContent className="p-6">
            <Textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Today I noticed…" className="min-h-[180px] rounded-xl border-border bg-background" />
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })} className="flex-1 rounded-full">Skip</Button>
              <Button onClick={() => navigate({ to: "/journal" })} className="flex-1 rounded-full bg-dusk text-mist hover:bg-dusk/90">Save reflection</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ControlBtn({ active, onClick, on: On, off: Off }: { active: boolean; onClick: () => void; on: typeof Mic; off: typeof MicOff }) {
  const Icon = active ? On : Off;
  return (
    <button onClick={onClick} className={`flex h-12 w-12 items-center justify-center rounded-full transition ${active ? "bg-mist/15 text-mist hover:bg-mist/25" : "bg-mist text-dusk"}`}>
      <Icon className="h-5 w-5" />
    </button>
  );
}
