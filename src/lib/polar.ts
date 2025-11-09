import { Polar } from "@polar-sh/sdk";

let _polarClient: Polar | null = null;

function getPolarClient(): Polar {
  if (!_polarClient) {
    const token = import.meta.env?.VITE_POLAR_ACCESS_TOKEN || process.env?.VITE_POLAR_ACCESS_TOKEN;
    if (!token) {
      throw new Error("VITE_POLAR_ACCESS_TOKEN is not set");
    }
    _polarClient = new Polar({
      accessToken: token,
      // Use 'sandbox' if you're using the Polar Sandbox environment
      // Use 'production' for production
      server: "sandbox", // Change to "production" when ready
    });
  }
  return _polarClient;
}

export const polarClient = new Proxy({} as Polar, {
  get(_target, prop) {
    return getPolarClient()[prop as keyof Polar];
  },
});
