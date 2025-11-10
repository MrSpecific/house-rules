import { createFileRoute, redirect } from "@tanstack/react-router";
import { Box, Heading, Text, Card } from "@radix-ui/themes";
import { hasRequiredRole } from "@/lib/permissions";
import { Route as RootRoute } from "./__root";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || !hasRequiredRole("administrator", context.auth.user?.role)) {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  const { auth } = RootRoute.useRouteContext();
  return (
    <Box style={{ maxWidth: "960px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="8" mb="4">
        Admin Console
      </Heading>
      <Card>
        <Box p="5">
          <Text size="4" weight="medium">
            {auth.user?.name || auth.user?.email}
          </Text>
          <Text as="p" mt="3" size="3">
            Administrators can manage billing, monitor system health, and configure platform-level settings.
          </Text>
        </Box>
      </Card>
    </Box>
  );
}
