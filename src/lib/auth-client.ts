import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:5173",
  plugins: [
    organizationClient(),
  ],
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
