import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { LIBRARY } from "./library.index";
import { BadgeCheck, Lock, Play } from "lucide-react";

export const Route = createFileRoute("/library/$slug")({
  loader: ({ params }) => {
    const item = LIBRARY.find((i) => i.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.item.title ?? "Library"} — KAHF Library` },
      { name: "description", content: `${loaderData?.item.type} by ${loaderData?.item.author} on KAHF.` },
      { property: "og:title", content: loaderData?.item.title ?? "KAHF Library" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-mist"><SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-dusk">Not found</h1>
        <Button asChild className="kahf-btn mt-6 rounded-[12px] bg-gold text-dusk"><Link to="/library">Back to library</Link></Button>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="min-h-screen p-12 text-center">{error.message}</div>,
  component: Detail,
});

function Detail() {
  const { item } = Route.useLoaderData();
  const isPaywalled = item.access === "Members only";
  return (
    <div className="min-h-screen bg-mist">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/library" className="text-xs uppercase tracking-[0.2em] text-cool hover:text-dusk">← Back to library</Link>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cool">{item.type} · {item.duration}</p>
        <h1 className="mt-2 font-display text-4xl text-dusk md:text-5xl">{item.title}</h1>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-cool">{item.author} <BadgeCheck className="h-4 w-4 text-sage" /></p>

        {item.type === "Audio" && (
          <div className="mt-8 rounded-[16px] border border-border bg-warm p-6">
            <div className="flex items-center gap-4">
              <button className="kahf-btn flex h-14 w-14 items-center justify-center rounded-full bg-gold text-dusk hover:bg-gold/90"><Play className="h-5 w-5 fill-current" /></button>
              <div className="flex-1">
                <div className="h-1.5 rounded-full bg-mist"><div className="h-full w-1/3 rounded-full bg-sage" /></div>
                <div className="mt-3 flex h-10 items-end gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className="block w-1 rounded-full bg-lavender" style={{ height: `${20 + Math.abs(Math.sin(i / 3)) * 70}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {item.type === "Workshop" && (
          <div className="mt-8 flex aspect-video items-center justify-center rounded-[16px] bg-dusk">
            <button className="kahf-btn flex h-16 w-16 items-center justify-center rounded-full bg-warm text-dusk"><Play className="h-6 w-6 fill-current" /></button>
          </div>
        )}

        <article className="prose prose-lg mt-10 max-w-none text-body">
          <p className="font-display text-xl leading-relaxed text-dusk">
            Healing begins with a single act of attention — a willingness to look at what is, without flinching.
          </p>
          <p>
            In the Islamic tradition, the heart is not a single organ but a moving thing — qalb, from a root that means "to turn." It turns toward and away. It softens. It hardens. It remembers and forgets. To care for it is to know that it changes, and that change can be tended.
          </p>
          {!isPaywalled && (
            <>
              <p>
                What we call anxiety in clinical language is often, in lived experience, the body refusing to settle. Tawakkul — placing one's trust in Allah — is not a switch that turns the body's alarm off. It is a slow practice of returning, again and again, to the one place that does not move.
              </p>
              <p>
                The Prophet ﷺ taught that we tie our camel and trust. We do the work of breathing, of seeking help, of moving our limbs into prayer. And then we let go.
              </p>
            </>
          )}
        </article>

        {isPaywalled && (
          <div className="mt-10 rounded-[16px] border border-lavender bg-lavender/30 p-8 text-center">
            <Lock className="mx-auto mb-3 h-6 w-6 text-dusk" />
            <h3 className="font-display text-2xl text-dusk">Continue reading with Kahf</h3>
            <p className="mt-2 text-sm text-cool">Your first month is free. No pressure, cancel anytime.</p>
            <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <Button asChild className="kahf-btn rounded-[12px] bg-gold text-dusk hover:bg-gold/90"><Link to="/auth">Start your free month</Link></Button>
              <Button asChild variant="ghost" className="kahf-btn rounded-[12px] text-dusk"><Link to="/auth">Log in</Link></Button>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
