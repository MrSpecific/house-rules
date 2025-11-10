import { Polar } from "@polar-sh/sdk";
import { polarAccessToken, polarEnvironment } from "./env";

let _polarClient: Polar | null = null;

function getPolarClient(): Polar {
  if (!_polarClient) {
    const token = polarAccessToken;
    if (!token) {
      throw new Error("POLAR access token is not set. Provide VITE_POLAR_ACCESS_TOKEN or POLAR_ACCESS_TOKEN.");
    }
    _polarClient = new Polar({
      accessToken: token,
      server: polarEnvironment,
    });
  }
  return _polarClient;
}

export const polarClient = new Proxy({} as Polar, {
  get(_target, prop) {
    return getPolarClient()[prop as keyof Polar];
  },
});
