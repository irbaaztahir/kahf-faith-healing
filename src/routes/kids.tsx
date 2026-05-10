import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Star, Trophy, Target, Award, Lock, Check } from "lucide-react";

export const Route = createFileRoute("/kids")({
  head: () => ({
    meta: [
      { title: "Kahf\u00A0Kids \u2014 Learn. Play. Grow in Your Deen." },
      { name: "description", content: "Islamic games, quizzes, stories and challenges — made just for kids aged 6–14." },
    ],
  }),
  component: KidsPage,
});

const TABS = [
  { id: "quizzes", label: "Islamic Quizzes", Icon: BookOpen },
  { id: "quran", label: "Quran Corner", Icon: Sparkles },
  { id: "manners", label: "Good Manners", Icon: Star },
  { id: "challenges", label: "Challenges", Icon: Trophy },
  { id: "daily", label: "Daily Questions", Icon: Target },
  { id: "badges", label: "My Badges", Icon: Award },
];

const QUIZZES = [
  { t: "Prophets & Stories", d: "Learn about the amazing stories of the Prophets — from Adam (AS) to Muhammad (SAW).", q: 10, badge: "History Hero", level: "Beginner" },
  { t: "Quranic Knowledge", d: "Which Surah? Which Juz? Test how well you know the Book of Allah.", q: 10, badge: "Quran Champion", level: "Intermediate" },
  { t: "Beautiful Manners", d: "Do you know the Islamic way of greeting, eating, and treating others with kindness?", q: 8, badge: "Adab Star", level: "Beginner" },
  { t: "Arabic Alphabet Adventure", d: "Can you recognise the Arabic letters? Play and learn!", q: 10, badge: "Arabic Explorer", level: "Beginner" },
  { t: "5 Pillars & 6 Beliefs", d: "How well do you know the foundations of Islam?", q: 10, badge: "Faith Foundation", level: "Intermediate" },
  { t: "Life of the Prophet ﷺ", d: "Journey through the blessed life of our beloved Prophet Muhammad ﷺ.", q: 12, badge: "Seerah Scholar", level: "Advanced" },
];

const CHALLENGES = [
  { t: "Say Alhamdulillah after every meal today", points: 10 },
  { t: "Give a sincere compliment to someone in your family", points: 15 },
  { t: "Make dua for a friend today", points: 20 },
];

const BADGES = [
  { name: "History Hero", unlocked: true, date: "Mar 14" },
  { name: "Quran Champion", unlocked: true, date: "Apr 02" },
  { name: "Adab Star", unlocked: false, hint: "Complete Beautiful Manners quiz" },
  { name: "Arabic Explorer", unlocked: false, hint: "Complete Arabic Alphabet quiz" },
  { name: "Faith Foundation", unlocked: false, hint: "Complete 5 Pillars quiz" },
  { name: "Seerah Scholar", unlocked: false, hint: "Complete Seerah Challenge" },
  { name: "Daily Dedication", unlocked: false, hint: "Reach a 7-day streak" },
  { name: "Good Manners Master", unlocked: false, hint: "Complete all 3 weekly challenges" },
  { name: "Knowledge Seeker", unlocked: false, hint: "Complete 10 quizzes" },
];

const QUESTION = {
  q: "What is the name of the angel who brings revelation?",
  options: ["Mikail (AS)", "Israfil (AS)", "Jibreel (AS)", "Izrail (AS)"],
  correct: 2,
};

