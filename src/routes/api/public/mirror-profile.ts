import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const PayloadSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  license: z.string().nullable().optional(),
  years_experience: z.number().int().nullable().optional(),
  specializations: z.array(z.string()).nullable().optional(),
  looking_for: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
});

export const Route = createFileRoute('/api/public/mirror-profile')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = request.headers.get('x-webhook-secret');
        if (!secret || secret !== process.env.MIRROR_WEBHOOK_SECRET) {
          return new Response('Unauthorized', { status: 401 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response('Invalid JSON', { status: 400 });
        }

        const parsed = PayloadSchema.safeParse(body);
        if (!parsed.success) {
          return new Response('Invalid payload', { status: 400 });
        }

        const url = process.env.EXTERNAL_SUPABASE_URL;
        const key = process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) {
          return new Response('Mirror not configured', { status: 500 });
        }

        const external = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { error } = await external
          .from('profiles')
          .upsert(parsed.data, { onConflict: 'id' });

        if (error) {
          console.error('Mirror upsert failed', error);
          return new Response(`Mirror failed: ${error.message}`, { status: 500 });
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
