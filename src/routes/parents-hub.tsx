import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { KahfLogo } from "@/components/brand/KahfLogo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  Smartphone,
  Cloud,
  Star,
  Shield,
  MessageCircle,
  Flame,
  Users,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/parents-hub")({
  head: () => ({
    meta: [
      { title: "Kahf Parents — Raise Them with Wisdom. Support Them with Love." },
      {
        name: "description",
        content:
          "Faith-aligned guidance for Muslim parents navigating the real challenges of raising emotionally healthy children.",
      },
      { property: "og:title", content: "Kahf Parents — Faith-aligned parenting guidance" },
      {
        property: "og:description",
        content:
          "Guides, tools, and expert advice for Muslim parents — by Kahf's verified therapists.",
      },
    ],
  }),
  component: ParentsHubPage,
});

const CATEGORIES = [
  {
    id: "emotional-intelligence",
    Icon: Brain,
    title: "Raising Emotionally Aware Children",
    desc: "Help your child name, understand, and manage their emotions from an early age.",
  },
  {
    id: "screens",
    Icon: Smartphone,
    title: "Navigating Screens & Social Media",
    desc: "Practical boundaries and conversations around technology in an Islamic household.",
  },
  {
    id: "anxiety",
    Icon: Cloud,
    title: "When Your Child is Anxious",
    desc: "Recognise the signs of anxiety in children and how to respond with patience and presence.",
  },
  {
    id: "identity",
    Icon: Star,
    title: "Raising Confident Muslim Children",
    desc: "Building a strong Islamic identity in children growing up between two cultures.",
  },
  {
    id: "discipline",
    Icon: Shield,
    title: "Discipline the Right Way",
    desc: "The difference between punishment and discipline — and what Islam says about it.",
  },
  {
    id: "hard-talks",
    Icon: MessageCircle,
    title: "Hard Conversations Made Easier",
    desc: "How to talk to your children about death, divorce, mental health, and puberty.",
  },
  {
    id: "burnout",
    Icon: Flame,
    title: "You Cannot Pour from an Empty Cup",
    desc: "Recognising parent burnout and why taking care of yourself is an Islamic obligation.",
  },
  {
    id: "siblings",
    Icon: Users,
    title: "Managing Sibling Rivalry",
    desc: "Turn conflict between siblings into opportunities for growth and connection.",
  },
];

const GUIDES = [
  {
    cat: "Emotional Intelligence",
    read: "5 min read",
    title: "Why Your Child Cries and What They Are Really Telling You",
    desc: "Tears are a language. Learn to read what your child is communicating beneath the surface.",
    author: "Dr. Amina Khalid",
  },
  {
    cat: "Islamic Identity",
    read: "6 min read",
    title: "My Child Says They Don't Want to Pray — What Do I Do?",
    desc: "A calm, evidence-based and faith-aligned approach to one of the most common parenting fears.",
    author: "Ustadh Tariq Hussain",
  },
  {
    cat: "Anxiety & Stress",
    read: "4 min read",
    title: "5 Signs Your Child May Be Anxious (And How to Help)",
    desc: "Anxiety in children often looks like anger, clinginess, or avoidance — not worry. Here is what to look for.",
    author: "Dr. Fatima Al-Rashid",
  },
];

const TOOLKIT = [
  {
    title: "Emotion Wheel for Children",
    desc: "A printable and digital emotion wheel to help your child identify and name what they are feeling. Available in English, Arabic, and Urdu.",
    tag: "Free Tool",
    cta: "Download",
  },
  {
    title: "Daily Check-In Conversation Starters",
    desc: "10 questions to ask your child every day that go beyond 'how was school?' — designed to open real conversations.",
    tag: "Free Tool",
    cta: "View Questions",
  },
  {
    title: "Islamic Bedtime Routine Guide",
    desc: "A calming, structured bedtime routine combining sunnah practices and emotional connection moments for children aged 3–12.",
    tag: "Free Guide",
    cta: "Read Guide",
  },
  {
    title: "Screen Time Agreement Template",
    desc: "A customizable family agreement for screen time rules — co-created with your child so they actually follow it.",
    tag: "Free Template",
    cta: "Download",
  },
  {
    title: "Parent Mood Journal",
    desc: "A private journaling space for parents inside Kahf — track your own emotional patterns, triggers, and growth as a parent.",
    tag: "Members Only",
    cta: "Open Journal",
  },
  {
    title: "Dua Collection for Parents",
    desc: "A curated collection of duas for patience, guidance, and raising righteous children — with Arabic, transliteration, and meaning.",
    tag: "Free",
    cta: "View Duas",
  },
];

