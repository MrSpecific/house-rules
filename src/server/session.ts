// src/server/session.ts
import { authUrl } from "@/lib/env";

export type ServerUser = { name?: string | null; email?: string | null };

export type ServerSession =
  | { isAuthenticated: false; user: null }
  | { isAuthenticated: true; user: ServerUser };

/**
 * Fetch session from Better-Auth using the incoming request cookies.
 * Assumes Better-Auth exposes a session endpoint (commonly /api/auth/session).
 * If your endpoint differs, adjust SESSION_PATH below.
 */
const SESSION_PATHS = [
  "/api/auth/session",
  "/auth/session",
  "/api/session",
] as const;

async function tryFetchSession(sessionUrl: string, cookie: string | null) {
  const res = await fetch(sessionUrl, {
    method: "GET",
    headers: {
      ...(cookie ? { cookie } : {}),
      accept: "application/json",
    },
  });
  if (!res.ok) return null;
  try {
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

type BetterAuthResponse = {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

export async function getSessionOnServer(
  request: Request
): Promise<ServerSession> {
  try {
    const cookie = request.headers.get("cookie");
    const base = authUrl.replace(/\/+$/, "");
    let responseData: BetterAuthResponse | null = null;

    for (const path of SESSION_PATHS) {
      const url = `${base}${path}`;
      const data = await tryFetchSession(url, cookie);
      if (data && typeof data === "object") {
        responseData = data as BetterAuthResponse;
        break;
      }
    }

    const user: ServerUser | null =
      responseData?.user && (responseData.user.name || responseData.user.email)
        ? {
            name: responseData.user.name ?? null,
            email: responseData.user.email ?? null,
          }
        : null;

    if (user) {
      return { isAuthenticated: true, user };
    }

    return { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}
