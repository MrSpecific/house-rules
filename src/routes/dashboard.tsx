import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Box, Flex, Text, Button, Card, Heading } from "@radix-ui/themes";

export const Route = createFileRoute("/dashboard")({
  // Protect this route - redirect to login if not authenticated
  beforeLoad: async ({ context, location }) => {
    const session = await authClient.getSession();

    if (!session.data?.user) {
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
  component: DashboardComponent,
});

function DashboardComponent() {
  const { user } = Route.useRouteContext();
  const navigate = Route.useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate({ to: "/" });
  };

  return (
    <Box style={{ maxWidth: "1024px", margin: "2rem auto", padding: "0 1rem" }}>
      <Flex justify="between" align="center" mb="6">
        <Heading size="8">Dashboard</Heading>
        <Button color="red" variant="soft" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Flex>

      <Card mb="6">
        <Box p="4">
          <Heading size="5" mb="2">Welcome, {user?.name || user?.email || 'User'}!</Heading>
          {user?.email && (
            <Text size="3" color="gray">
              {user?.email}
            </Text>
          )}
        </Box>
      </Card>

      <Card>
        <Box p="4">
          <Heading size="5" mb="3">Your Content</Heading>
          <Text size="3" color="gray">
            This is a protected route. Only authenticated users can see this.
          </Text>
        </Box>
      </Card>
    </Box>
  );
}
