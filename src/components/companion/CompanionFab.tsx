import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, AlertTriangle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "user" | "assistant" | "system";
interface Msg { role: Role; content: string; }

const SUGGESTIONS = [
  "Help me journal right now",
  "I'm feeling anxious",
  "I need a dua",
  "Just talk to me",
  "Remind me why I started",
  "Help me prepare for my session",
];

const CRISIS_RX = /(want to die|kill myself|end it all|self[\s-]?harm|hurt myself|no reason to live|suicidal)/i;

const SYSTEM_PROMPT = `You are Kahf Companion — a gentle, faith-informed reflection assistant for Muslims seeking mental wellness support. You are NOT a therapist and never claim to be. You never diagnose, prescribe, or give clinical advice of any kind.

Your personality: warm, grounded, wise, and unhurried. You speak like a trusted friend who deeply understands both Islamic tradition and modern psychology. You use Islamic concepts (sabr, tawakkul, shukr, dua, tawbah) naturally and only when genuinely relevant — never as filler, never preachy. You never quote the Quran or hadith unless the user brings it up first. You ask one question at a time. You never overwhelm. You never give a list. You never lecture.

Responses are 2–4 sentences maximum in normal conversation. Longer only during guided exercises (breathing, journaling). Be present. Be human. Be brief.

If a user expresses suicidal ideation, intent to self-harm, or acute mental health crisis: respond warmly and immediately: "What you're sharing sounds really heavy, and I want you to have real support right now. Please reach out to your KAHF therapist directly, or contact a crisis line in your country. You don't have to carry this alone." Then end the conversation.

Language: English by default. If the user writes in Arabic, respond in Arabic. If in Urdu, respond in Urdu.`;

