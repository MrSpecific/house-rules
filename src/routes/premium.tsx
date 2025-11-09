import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Box, Text, Heading, Card } from "@radix-ui/themes";

export const Route = createFileRoute("/premium")({
  // Protect this route - require authentication
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      user: session.data.user,
    };
  },
  component: PremiumComponent,
});

function PremiumComponent() {
  const { user } = Route.useRouteContext();

  // TODO: Implement subscription check via API endpoint
  // For now, this route is accessible to all authenticated users
  // You can add an API endpoint at /api/auth/polar/subscription that uses hasActiveSubscription

  return (
    <Box style={{ maxWidth: "1024px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="8" mb="6">Premium Content</Heading>

      <Card mb="6" style={{
        background: "linear-gradient(135deg, var(--purple-9) 0%, var(--pink-9) 100%)",
        color: "white"
      }}>
        <Box p="6">
          <Heading size="6" mb="2" style={{ color: "white" }}>
            Welcome to Premium, {user.name}! 🎉
          </Heading>
          <Text size="4" style={{ color: "white" }}>
            You have access to all premium features.
          </Text>
        </Box>
      </Card>

      <Card>
        <Box p="6">
          <Heading size="6" mb="4">Premium Features</Heading>
          <Box as="ul" style={{ listStyle: "none", padding: 0 }}>
            <Text as="li" size="3" mb="2" display="block">✓ Unlimited access</Text>
            <Text as="li" size="3" mb="2" display="block">✓ Priority support</Text>
            <Text as="li" size="3" mb="2" display="block">✓ Advanced analytics</Text>
            <Text as="li" size="3" mb="2" display="block">✓ Custom branding</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
