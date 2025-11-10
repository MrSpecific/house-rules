import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { polarClient } from "./polar";
import { db } from "../db";
import { authUrl, authBasePath, authOrigin, polarAccessToken } from "./env";

export const auth = betterAuth({
  baseURL: authUrl,
  basePath: authBasePath,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    reactStartCookies(),
    // Temporarily disable Polar plugin if token is not set to avoid sign-up errors
    ...(polarAccessToken
      ? [
          polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
              checkout({
                products: [
                  {
                    productId: "7165dc65-df81-4b68-8e23-dd402320c1d4", // ID of Product from Polar Dashboard
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
  trustedOrigins: authOrigin ? [authOrigin] : undefined,
});