const SCENARIOS = [
  {
    front: "Your 8-year-old says 'I hate myself' after making a mistake.",
    back: "Don't dismiss it. Sit with them. Say: 'That sounds really hard. Tell me more.' Validate the feeling before correcting the thought. Then gently remind them that Allah loves them even when they make mistakes.",
  },
  {
    front: "Your teenager refuses to pray and says Islam feels forced.",
    back: "Avoid ultimatums. Ask open questions: 'What feels hard about it right now?' Focus on connection before correction. A child who feels heard is far more likely to return to their deen.",
  },
  {
    front: "Your child is being bullied at school but doesn't want you to intervene.",
    back: "Respect their autonomy while staying involved. Say: 'I won't do anything without telling you first — but I need to understand what's happening.' Build safety before solutions.",
  },
  {
    front: "Your child saw something upsetting online and is scared to tell you.",
    back: "Create a no-punishment promise for honesty. 'If you ever see something that upsets you, you can always come to me and I will not be angry at you.' Then follow through — every time.",
  },
  {
    front: "Your toddler is having a meltdown in public and you feel embarrassed and frustrated.",
    back: "Meltdowns are developmental — not disobedience. Get down to their level, speak softly, and focus on safety first. Your calm is their calm. Make dua quietly and breathe.",
  },
  {
    front: "Your child asks: 'Why did Allah let grandma die?'",
    back: "Do not rush to theology. First say: 'That is such an important question and I'm so glad you asked me.' Sit in the grief together. Then gently share: 'We believe Allah loves grandma more than we ever could.'",
  },
];

const SESSIONS = [
  {
    title: "Single Parent Consultation",
    price: "$85",
    desc: "A one-off session to work through a specific parenting challenge with a Kahf therapist.",
    cta: "Book Session",
  },
  {
    title: "Parent & Child Session",
    price: "$95",
    desc: "A joint session where the therapist works with both parent and child together to improve communication and connection.",
    cta: "Book Session",
  },
  {
    title: "Ongoing Parent Support",
    price: "$59/month",
    desc: "Monthly subscription — 4 sessions per month dedicated to your growth and wellbeing as a parent.",
    cta: "Start Subscription",
  },
];

const QA = [
  {
    q: "My child is 6 and already showing signs of anxiety. Is that normal and what should I do?",
    a: "Anxiety can appear as early as age 3–4. At age 6, look for patterns: avoidance of new situations, frequent stomach aches before school, excessive reassurance-seeking. These are signals, not flaws. Start with connection — a consistent calm presence — before any intervention.",
  },
  {
    q: "How do I balance being a strict Islamic household with giving my teenager enough freedom?",
    a: "Rigidity breeds rebellion. Structure with warmth is the most effective combination — in both Islamic parenting literature and modern psychology. Define non-negotiables (prayer, respect, honesty) and give autonomy everywhere else.",
  },
  {
    q: "My son refuses to talk to me about anything. How do I get him to open up?",
    a: "Stop asking questions — start sharing. When parents share their own mild struggles ('I had a hard day today'), children feel safe to reciprocate. Connection happens side by side, not face to face — try talking during car rides or walks.",
  },
  {
    q: "I feel like I'm failing as a parent. I lose my temper too often. Where do I start?",
    a: "Start with self-compassion. You cannot regulate your child's emotions if you cannot regulate your own. This is not a character flaw — it is a skill. Kahf's parent support sessions are specifically designed for this.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I never realized how much my own unresolved anxiety was affecting my children. Kahf Parents helped me see myself as a parent more clearly — and more kindly.",
    name: "Mariam, mother of 3, London",
  },
  {
    quote:
      "The scenario flip cards alone were worth it. I finally had the words for conversations I had been avoiding for years.",
    name: "Ahmed, father of 2, Toronto",
  },
  {
    quote:
      "The guide on raising confident Muslim children in the West made me cry. Someone finally understood exactly what we are going through.",
    name: "Hana, mother of 4, Sydney",
  },
];