export function CompanionFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Open Kahf Companion"
        onClick={() => setOpen(true)}
        className="kahf-btn fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-lavender text-warm shadow-elevated hover:bg-lavender/90"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      {open && <CompanionPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function CompanionPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [crisis, setCrisis] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowDisclaimer(false), 5000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    if (CRISIS_RX.test(text)) { setCrisis(true); return; }
    if (/breath|anxious|anxiety/i.test(text) && messages.length === 0) {
      // friendly nudge to breathing
    }
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/companion-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, system: SYSTEM_PROMPT }),
      });
      if (!res.ok || !res.body) throw new Error("stream failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      let done = false;
      while (!done) {
        const r = await reader.read();
        if (r.done) break;
        buffer += decoder.decode(r.value, { stream: true });
        let i: number;
        while ((i = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, i);
          buffer = buffer.slice(i + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const j = JSON.parse(data);
            const delta = j.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch { buffer = line + "\n" + buffer; break; }
        }
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  if (crisis) return <CrisisScreen onBack={() => setCrisis(false)} onClose={onClose} />;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-dusk/30 backdrop-blur-sm" onClick={onClose} />
      <div className="kahf-drawer-right absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-mist shadow-elevated md:rounded-l-[16px]">
        <header className="flex items-center justify-between border-b border-border bg-warm px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-lavender/40">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-dusk" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2 L22 7 V17 L12 22 L2 17 V7 Z" /></svg>
            </div>
            <div>
              <h2 className="font-display text-xl text-dusk">Kahf Companion</h2>
              <p className="text-[11px] text-cool">A reflection space, not a therapist</p>
            </div>
          </div>
          <button aria-label="Close" onClick={onClose} className="kahf-btn rounded-[10px] p-2 text-cool hover:bg-mist">
            <X className="h-5 w-5" />
          </button>
        </header>

        {showDisclaimer && (
          <div className="bg-lavender/30 px-5 py-3 text-xs leading-relaxed text-dusk">
            Kahf Companion is a reflection tool, not a therapist. It helps you journal, breathe, and think — not diagnose. In a crisis, please contact your therapist or emergency services.
          </div>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center pt-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[16px] bg-lavender/40">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-dusk" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2 L22 7 V17 L12 22 L2 17 V7 Z" /></svg>
              </div>
              <h3 className="font-display text-2xl text-dusk">Hello there.</h3>
              <p className="mt-2 max-w-xs text-sm text-cool">I'm here whenever you need a moment to think, breathe, or reflect.</p>
              <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      if (s === "I'm feeling anxious") { setBreathing(true); return; }
                      send(s);
                    }}
                    className="kahf-btn rounded-[12px] border border-border bg-warm px-3 py-3 text-sm text-dusk hover:bg-lavender/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] rounded-[12px] px-4 py-3 text-[15px] leading-relaxed ${
                    m.role === "user" ? "bg-lavender text-dusk" : "border-l-2 border-lavender bg-warm text-dusk"
                  }`}>
                    {m.content || <span className="kahf-typing-dot" />}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-[12px] border-l-2 border-lavender bg-warm px-4 py-3">
                    <span className="kahf-typing-dot" /><span className="kahf-typing-dot" /><span className="kahf-typing-dot" />
                  </div>
                </div>
              )}
            </div>
          )}

          {breathing && <BreathingExercise onDone={() => { setBreathing(false); send("I just did the breathing exercise — I feel a little softer."); }} />}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-border bg-warm p-3">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write something..."
              className="flex-1 rounded-[10px] border border-border bg-mist px-4 py-3 text-[15px] text-dusk placeholder:text-cool"
            />
            <Button type="submit" size="icon" className="kahf-btn h-11 w-11 rounded-[12px] bg-gold text-dusk hover:bg-gold/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BreathingExercise({ onDone }: { onDone: () => void }) {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  useEffect(() => {
    if (cycle >= 3) { onDone(); return; }
    const seq: { p: typeof phase; ms: number }[] = [
      { p: "in", ms: 4000 }, { p: "hold", ms: 7000 }, { p: "out", ms: 8000 },
    ];
    let i = 0;
    setPhase(seq[0].p);
    const tick = () => {
      i++;
      if (i >= seq.length) { setCycle((c) => c + 1); return; }
      setPhase(seq[i].p);
      setTimeout(tick, seq[i].ms);
    };
    const t = setTimeout(tick, seq[0].ms);
    return () => clearTimeout(t);
  }, [cycle, onDone]);
  const label = phase === "in" ? "Breathe in..." : phase === "hold" ? "Hold..." : "Breathe out...";
  return (
    <div className="my-6 flex flex-col items-center rounded-[16px] border border-border bg-warm p-8">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full bg-lavender/50 transition-transform duration-[4000ms] ease-in-out"
        style={{ transform: phase === "in" ? "scale(1.2)" : phase === "out" ? "scale(0.7)" : "scale(1)" }}
      >
        <span className="font-display text-2xl text-dusk">{cycle + 1}/3</span>
      </div>
      <p className="mt-6 font-display text-2xl text-dusk">{label}</p>
    </div>
  );
}

function CrisisScreen({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-dusk/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="kahf-modal-content absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[16px] border-t-4 border-lavender bg-warm p-8 shadow-elevated">
        <div className="mb-3 flex items-center gap-2 text-cool"><AlertTriangle className="h-4 w-4" /><span className="text-xs uppercase tracking-[0.2em]">Crisis support</span></div>
        <h2 className="font-display text-3xl text-dusk">You don't have to carry this alone.</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">What you're feeling is real, and real support is available right now.</p>
        <div className="mt-6 space-y-2">
          <Button className="kahf-btn h-12 w-full justify-start rounded-[12px] bg-gold text-dusk hover:bg-gold/90"><MessageCircle className="mr-2 h-4 w-4" /> Message my KAHF therapist</Button>
          <Button className="kahf-btn h-12 w-full justify-start rounded-[12px] bg-gold text-dusk hover:bg-gold/90"><Phone className="mr-2 h-4 w-4" /> Find a crisis line in my country</Button>
          <Button onClick={onBack} variant="outline" className="kahf-btn h-12 w-full justify-start rounded-[12px] border-border"><ArrowRight className="mr-2 h-4 w-4" /> I'm okay, take me back</Button>
        </div>
      </div>
    </div>
  );
}