function KidsPage() {
  const [active, setActive] = useState("quizzes");
  const [done, setDone] = useState<number[]>([]);
  const [pickedAnswer, setPickedAnswer] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #c9c0e0 0%, #a8c5b0 100%)" }}>
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28 kahf-stagger">
          <CaveSvg className="mx-auto h-28 w-auto md:h-36" />
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-dusk md:text-6xl">
            Learn. Play. Grow in Your Deen.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-dusk/80 md:text-lg">
            Islamic games, quizzes, stories and challenges — made just for you.
          </p>
          <Button asChild className="kahf-btn mt-8 h-12 rounded-[12px] bg-gold px-8 text-dusk hover:bg-gold/90">
            <a href="#quizzes">Start Exploring</a>
          </Button>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-20 z-30 border-b border-border bg-mist/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActive(t.id); document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`kahf-btn flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] transition-colors ${
                active === t.id ? "bg-dusk text-mist" : "bg-lavender/40 text-dusk hover:bg-lavender/60"
              }`}
            >
              <t.Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quizzes */}
      <section id="quizzes" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl text-dusk md:text-4xl">Test Your Knowledge</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 kahf-stagger">
          {QUIZZES.map((q) => (
            <div key={q.t} className="kahf-card rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-lavender/40">
                <BookOpen className="h-6 w-6 text-dusk" />
              </div>
              <h3 className="mt-4 font-display text-xl text-dusk">{q.t}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-cool">{q.d}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-sage/30 px-3 py-1 text-[11px] text-dusk">{q.level}</span>
                <span className="rounded-full bg-lavender/30 px-3 py-1 text-[11px] text-dusk">{q.q} questions</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[12px] text-cool">
                <Star className="h-4 w-4 fill-gold text-gold" /> Reward: {q.badge}
              </div>
              <Button className="kahf-btn mt-5 h-11 w-full rounded-[12px] bg-gold text-dusk hover:bg-gold/90">Start Quiz</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Daily question */}
      <section id="daily" className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-[20px] bg-dusk p-8 text-mist md:p-12" style={{ background: "linear-gradient(135deg, #3a2f52, #4a3d6a)" }}>
          <p className="text-[11px] uppercase tracking-[0.25em] text-lavender">Question of the Day</p>
          <h3 className="mt-3 font-display text-2xl leading-snug md:text-3xl">{QUESTION.q}</h3>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {QUESTION.options.map((o, i) => {
              const isPicked = pickedAnswer === i;
              const isCorrect = i === QUESTION.correct;
              return (
                <button
                  key={o}
                  onClick={() => setPickedAnswer(i)}
                  className={`kahf-btn rounded-[14px] border bg-warm p-4 text-left text-[15px] text-dusk transition-all ${
                    pickedAnswer === null ? "border-[rgba(201,192,224,0.35)] hover:border-lavender" :
                    isPicked && isCorrect ? "border-2 border-sage bg-sage/20" :
                    isPicked ? "border-2 border-cool bg-mist" :
                    isCorrect ? "border-2 border-sage" : "border-[rgba(201,192,224,0.35)] opacity-60"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {pickedAnswer !== null && (
            <p className="mt-5 text-[14px] text-mist/85">
              {pickedAnswer === QUESTION.correct
                ? "Masha'Allah! That's correct! 🌟"
                : `Not quite — the answer is "${QUESTION.options[QUESTION.correct]}".`}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[13px]">
            <span className="text-gold">New question tomorrow · 14h 22m</span>
            <span className="rounded-full bg-warm/10 px-3 py-1 text-mist">🔥 3 day streak</span>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section id="challenges" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl text-dusk md:text-4xl">This Week's Manners Challenge</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3 kahf-stagger">
          {CHALLENGES.map((c, i) => {
            const isDone = done.includes(i);
            return (
              <div key={c.t} className="kahf-card rounded-[16px] border border-[rgba(201,192,224,0.35)] bg-warm p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-sage/40">
                  <Star className="h-5 w-5 text-dusk" />
                </div>
                <p className="mt-4 text-[15px] leading-[1.6] text-dusk">{c.t}</p>
                <p className="mt-3 text-[12px] text-sage">+{c.points} points</p>
                <Button
                  onClick={() => setDone((d) => isDone ? d.filter(x => x !== i) : [...d, i])}
                  className={`kahf-btn mt-5 h-11 w-full rounded-[12px] ${isDone ? "bg-sage text-warm hover:bg-sage/90" : "bg-gold text-dusk hover:bg-gold/90"}`}
                >
                  {isDone ? <><Check className="mr-2 h-4 w-4" /> Done</> : "Mark as done"}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges */}
      <section id="badges" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl text-dusk md:text-4xl">Your Badges</h2>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 kahf-stagger">
          {BADGES.map((b) => (
            <div
              key={b.name}
              className={`kahf-card rounded-[16px] border bg-warm p-6 text-center ${
                b.unlocked ? "border-2 border-gold" : "border border-[rgba(138,132,152,0.35)] opacity-70"
              }`}
            >
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${b.unlocked ? "bg-gold/30" : "bg-cool/20"}`}>
                {b.unlocked ? <Award className="h-8 w-8 text-gold" /> : <Lock className="h-6 w-6 text-cool" />}
              </div>
              <p className={`mt-4 font-display text-base ${b.unlocked ? "text-dusk" : "text-cool"}`}>{b.name}</p>
              <p className="mt-1 text-[11px] text-cool">{b.unlocked ? `Earned ${b.date}` : b.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-6 pb-12 text-center text-[12px] text-cool">
        This section is designed for children. Parents \u2014 learn more about Kahf\u00A0Kids.
      </p>

      <SiteFooter />
    </div>
  );
}

function CaveSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" aria-hidden>
      <path d="M20 130 Q20 30 100 20 Q180 30 180 130 Z" fill="#3a2f52" opacity="0.85" />
      <path d="M55 130 Q55 70 100 60 Q145 70 145 130 Z" fill="#f5f3f7" />
      <circle cx="100" cy="50" r="3" fill="#c8a878" />
      <circle cx="60" cy="35" r="2" fill="#c8a878" />
      <circle cx="140" cy="35" r="2" fill="#c8a878" />
      <circle cx="40" cy="60" r="1.5" fill="#c8a878" />
      <circle cx="160" cy="60" r="1.5" fill="#c8a878" />
      <path d="M100 50 L60 35 M100 50 L140 35 M100 50 L40 60 M100 50 L160 60" stroke="#c9c0e0" strokeWidth="0.7" />
    </svg>
  );
}
