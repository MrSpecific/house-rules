import { createFileRoute, redirect } from "@tanstack/react-router";
import { Box, Heading, Text, Card } from "@radix-ui/themes";
import { hasRequiredRole } from "@/lib/permissions";
import { Route as RootRoute } from "./__root";

export const Route = createFileRoute("/super-admin")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || !hasRequiredRole("super_administrator", context.auth.user?.role)) {
      throw redirect({ to: "/login" });
    }
  },
  component: SuperAdminPage,
});

function SuperAdminPage() {
  const { auth } = RootRoute.useRouteContext();
  return (
    <Box style={{ maxWidth: "960px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="8" mb="4">
        Super Admin HQ
      </Heading>
      <Card>
        <Box p="5">
          <Text size="4" weight="medium">
            {auth.user?.name || auth.user?.email}
          </Text>
          <Text as="p" mt="3" size="3">
            Super administrators have full access. Use this area to audit permissions and manage escalated operations.
          </Text>
        </Box>
      </Card>
    </Box>
  );
}
