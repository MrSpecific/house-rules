import { createFileRoute, Link } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Box, Flex, Text, Heading, Button, Card } from "@radix-ui/themes";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

  return (
    <Box style={{ maxWidth: "1024px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="9" mb="6">Welcome to House Rules</Heading>

      <Card mb="6">
        <Box p="6">
          {session?.user ? (
            <Flex direction="column" gap="4">
              <Text size="4">
                Logged in as: <Text weight="bold">{session.user.name || session.user.email}</Text>
              </Text>
              <Flex gap="3">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <Button size="3">Go to Dashboard</Button>
                </Link>
              </Flex>
            </Flex>
          ) : (
            <Flex gap="3">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button size="3">Login</Button>
              </Link>
            </Flex>
          )}
        </Box>
      </Card>

      <Card>
        <Box p="6">
          <Heading size="6" mb="4">Features</Heading>
          <Flex direction="column" gap="2" as="ul" style={{ listStyle: "none", padding: 0 }}>
            <Text as="li" size="3">✓ Authentication with Better-Auth</Text>
            <Text as="li" size="3">✓ Protected routes with TanStack Router</Text>
            <Text as="li" size="3">✓ Payments with Polar.sh</Text>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
}
