import { createFileRoute } from "@tanstack/react-router";

const CRISIS_RX = /(want to die|kill myself|end it all|self[\s-]?harm|hurt myself|no reason to live|suicidal)/i;

export const Route = createFileRoute("/api/companion-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, system } = (await request.json()) as { messages: { role: string; content: string }[]; system: string };
          const last = messages[messages.length - 1]?.content ?? "";
          if (CRISIS_RX.test(last)) {
            const body = "data: " + JSON.stringify({ choices: [{ delta: { content: "What you're sharing sounds really heavy, and I want you to have real support right now. Please reach out to your Kahf therapist directly, or contact a crisis line in your country. You don't have to carry this alone." } }] }) + "\n\ndata: [DONE]\n\n";
            return new Response(body, { headers: { "Content-Type": "text/event-stream" } });
          }
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) return new Response(JSON.stringify({ error: "AI gateway not configured" }), { status: 500 });
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [{ role: "system", content: system }, ...messages],
            }),
          });
          if (!upstream.ok) {
            if (upstream.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }), { status: 429 });
            if (upstream.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in workspace settings." }), { status: 402 });
            return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500 });
          }
          return new Response(upstream.body, { headers: { "Content-Type": "text/event-stream" } });
        } catch (e) {
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500 });
        }
      },
    },
  },
});
