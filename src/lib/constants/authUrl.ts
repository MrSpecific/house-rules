const importMeta =
  typeof import.meta !== "undefined"
    ? (import.meta as unknown as { env: { VITE_BETTER_AUTH_URL?: string } })
    : { env: {} };

const processEnv =
  typeof process !== "undefined"
    ? process
    : { env: { BETTER_AUTH_URL: undefined } };

export const authUrl =
  importMeta?.env?.VITE_BETTER_AUTH_URL ||
  processEnv?.env?.BETTER_AUTH_URL ||
  "http://localhost:5173";

export default authUrl;
