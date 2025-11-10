import { createAuthClient } from "better-auth/react";
// import { organizationClient } from "better-auth/client/plugins";
import { authUrl } from "./env";

export const authClient = createAuthClient({
  baseURL: authUrl,
  // plugins: [organizationClient()],
});

// Polar checkout and portal functions
// These will call the server-side endpoints configured in auth.ts
export const polarCheckout = (slug: string) => {
  // This navigates to the checkout URL that Better-Auth + Polar creates
  window.location.href = `/api/auth/polar/checkout/${slug}`;
};

export const polarPortal = () => {
  // This navigates to the customer portal
  window.location.href = `/api/auth/polar/portal`;
};
