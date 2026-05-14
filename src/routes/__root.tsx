import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { CompanionFab } from "@/components/companion/CompanionFab";
import { SignupPopup } from "@/components/SignupPopup";


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
      { title: "Kahf - Faith Aligned Mental Health" },
      { name: "description", content: "Faith-integrated mental wellness for Muslims worldwide. Verified Islamic coaches and psychologists." },
      { name: "author", content: "Kahf" },
      { property: "og:title", content: "Kahf - Faith Aligned Mental Health" },
      { property: "og:description", content: "Faith-integrated mental wellness for Muslims worldwide. Verified Islamic coaches and psychologists." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Kahf - Faith Aligned Mental Health" },
      { name: "twitter:description", content: "Faith-integrated mental wellness for Muslims worldwide. Verified Islamic coaches and psychologists." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/cec9cd08-0fc2-41ac-9d38-929f431138cf" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/cec9cd08-0fc2-41ac-9d38-929f431138cf" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <SignupPopup />
    </>
  );
}
