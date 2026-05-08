import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useState } from "react";
import { Search, BadgeCheck } from "lucide-react";
import { EmptyState } from "@/components/layout/EmptyState";

export const Route = createFileRoute("/library/")({
  head: () => ({
    meta: [
      { title: "The Kahf Library — articles, audio & workshops" },
      { name: "description", content: "Knowledge is part of healing. Curated articles, audio reflections, workshops, and dua collections by verified Islamic therapists and scholars." },
      { property: "og:title", content: "The Kahf Library" },
      { property: "og:description", content: "Curated by verified Islamic therapists and scholars." },
    ],
  }),
  component: Library,
});

const CATEGORIES = ["All", "Anxiety", "Marriage & relationships", "Grief & loss", "Identity & belonging", "Parenting", "Work & burnout", "Ramadan special", "Faith & doubt", "Anger management"];

export const LIBRARY = [
  { slug: "anxiety-tawakkul", title: "Understanding anxiety through the lens of tawakkul", type: "Article", duration: "6 min read", author: "Dr. Amina Yusuf", access: "Free", cat: "Anxiety", color: "var(--lavender)" },
  { slug: "seeking-help", title: "What Islam says about seeking help for mental health", type: "Article", duration: "4 min read", author: "Omar Rahman", access: "Free", cat: "Faith & doubt", color: "var(--sage)" },
  { slug: "grief-sabr", title: "Navigating grief as a Muslim: between sabr and feeling deeply", type: "Article", duration: "8 min read", author: "Leila Haddad", access: "Free", cat: "Grief & loss", color: "var(--gold)" },
  { slug: "marriage-conflict", title: "Marriage conflict: when Islamic guidance meets psychology", type: "Article", duration: "7 min read", author: "Omar Rahman", access: "Members only", cat: "Marriage & relationships", color: "var(--lavender)" },
  { slug: "muslim-identity-west", title: "The Muslim experience of identity in the West", type: "Article", duration: "9 min read", author: "Dr. Amina Yusuf", access: "Members only", cat: "Identity & belonging", color: "var(--sage)" },
  { slug: "anger-islam", title: "Anger in Islam: understanding it, not suppressing it", type: "Article", duration: "5 min read", author: "Omar Rahman", access: "Members only", cat: "Anger management", color: "var(--gold)" },
  { slug: "breathing-dhikr", title: "A 10-minute breathing and dhikr practice for anxiety", type: "Audio", duration: "10 min listen", author: "Leila Haddad", access: "Free", cat: "Anxiety", color: "var(--sage)" },
  { slug: "writing-to-allah", title: "Guided journaling: writing to Allah", type: "Audio", duration: "15 min listen", author: "Dr. Amina Yusuf", access: "Members only", cat: "Faith & doubt", color: "var(--lavender)" },
  { slug: "evening-reflection", title: "Evening reflection for difficult days", type: "Audio", duration: "8 min listen", author: "Leila Haddad", access: "Members only", cat: "Anxiety", color: "var(--gold)" },
  { slug: "trauma-islamic", title: "Understanding trauma from an Islamic perspective", type: "Workshop", duration: "45 min", author: "Dr. Amina Yusuf", access: "Members only", cat: "Faith & doubt", color: "var(--lavender)" },
  { slug: "raising-children", title: "Raising emotionally healthy Muslim children", type: "Workshop", duration: "60 min", author: "Omar Rahman", access: "Members only", cat: "Parenting", color: "var(--sage)" },
  { slug: "ramadan-mental", title: "Ramadan and your mental health: a practical guide", type: "Workshop", duration: "30 min", author: "Leila Haddad", access: "Free", cat: "Ramadan special", color: "var(--gold)" },
  { slug: "duas-anxiety", title: "Duas for anxiety and overwhelm", type: "Dua collection", duration: "Read", author: "Dr. Amina Yusuf", access: "Free", cat: "Anxiety", color: "var(--lavender)" },
  { slug: "duas-grief", title: "Duas for grief and loss", type: "Dua collection", duration: "Read", author: "Leila Haddad", access: "Members only", cat: "Grief & loss", color: "var(--sage)" },
  { slug: "duas-relationships", title: "Duas for difficult relationships", type: "Dua collection", duration: "Read", author: "Omar Rahman", access: "Members only", cat: "Marriage & relationships", color: "var(--gold)" },
];

function Library() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const items = LIBRARY.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (q === "" || i.title.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      {/* Hero */}
      <section className="relative overflow-hidden bg-dusk text-mist">
        <div aria-hidden className="pattern-tessellation absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="font-display text-5xl font-bold text-mist md:text-6xl">The Kahf Library</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-mist/80">Knowledge is part of healing. Curated by verified Islamic therapists and scholars.</p>
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-[12px] bg-warm p-2">
            <Search className="ml-2 h-4 w-4 text-cool" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by topic, feeling, or keyword..." className="flex-1 bg-transparent px-2 py-2 text-sm text-dusk outline-none placeholder:text-cool" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-warm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-4">
          <div className="flex gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`kahf-btn whitespace-nowrap rounded-full px-4 py-2 text-xs ${cat === c ? "bg-lavender text-dusk" : "text-cool hover:bg-mist"}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {items.length === 0 ? (
          <EmptyState
            title="Nothing matches just yet"
            description="Try a different topic or clear your search to explore everything in the library."
            actionLabel="Clear filters"
            onAction={() => { setCat("All"); setQ(""); }}
          />
        ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 kahf-stagger">
          {items.map((i) => (
            <Link key={i.slug} to="/library/$slug" params={{ slug: i.slug }} className="kahf-card group overflow-hidden rounded-[16px] border border-border bg-warm">
              <div className="relative h-40" style={{ background: `linear-gradient(135deg, ${i.color}, ${i.color}aa)` }}>
                <div aria-hidden className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 2px), linear-gradient(60deg, transparent 49%, rgba(255,255,255,0.3) 49% 51%, transparent 51%)",
                  backgroundSize: "24px 24px",
                }} />
                <span className="absolute left-3 top-3 rounded-full bg-sage/80 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-dusk">{i.type}</span>
                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${i.access === "Free" ? "bg-warm/80 text-cool" : "bg-lavender/80 text-dusk"}`}>{i.access}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl leading-snug text-dusk line-clamp-2">{i.title}</h3>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-cool">{i.author} <BadgeCheck className="h-3.5 w-3.5 text-sage" /></p>
                <p className="mt-1 text-xs text-cool">{i.duration}</p>
              </div>
            </Link>
          ))}
        </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
