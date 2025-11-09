import { Polar } from "@polar-sh/sdk";

if (!import.meta.env.VITE_POLAR_ACCESS_TOKEN) {
  throw new Error("VITE_POLAR_ACCESS_TOKEN is not set");
}

export const polarClient = new Polar({
  accessToken: import.meta.env.VITE_POLAR_ACCESS_TOKEN,
  // Use 'sandbox' if you're using the Polar Sandbox environment
  // Use 'production' for production
  server: "sandbox", // Change to "production" when ready
});
