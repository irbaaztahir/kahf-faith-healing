
-- JOURNAL ENTRIES
CREATE TABLE public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry text NOT NULL DEFAULT '',
  mood smallint CHECK (mood BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own journal select" ON public.journal_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own journal insert" ON public.journal_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own journal update" ON public.journal_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own journal delete" ON public.journal_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_journal_updated BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_journal_user_created ON public.journal_entries(user_id, created_at DESC);

-- MOOD CHECKINS
CREATE TABLE public.mood_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood smallint NOT NULL CHECK (mood BETWEEN 1 AND 5),
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mood_checkins TO authenticated;
GRANT ALL ON public.mood_checkins TO service_role;
ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own mood select" ON public.mood_checkins FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own mood insert" ON public.mood_checkins FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own mood update" ON public.mood_checkins FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own mood delete" ON public.mood_checkins FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_mood_user_created ON public.mood_checkins(user_id, created_at DESC);

-- SESSIONS (bookings between client and therapist)
CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  therapist_name text,
  kind text NOT NULL DEFAULT 'session' CHECK (kind IN ('consult','session')),
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 50,
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','completed','cancelled')),
  price numeric(10,2),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sessions select participants" ON public.sessions FOR SELECT TO authenticated USING (auth.uid() = client_id OR auth.uid() = therapist_id);
CREATE POLICY "sessions insert client" ON public.sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);
CREATE POLICY "sessions update participants" ON public.sessions FOR UPDATE TO authenticated USING (auth.uid() = client_id OR auth.uid() = therapist_id) WITH CHECK (auth.uid() = client_id OR auth.uid() = therapist_id);
CREATE POLICY "sessions delete client" ON public.sessions FOR DELETE TO authenticated USING (auth.uid() = client_id);
CREATE TRIGGER trg_sessions_updated BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_sessions_client ON public.sessions(client_id, scheduled_at DESC);
CREATE INDEX idx_sessions_therapist ON public.sessions(therapist_id, scheduled_at DESC);
