import { createFileRoute } from "@tanstack/react-router";
import { rateLimit, getClientIP } from "@/lib/rate-limit.server";

// GET /api/geo — detect currency/gateway from request country.
// Cloudflare adds `cf-ipcountry` automatically; no external geo DB required
// (geoip-lite is a Node-only package that won't run in Workers).

export const Route = createFileRoute("/api/geo")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const ip = getClientIP(request);
        const rl = rateLimit(`geo:${ip}`, { max: 30, windowMs: 60_000 });
        if (!rl.ok) {
          return new Response("Too many requests", { status: 429 });
        }
        const country =
          request.headers.get("cf-ipcountry") ||
          request.headers.get("x-vercel-ip-country") ||
          "";
        const isIndia = country === "IN";
        return Response.json({
          country: country || "XX",
          currency: isIndia ? "INR" : "USD",
          gateway: isIndia ? "razorpay" : "stripe",
          amount: isIndia ? 1 : 50,
          displayAmount: isIndia ? "₹1" : "$0.50",
        });
      },
    },
  },
});
