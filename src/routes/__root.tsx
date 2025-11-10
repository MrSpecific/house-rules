import * as React from "react";
import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useMatchRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Box, Flex, Text, Button } from "@radix-ui/themes";

// Minimal shape used in UI; extend later if needed
type UserInfo = { name?: string | null; email?: string | null };

// Define the auth context shape available to child routes
type AuthContext = {
  isAuthenticated: boolean;
  user: UserInfo | null;
  isLoading: boolean;
};

// Context returned by the root route (available to all children)
export type RootContext = { auth: AuthContext };

export const Route = createRootRouteWithContext<RootContext>()({
  // Document head (no index.html in Start)
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    title: "House Rules",
  }),

  // Make auth available to all child routes via context (SSR + CSR)
  // NOTE: This runs on the server during SSR and on the client during navigation.
  beforeLoad: async () => {
    // TODO: hook up a server-safe session lookup (e.g., server function or API route)
    const ctx: AuthContext = {
      isAuthenticated: false,
      user: null,
      isLoading: false,
    };
    return { auth: ctx };
  },

  component: RootDocument,
});

function RootDocument() {
  // Use route context (SSR-safe) instead of a client-only hook
  const { auth } = Route.useRouteContext();

  const matchRoute = useMatchRoute();
  const isDashboardActive = matchRoute({ to: "/dashboard" });
  const isPremiumActive = matchRoute({ to: "/premium" });
  const isPricingActive = matchRoute({ to: "/pricing" });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Box>
          <Box asChild style={{ borderBottom: "1px solid var(--gray-6)" }}>
            <nav>
              <Flex
                justify="between"
                align="center"
                px="6"
                py="4"
                style={{ maxWidth: "1280px", margin: "0 auto" }}
              >
                <Flex gap="6" align="center">
                  <Link to="/">
                    <Text
                      size="5"
                      weight="bold"
                      style={{ textDecoration: "none" }}
                    >
                      House Rules
                    </Text>
                  </Link>

                  {auth.isAuthenticated && (
                    <>
                      <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        <Text
                          size="3"
                          weight={isDashboardActive ? "medium" : "regular"}
                          style={{
                            color: isDashboardActive
                              ? "var(--accent-11)"
                              : "var(--gray-11)",
                          }}
                        >
                          Dashboard
                        </Text>
                      </Link>
                      <Link to="/premium" style={{ textDecoration: "none" }}>
                        <Text
                          size="3"
                          weight={isPremiumActive ? "medium" : "regular"}
                          style={{
                            color: isPremiumActive
                              ? "var(--accent-11)"
                              : "var(--gray-11)",
                          }}
                        >
                          Premium
                        </Text>
                      </Link>
                    </>
                  )}

                  <Link to="/pricing" style={{ textDecoration: "none" }}>
                    <Text
                      size="3"
                      weight={isPricingActive ? "medium" : "regular"}
                      style={{
                        color: isPricingActive
                          ? "var(--accent-11)"
                          : "var(--gray-11)",
                      }}
                    >
                      Pricing
                    </Text>
                  </Link>
                </Flex>

                <Flex align="center" gap="4">
                  {auth.isAuthenticated ? (
                    <Text size="2" style={{ color: "var(--gray-11)" }}>
                      {auth.user?.name || auth.user?.email}
                    </Text>
                  ) : (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Button>Login</Button>
                    </Link>
                  )}
                </Flex>
              </Flex>
            </nav>
          </Box>

          <Box asChild>
            <main>
              <Outlet />
            </main>
          </Box>
        </Box>
        <Scripts />
      </body>
    </html>
  );
}