const FAQ = [
  {
    q: "Is Kahf Parents only for Muslim parents?",
    a: "Kahf is designed with Islamic values as its foundation but anyone who resonates with a faith-aligned, culturally sensitive approach to parenting is welcome.",
  },
  {
    q: "Do I need a subscription to access the resources?",
    a: "Many guides, tools, and the scenario cards are completely free. The Parent Toolkit journal and some premium guides require a Kahf subscription.",
  },
  {
    q: "Can I book a session for my child directly?",
    a: "Yes. Kahf has therapists who specialize in working with children and adolescents. You can book on your child's behalf from the therapist discovery page.",
  },
  {
    q: "How are the guides created?",
    a: "Every guide is written or reviewed by a Kahf verified therapist with specific training in child and family psychology. Nothing is AI-generated without therapist review.",
  },
  {
    q: "I am struggling as a parent myself — is there support for me?",
    a: "Absolutely. Parent burnout and emotional overwhelm are real. Kahf's parent specialist sessions are specifically for you — not just your children.",
  },
];

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="kahf-btn group relative h-64 w-full text-left"
      style={{ perspective: "1200px" }}
      aria-label="Flip scenario card"
    >
      <div
        className="relative h-full w-full transition-transform duration-[400ms] ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[16px] border bg-warm p-6"
          style={{
            backfaceVisibility: "hidden",
            borderColor: "rgba(201,192,224,0.35)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <span className="inline-flex w-fit rounded-full bg-lavender/20 px-3 py-1 text-[11px] font-medium text-dusk">
            Scenario
          </span>
          <p className="font-display text-lg leading-snug text-dusk">{front}</p>
          <span className="text-[11px] text-cool">Tap to see response →</span>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[16px] border bg-mist p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: "rgba(201,192,224,0.35)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <span className="inline-flex w-fit rounded-full bg-sage/30 px-3 py-1 text-[11px] font-medium text-dusk">
            Wise Response
          </span>
          <p className="text-sm leading-relaxed text-body">{back}</p>
          <span className="text-[11px] text-cool">← Tap to flip back</span>
        </div>
      </div>
    </button>
  );
}

function AskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="kahf-modal-overlay absolute inset-0 bg-dusk/40" onClick={onClose} />
      <div className="kahf-modal-content relative w-full max-w-md rounded-[16px] border bg-warm p-6 shadow-elevated"
        style={{ borderColor: "rgba(201,192,224,0.35)" }}>
        <h3 className="font-display text-xl text-dusk">Ask Your Question</h3>
        <p className="mt-1 text-sm text-cool">Our therapists will review and respond.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="mt-4 space-y-3"
        >
          <input
            type="text"
            placeholder="Your name (optional)"
            className="h-12 w-full rounded-[10px] border bg-warm px-4 text-sm"
            style={{ borderColor: "rgba(201,192,224,0.5)" }}
          />
          <textarea
            required
            placeholder="What would you like to ask?"
            rows={5}
            className="w-full rounded-[10px] border bg-warm px-4 py-3 text-sm"
            style={{ borderColor: "rgba(201,192,224,0.5)" }}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}
              className="h-12 rounded-[10px] border-lavender bg-transparent text-dusk hover:bg-lavender/15">
              Cancel
            </Button>
            <Button type="submit"
              className="kahf-btn h-12 rounded-[10px] bg-gold text-dusk hover:bg-gold/90">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ParentsHubPage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <div className="kahf-page min-h-screen bg-mist">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-dusk">
        <div className="absolute inset-0 pattern-tessellation opacity-[0.05]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="kahf-stagger flex flex-col items-center gap-6">
            <KahfLogo className="h-12 w-auto" />
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl"
              style={{ color: "#e8dfc8" }}>
              Raise Them with Wisdom.<br />Support Them with Love.
            </h1>
            <p className="max-w-2xl text-base font-light md:text-lg"
              style={{ color: "rgba(232,223,200,0.75)" }}>
              Faith-aligned guidance for Muslim parents navigating the real challenges of raising emotionally healthy children in today's world.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() =>
                  document.getElementById("topics")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="kahf-btn h-12 rounded-[10px] bg-gold px-7 text-dusk hover:bg-gold/90"
              >
                Explore Resources
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("specialist")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="kahf-btn h-12 rounded-[10px] border-lavender bg-transparent px-7 text-mist hover:bg-lavender/15"
              >
                Talk to a Parent Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-t-[3px] border-lavender bg-mist">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {[
            { n: "1 in 3", d: "Muslim children report feeling misunderstood at home" },
            { n: "68%", d: "parents feel unprepared for their child's emotional needs" },
            { n: "4x", d: "more effective parenting with consistent emotional attunement" },
            { n: "0", d: "faith-aligned parenting platforms before Kahf Parents" },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <p className="font-display text-4xl font-bold text-dusk md:text-5xl">{s.n}</p>
              <p className="mt-2 text-[13px] text-cool">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPIC CATEGORIES */}
      <section id="topics" className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-dusk md:text-4xl">What Would You Like Help With?</h2>
            <p className="mt-2 text-sm text-cool">Choose a topic to explore guides, tools, and expert advice.</p>
          </div>
          <div className="kahf-stagger -mx-6 flex gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {CATEGORIES.map(({ id, Icon, title, desc }) => (
              <a
                key={id}
                href={`#${id}`}
                className="kahf-card block min-w-[280px] rounded-[16px] border bg-warm p-6 md:min-w-0"
                style={{ borderColor: "rgba(201,192,224,0.35)" }}
              >
                <Icon className="mb-4 h-7 w-7 text-lavender" />
                <h3 className="font-display text-lg leading-snug text-dusk">{title}</h3>
                <p className="mt-2 text-sm text-cool">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED GUIDES */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-dusk md:text-4xl">This Week's Featured Guides</h2>
            <p className="mt-2 text-sm text-cool">Written and reviewed by Kahf's verified Islamic therapists and child psychologists.</p>
          </div>
          <div className="kahf-stagger grid gap-6 md:grid-cols-3">
            {GUIDES.map((g) => (
              <article
                key={g.title}
                className="kahf-card flex flex-col rounded-[16px] border bg-warm p-7"
                style={{ borderColor: "rgba(201,192,224,0.35)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-lavender/25 px-3 py-1 text-[11px] font-medium text-dusk">{g.cat}</span>
                  <span className="text-[12px] text-cool">{g.read}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug text-dusk">{g.title}</h3>
                <p className="mt-2 text-[13px] text-cool">{g.desc}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-lavender/40" />
                  <span className="text-sm text-dusk">By {g.author}</span>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-sage/30 px-2 py-1 text-[10px] font-medium text-dusk">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="kahf-btn mt-6 h-12 rounded-[10px] border-gold bg-transparent text-dusk hover:bg-gold/15"
                >
                  Read Guide
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT TOOLKIT */}
      <section className="py-20" style={{ background: "rgba(201,192,224,0.12)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-dusk md:text-4xl">The Kahf Parent Toolkit</h2>
            <p className="mt-2 text-sm text-cool">Practical tools you can use today — not just theory.</p>
          </div>
          <div className="kahf-stagger grid gap-6 md:grid-cols-2">
            {TOOLKIT.map((t) => (
              <div
                key={t.title}
                className="kahf-card rounded-[16px] border bg-warm p-7"
                style={{ borderColor: "rgba(201,192,224,0.35)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-dusk">{t.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${
                      t.tag === "Members Only"
                        ? "bg-gold/25 text-dusk"
                        : "bg-sage/30 text-dusk"
                    }`}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm text-cool">{t.desc}</p>
                <Button className="kahf-btn mt-5 h-12 rounded-[10px] bg-gold text-dusk hover:bg-gold/90">
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIO FLIP CARDS */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-dusk md:text-4xl">What Would You Do?</h2>
            <p className="mt-2 text-sm text-cool">Real parenting situations — explore how to respond with wisdom, patience, and Islamic guidance.</p>
          </div>
          <div className="kahf-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((s, i) => (
              <FlipCard key={i} front={s.front} back={s.back} />
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIST SESSIONS */}
      <section id="specialist" className="bg-dusk py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl" style={{ color: "#e8dfc8" }}>
              Sometimes You Need to Talk to Someone Too
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "rgba(232,223,200,0.75)" }}>
              Kahf's therapists offer dedicated parent support sessions — not just for children, but for you as a parent navigating the weight of raising the next generation.
            </p>
          </div>
          <div className="kahf-stagger grid gap-6 md:grid-cols-3">
            {SESSIONS.map((s) => (
              <div
                key={s.title}
                className="kahf-card rounded-[16px] border p-7"
                style={{ background: "#4a3f68", borderColor: "rgba(201,192,224,0.4)" }}
              >
                <h3 className="font-display text-xl" style={{ color: "#e8dfc8" }}>{s.title}</h3>
                <p className="mt-2 font-display text-3xl text-gold">{s.price}</p>
                <p className="mt-3 text-sm" style={{ color: "rgba(232,223,200,0.75)" }}>{s.desc}</p>
                <Button className="kahf-btn mt-5 h-12 w-full rounded-[10px] bg-gold text-dusk hover:bg-gold/90">
                  {s.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY Q&A */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-dusk md:text-4xl">Questions from the Kahf Parent Community</h2>
            <p className="mt-2 text-sm text-cool">Real questions from parents — answered by our verified therapists.</p>
          </div>
          <div className="kahf-stagger space-y-4">
            {QA.map((item, i) => (
              <details
                key={i}
                className="group rounded-[16px] border-l-[3px] border-lavender bg-warm p-5"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <summary className="cursor-pointer list-none font-display text-base text-dusk">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button onClick={() => setAskOpen(true)}
              className="kahf-btn h-12 rounded-[10px] bg-gold px-7 text-dusk hover:bg-gold/90">
              Ask Your Question
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20" style={{ background: "rgba(201,192,224,0.1)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center font-display text-3xl text-dusk md:text-4xl">What Kahf Parents Are Saying</h2>
          <div className="kahf-stagger grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="kahf-card rounded-[16px] border bg-warm p-7"
                style={{ borderColor: "rgba(201,192,224,0.35)" }}
              >
                <blockquote className="font-display text-base leading-relaxed text-dusk">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-[13px] text-cool">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-display text-3xl text-dusk md:text-4xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="rounded-[16px] border bg-warm px-5"
                style={{ borderColor: "rgba(201,192,224,0.35)" }}
              >
                <AccordionTrigger className="font-display text-base text-dusk">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-body">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
      <AskModal open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
