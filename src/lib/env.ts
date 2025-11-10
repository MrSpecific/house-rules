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

// Export normalized auth URL
export const authUrl = getEnvVar(
  "VITE_BETTER_AUTH_URL",
  process.env?.BETTER_AUTH_URL || "http://localhost:5173"
);
