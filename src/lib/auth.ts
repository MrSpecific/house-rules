import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { polarClient } from "./polar";
import { db } from "../db";
import { authUrl } from "./constants/authUrl";

export const auth = betterAuth({
  baseURL: authUrl,
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    // Temporarily disable Polar plugin if token is not set to avoid sign-up errors
    ...(import.meta.env?.VITE_POLAR_ACCESS_TOKEN || process.env?.VITE_POLAR_ACCESS_TOKEN
      ? [
          polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
              checkout({
                products: [
                  {
                    productId: "YOUR_PRODUCT_ID", // ID of Product from Polar Dashboard
                    slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                  },
                ],
                successUrl: "/success?checkout_id={CHECKOUT_ID}",
                authenticatedUsersOnly: true,
              }),
              portal(),
              usage(),
            ],
          }),
        ]
      : []),
  ],
});
