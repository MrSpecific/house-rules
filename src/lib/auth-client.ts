import { createAuthClient } from "better-auth/react";
import { polar } from "@polar-sh/better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:5173",
  plugins: [
    polar(), // Polar client plugin for better-auth
    organizationClient(),
  ],
});
