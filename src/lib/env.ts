/**
 * Unified environment helper that works in both Vite (import.meta.env)
 * and Node (process.env) contexts.
 */

type Env = {
  VITE_BETTER_AUTH_URL?: string;
  BETTER_AUTH_URL?: string;
};

function getEnvVar(key: keyof Env, fallback?: string): string {
  // Prefer Vite env during client/runtime builds
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const value = (import.meta.env as unknown as Env)[key];
    if (value) return value;
  }

  // Fallback to Node process.env during SSR or server functions
  if (typeof process !== "undefined" && process.env) {
    const value = process.env[key];
    if (value) return value;
  }

  if (fallback !== undefined) return fallback;

  throw new Error(`Missing required environment variable: ${key}`);
}

const DEFAULT_AUTH_URL = "http://localhost:3000/api/auth";

// Export normalized auth URL (includes base path)
export const authUrl = getEnvVar(
  "VITE_BETTER_AUTH_URL",
  process.env?.BETTER_AUTH_URL || DEFAULT_AUTH_URL
);

function parseAuthUrl(value: string) {
  try {
    return new URL(value);
  } catch (_err) {
    // Allow relative URLs by resolving against default
    return new URL(value, DEFAULT_AUTH_URL);
  }
}

const parsedAuthUrl = parseAuthUrl(authUrl);

export const authOrigin = parsedAuthUrl.origin;
export const authBasePath =
  parsedAuthUrl.pathname === "/" ? "/api/auth" : parsedAuthUrl.pathname.replace(/\/+$/, "");
