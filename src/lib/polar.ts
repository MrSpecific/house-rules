import { Polar } from "@polar-sh/sdk";

if (!import.meta.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN is not set");
}

export const polar = new Polar({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN,
});
