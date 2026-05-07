import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { CompanionFab } from "@/components/companion/CompanionFab";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-dusk">404</h1>
        <h2 className="mt-4 font-display text-xl text-dusk">Page not found</h2>
        <p className="mt-2 text-sm text-cool">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="kahf-btn inline-flex items-center justify-center rounded-[12px] bg-gold px-5 py-2.5 text-sm font-medium text-dusk hover:bg-gold/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KAHF — Healing rooted in faith" },
      { name: "description", content: "Faith-integrated mental wellness for Muslims worldwide. Verified Islamic therapists, journaling, and the Kahf Companion." },
      { name: "author", content: "KAHF" },
      { property: "og:title", content: "KAHF — Healing rooted in faith" },
      { property: "og:description", content: "Verified Muslim therapists. Private, faith-sensitive care." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <PageTransition>
        <Outlet />
      </PageTransition>
      <CompanionFab />
    </>
  );
}
