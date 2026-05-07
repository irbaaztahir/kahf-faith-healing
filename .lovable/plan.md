## KAHF Expansion Plan

This is a large scope (5 major features + global animation system + design lockdown). I'll plan it as phased work so you can approve before I build.

### Phase 0 — Design system lockdown & global animations
- Update `src/styles.css`: swap font-display to **Playfair Display** (currently Cormorant Garamond), enforce locked palette tokens (verify hex → oklch mapping for #c9c0e0, #a8c5b0, #f5f3f7, #8a8498, #3a2f52, #ffffff, #c8a878), add body color `#4a4060`, lock radii (card 16, button 12, input 10).
- Add global animation utilities: `.kahf-page-enter`, `.kahf-stagger-item`, `.kahf-card-hover`, `.kahf-button-press`, `.kahf-modal-enter`, `.kahf-drawer-enter`, breathing pulse, confetti keyframes.
- Create `<PageTransition>` wrapper in `__root.tsx` keyed by pathname (fade + translateY).
- Create `<StaggerList>` helper and `<RippleButton>` variant for Soft Gold CTAs.
- Update existing Button/Card/Input shadcn components to use new radii + hover/press animations by default.

### Phase 1 — Become a Partner
- `src/routes/partners.tsx` — landing with hero, 2 program selector cards, trust bar, benefits, CTA strip.
- `src/routes/partners.clinical.tsx` — Clinical Partnership program (problem statement, 6 benefit grid, accordion training topics, 3-tier pricing, application modal).
- `src/routes/partners.corporate.tsx` — Corporate Wellness (4 stats, 3 pillars, **4-stop Healing Journey** animated roadmap, employer dashboard preview, 3-tier pricing, application modal).
- Add `<PartnerApplicationModal>` (clinical + corporate variants).
- Add nav + footer links.

### Phase 2 — Gift a Session
- `src/routes/gift.tsx` — 3-step flow (choose → personalise → review/pay) with step indicator.
- Add nav link, dashboard card, therapist-profile gift link.
- `src/routes/gifts-sent.tsx` — sender tracking table.
- Mock gift email preview component (no real email send — UI only unless you want backend).
- Stripe is referenced but I'll stub the checkout step (no Stripe activation unless you confirm).

### Phase 3 — Healing Journey Map
- `src/routes/journey.tsx` — header + tabs, 4 stat cards with count-up, mood arc chart (Recharts), event timeline, milestone grid (11 milestones), download summary button.
- Install `recharts` if not already.
- PDF generation via simple jsPDF for "Download my journey summary".
- Confetti CSS celebration component for milestone unlocks.

### Phase 4 — Kahf Library
- `src/routes/library.index.tsx` — hero, search, category pills, content grid (mock content).
- `src/routes/library.$slug.tsx` — content detail (article/audio/video/dua collection variants), paywall card for Members-only at 30%.
- Custom audio player UI, dua card formatter.
- Mock content data file `src/data/library.ts`.

### Phase 5 — Kahf AI Companion
- Floating button on every screen via `__root.tsx`.
- `<CompanionPanel>` — right drawer (desktop) / bottom sheet (mobile), welcome screen, 6 suggestion chips, message bubbles, typing indicator, breathing exercise component, dua card, crisis intervention screen.
- Backend: enable **Lovable Cloud** + **Lovable AI Gateway**, edge function `companion-chat` streaming via Lovable AI (the spec asks for Claude `claude-sonnet-4-20250514` but I'll route through Lovable AI Gateway by default — confirm if you specifically want Anthropic-direct with your own key).
- Crisis keyword detection on the server.
- Daily message counter (free 10/day) — needs Cloud DB.

### Technical notes (for reference)
- TanStack Start file-based routing; route files use `createFileRoute`. Each new route gets its own `head()` metadata.
- All colors via CSS tokens — no hex in components.
- Animations via CSS + tw-animate-css (already installed); avoid framer-motion to keep bundle lean.
- Lovable Cloud needed for: Companion chat persistence, gift tracking, journey data, milestone unlocks. I'll enable it in Phase 2 when first needed.
- Stripe: I'll use built-in Lovable Stripe payments when wiring real checkout (Gift + Partner subscriptions). Confirm before I enable.

### Open questions before I start
1. **AI provider for Companion**: Lovable AI Gateway (default, no key needed) or Anthropic Claude direct (you'd add API key)?
2. **Stripe**: enable Lovable's built-in Stripe payments now, or stub checkouts as "Coming soon" UI?
3. **Build order**: ship Phase 0 + 1 first for review, or all 5 phases in one go?

Once you confirm, I'll execute. This is roughly 25–35 new/edited files.