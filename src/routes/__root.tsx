import * as React from 'react'
import { Outlet, createRootRoute, Link, useMatchRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Box, Flex, Text, Button, Separator } from '@radix-ui/themes'

// Define the auth context shape
type AuthContext = {
  isAuthenticated: boolean
  user: any | null
  isLoading: boolean
}

export const Route = createRootRoute({
  component: RootComponent,
  // Make auth available to all child routes via context
  beforeLoad: async () => {
    const session = await authClient.getSession()
    return {
      auth: {
        isAuthenticated: !!session.data,
        user: session.data?.user || null,
        isLoading: false,
      } as AuthContext,
    }
  },
})

function RootComponent() {
  const { data: session } = authClient.useSession();
  const matchRoute = useMatchRoute();

  const isDashboardActive = matchRoute({ to: '/dashboard' });
  const isPremiumActive = matchRoute({ to: '/premium' });
  const isPricingActive = matchRoute({ to: '/pricing' });

  return (
    <Box>
      <Box asChild style={{ borderBottom: '1px solid var(--gray-6)' }}>
        <nav>
          <Flex
            justify="between"
            align="center"
            px="6"
            py="4"
            style={{ maxWidth: '1280px', margin: '0 auto' }}
          >
            <Flex gap="6" align="center">
              <Link to="/">
                <Text size="5" weight="bold" style={{ textDecoration: 'none' }}>
                  House Rules
                </Text>
              </Link>
              {session?.user && (
                <>
                  <Link
                    to="/dashboard"
                    style={{ textDecoration: 'none' }}
                  >
                    <Text
                      size="3"
                      weight={isDashboardActive ? "medium" : "regular"}
                      style={{
                        color: isDashboardActive ? 'var(--accent-11)' : 'var(--gray-11)',
                      }}
                    >
                      Dashboard
                    </Text>
                  </Link>
                  <Link
                    to="/premium"
                    style={{ textDecoration: 'none' }}
                  >
                    <Text
                      size="3"
                      weight={isPremiumActive ? "medium" : "regular"}
                      style={{
                        color: isPremiumActive ? 'var(--accent-11)' : 'var(--gray-11)',
                      }}
                    >
                      Premium
                    </Text>
                  </Link>
                </>
              )}
              <Link
                to="/pricing"
                style={{ textDecoration: 'none' }}
              >
                <Text
                  size="3"
                  weight={isPricingActive ? "medium" : "regular"}
                  style={{
                    color: isPricingActive ? 'var(--accent-11)' : 'var(--gray-11)',
                  }}
                >
                  Pricing
                </Text>
              </Link>
            </Flex>

            <Flex align="center" gap="4">
              {session?.user ? (
                <Text size="2" style={{ color: 'var(--gray-11)' }}>
                  {session.user.name || session.user.email}
                </Text>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
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
  )
}
