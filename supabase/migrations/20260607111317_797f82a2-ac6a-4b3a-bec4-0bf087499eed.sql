
-- Add role column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text
  CHECK (role IN ('client','therapist'));

-- Therapist-specific profile fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS license text,
  ADD COLUMN IF NOT EXISTS years_experience integer,
  ADD COLUMN IF NOT EXISTS specializations text[],
  ADD COLUMN IF NOT EXISTS looking_for text;

-- Update trigger to capture role + extra fields from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Ensure trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
