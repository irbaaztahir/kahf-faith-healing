
-- Ensure pg_net is available for outbound HTTP from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: posts the changed profile row to the mirror webhook
CREATE OR REPLACE FUNCTION public.mirror_profile_to_external()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  webhook_url text := 'https://project--8e7a5373-8c99-401a-ad06-714e398e22e4.lovable.app/api/public/mirror-profile';
  webhook_secret text := 'YxgiGBzgFc+Q540o/cJMyY3iilJRysCBJ6lAIF+QP+U=';
  payload jsonb;
BEGIN
  payload := jsonb_build_object(
    'id', NEW.id,
    'display_name', NEW.display_name,
    'avatar_url', NEW.avatar_url,
    'role', NEW.role,
    'license', NEW.license,
    'years_experience', NEW.years_experience,
    'specializations', NEW.specializations,
    'looking_for', NEW.looking_for,
    'bio', NEW.bio
  );

  PERFORM net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', webhook_secret
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS mirror_profile_after_insert ON public.profiles;
DROP TRIGGER IF EXISTS mirror_profile_after_update ON public.profiles;

CREATE TRIGGER mirror_profile_after_insert
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.mirror_profile_to_external();

CREATE TRIGGER mirror_profile_after_update
AFTER UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.mirror_profile_to_external();
