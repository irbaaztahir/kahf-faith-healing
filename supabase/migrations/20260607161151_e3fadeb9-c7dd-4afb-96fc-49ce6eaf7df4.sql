-- Fix: restrict profile SELECT to own profile only
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Fix: prevent self-escalation in user_roles via a RESTRICTIVE policy.
-- The existing permissive "Admins can insert roles" stays; this restrictive
-- policy enforces that ANY direct insert must come from an existing admin.
-- The handle_new_user trigger runs as SECURITY DEFINER and bypasses RLS,
-- so default 'user' role assignment on signup continues to work.
CREATE POLICY "Only admins may insert roles (restrictive)"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
