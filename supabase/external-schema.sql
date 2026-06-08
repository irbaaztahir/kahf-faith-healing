-- =============================================================================
-- Kahf — full schema for external Supabase project (efasxpkzzafhqfglmtkw)
-- Run this ONCE in the SQL Editor of the external project.
-- Idempotent where possible. Safe to re-run.
-- =============================================================================

-- Extensions -------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================================================
-- profiles
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT CHECK (role IN ('client','therapist')),
  license TEXT,
  years_experience INTEGER,
  specializations TEXT[],
  looking_for TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- Roles (app_role enum + user_roles + has_role)
-- =============================================================================
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('user', 'therapist', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- =============================================================================
-- profiles policies
-- =============================================================================
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete any profile" ON public.profiles;
CREATE POLICY "Admins can delete any profile"
  ON public.profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =============================================================================
-- user_roles policies
-- =============================================================================
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =============================================================================
-- sessions
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  therapist_name TEXT,
  kind TEXT NOT NULL DEFAULT 'session',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 50,
  status TEXT NOT NULL DEFAULT 'confirmed',
  price NUMERIC,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sessions select participants" ON public.sessions;
CREATE POLICY "sessions select participants" ON public.sessions
  FOR SELECT TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = therapist_id);

DROP POLICY IF EXISTS "sessions insert client" ON public.sessions;
CREATE POLICY "sessions insert client" ON public.sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);

DROP POLICY IF EXISTS "sessions update participants" ON public.sessions;
CREATE POLICY "sessions update participants" ON public.sessions
  FOR UPDATE TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = therapist_id)
  WITH CHECK (auth.uid() = client_id OR auth.uid() = therapist_id);

DROP POLICY IF EXISTS "sessions delete client" ON public.sessions;
CREATE POLICY "sessions delete client" ON public.sessions
  FOR DELETE TO authenticated USING (auth.uid() = client_id);

-- =============================================================================
-- journal_entries
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry TEXT NOT NULL DEFAULT '',
  mood SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own journal select" ON public.journal_entries;
CREATE POLICY "own journal select" ON public.journal_entries
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "own journal insert" ON public.journal_entries;
CREATE POLICY "own journal insert" ON public.journal_entries
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "own journal update" ON public.journal_entries;
CREATE POLICY "own journal update" ON public.journal_entries
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "own journal delete" ON public.journal_entries;
CREATE POLICY "own journal delete" ON public.journal_entries
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =============================================================================
-- mood_checkins
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.mood_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood SMALLINT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mood_checkins TO authenticated;
GRANT ALL ON public.mood_checkins TO service_role;

ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own mood select" ON public.mood_checkins;
CREATE POLICY "own mood select" ON public.mood_checkins
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "own mood insert" ON public.mood_checkins;
CREATE POLICY "own mood insert" ON public.mood_checkins
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "own mood update" ON public.mood_checkins;
CREATE POLICY "own mood update" ON public.mood_checkins
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "own mood delete" ON public.mood_checkins;
CREATE POLICY "own mood delete" ON public.mood_checkins
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =============================================================================
-- updated_at trigger helper
-- =============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_sessions_updated_at ON public.sessions;
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_journal_entries_updated_at ON public.journal_entries;
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- handle_new_user — populate profile + assign 'user' role on signup
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  meta jsonb := NEW.raw_user_meta_data;
  chosen_role text := NULLIF(meta ->> 'role', '');
  spec_json jsonb := meta -> 'specializations';
  spec_array text[];
BEGIN
  IF chosen_role IS NOT NULL AND chosen_role NOT IN ('client','therapist') THEN
    chosen_role := NULL;
  END IF;

  IF spec_json IS NOT NULL AND jsonb_typeof(spec_json) = 'array' THEN
    SELECT array_agg(value::text) INTO spec_array
    FROM jsonb_array_elements_text(spec_json);
  END IF;

  INSERT INTO public.profiles (id, display_name, avatar_url, role, license, years_experience, specializations, looking_for)
  VALUES (
    NEW.id,
    COALESCE(meta ->> 'display_name', meta ->> 'full_name', meta ->> 'name'),
    meta ->> 'avatar_url',
    chosen_role,
    NULLIF(meta ->> 'license', ''),
    NULLIF(meta ->> 'years_experience', '')::int,
    spec_array,
    NULLIF(meta ->> 'looking_for', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    license = COALESCE(EXCLUDED.license, public.profiles.license),
    years_experience = COALESCE(EXCLUDED.years_experience, public.profiles.years_experience),
    specializations = COALESCE(EXCLUDED.specializations, public.profiles.specializations),
    looking_for = COALESCE(EXCLUDED.looking_for, public.profiles.looking_for);

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- Storage: avatars bucket + per-user folder policies
-- Create the 'avatars' bucket (private) via Dashboard > Storage if not present,
-- then run the policies below.
-- =============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Users view own avatars" ON storage.objects;
CREATE POLICY "Users view own avatars" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users upload own avatars" ON storage.objects;
CREATE POLICY "Users upload own avatars" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users update own avatars" ON storage.objects;
CREATE POLICY "Users update own avatars" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users delete own avatars" ON storage.objects;
CREATE POLICY "Users delete own avatars" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =============================================================================
-- DONE
-- =============================================================================
