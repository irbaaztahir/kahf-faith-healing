import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { User as UserIcon, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function UserMenu() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled || !data) return;
      setDisplayName(data.display_name ?? "");
      if (data.avatar_url) {
        const { data: signed } = await supabase.storage
          .from("avatars")
          .createSignedUrl(data.avatar_url, 60 * 60);
        if (!cancelled && signed?.signedUrl) setAvatarUrl(signed.signedUrl);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (loading || !user) return null;

  const initial = (displayName || user.email || "?").charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setOpen(false);
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="kahf-btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-lavender bg-warm text-sm font-medium text-dusk hover:bg-lavender/15"
        aria-label="Account menu"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span>{initial}</span>
        )}
      </button>
      {open && (
        <div
          className="kahf-dropdown absolute right-0 top-full z-50 mt-2 w-[240px] rounded-[16px] p-2"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(201,192,224,0.4)",
            boxShadow: "0 20px 60px rgba(58,47,82,0.12), 0 4px 16px rgba(58,47,82,0.06)",
          }}
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-medium text-dusk">{displayName || "Welcome"}</p>
            <p className="truncate text-[11px] text-cool">{user.email}</p>
          </div>
          <div className="my-1 h-px" style={{ background: "rgba(201,192,224,0.3)" }} />
          <MenuLink to="/profile" icon={<UserIcon className="h-4 w-4" />} onClick={() => setOpen(false)}>My profile</MenuLink>
          <MenuLink to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} onClick={() => setOpen(false)}>Dashboard</MenuLink>
          <MenuLink to="/settings" icon={<Settings className="h-4 w-4" />} onClick={() => setOpen(false)}>Settings</MenuLink>
          <div className="my-1 h-px" style={{ background: "rgba(201,192,224,0.3)" }} />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left text-sm text-dusk transition-colors hover:bg-lavender/15"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({ to, icon, children, onClick }: { to: string; icon: React.ReactNode; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm text-dusk transition-colors hover:bg-lavender/15"
    >
      {icon} {children}
    </Link>
  );
}
