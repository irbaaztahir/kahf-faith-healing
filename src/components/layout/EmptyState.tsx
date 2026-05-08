import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="kahf-page mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      <svg
        viewBox="0 0 120 120"
        className="mb-6 h-28 w-28 text-lavender"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden
      >
        <circle cx="60" cy="60" r="44" opacity="0.4" />
        <path d="M60 16 L72 52 L108 52 L78 74 L90 110 L60 88 L30 110 L42 74 L12 52 L48 52 Z" opacity="0.7" />
        <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.5" />
      </svg>
      <h3 className="font-display text-2xl text-dusk">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cool">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="kahf-btn mt-6 rounded-[12px] bg-gold text-dusk hover:bg-gold/90">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
