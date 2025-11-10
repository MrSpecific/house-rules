import { auth } from "@/lib/auth";
import { authOrigin } from "@/lib/env";
import { createFileRoute } from "@tanstack/react-router";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization,content-type,x-better-auth-client,x-csrf-token",
} as const;

function allowOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  if (authOrigin && origin !== authOrigin) return null;
  return origin;
}

function withCorsHeaders(request: Request, response: Response) {
  const origin = allowOrigin(request);
  if (!origin) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.append("Vary", "Origin");
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleRequest(request: Request) {
  if (request.method === "OPTIONS") {
    const origin = allowOrigin(request);
    if (!origin) {
      return new Response(null, { status: 204 });
    }
    const headers = new Headers(CORS_HEADERS);
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.append("Vary", "Origin");
    return new Response(null, { status: 204, headers });
  }

  const response = await auth.handler(request);
  return withCorsHeaders(request, response);
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => handleRequest(request),
      POST: ({ request }) => handleRequest(request),
      PUT: ({ request }) => handleRequest(request),
      PATCH: ({ request }) => handleRequest(request),
      DELETE: ({ request }) => handleRequest(request),
      OPTIONS: ({ request }) => handleRequest(request),
    },
  },
});
