import { createFileRoute, redirect } from "@tanstack/react-router";
import { Box, Heading, Text, Card } from "@radix-ui/themes";
import { hasRequiredRole } from "@/lib/permissions";
import { Route as RootRoute } from "./__root";

export const Route = createFileRoute("/moderator")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || !hasRequiredRole("moderator", context.auth.user?.role)) {
      throw redirect({ to: "/login" });
    }
  },
  component: ModeratorPage,
});

function ModeratorPage() {
  const { auth } = RootRoute.useRouteContext();
  return (
    <Box style={{ maxWidth: "960px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="8" mb="4">
        Moderator Tools
      </Heading>
      <Card>
        <Box p="5">
          <Text size="4" weight="medium">
            Welcome back, {auth.user?.name || auth.user?.email}
          </Text>
          <Text as="p" mt="3" size="3">
            Use this area to review community submissions, flag issues, and keep House Rules running smoothly.
          </Text>
        </Box>
      </Card>
    </Box>
  );
}
