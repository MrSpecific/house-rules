import { createAuthClient } from "better-auth/react";
// import { organizationClient } from "better-auth/client/plugins";
import { authUrl, buildAuthEndpoint } from "./env";

export const authClient = createAuthClient({
  baseURL: authUrl,
  // plugins: [organizationClient()],
});

// Polar checkout and portal functions
// These will call the server-side endpoints configured in auth.ts
export const polarCheckout = (slug: string) => {
  window.location.href = buildAuthEndpoint(`/polar/checkout/${slug}`);
};

export const polarPortal = () => {
  window.location.href = buildAuthEndpoint("/polar/portal");
};
