import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Flex, Text, Heading, Button, Card } from "@radix-ui/themes";

type SuccessSearch = {
  checkout_id?: string;
};

export const Route = createFileRoute("/success")({
  validateSearch: (search: Record<string, unknown>): SuccessSearch => {
    return {
      checkout_id: search.checkout_id as string | undefined,
    };
  },
  component: SuccessComponent,
});

function SuccessComponent() {
  const { checkout_id } = Route.useSearch();

  return (
    <Box style={{ maxWidth: "600px", margin: "4rem auto", padding: "0 1rem" }}>
      <Card>
        <Box p="8" style={{ textAlign: "center" }}>
          <Text size="9" mb="4" as="div">🎉</Text>
          <Heading size="8" mb="3">Welcome to Pro!</Heading>
          <Text size="4" color="gray" mb="6">
            Your subscription is now active.
          </Text>

          {checkout_id && (
            <Text size="2" color="gray" mb="6" as="div">
              Checkout ID: {checkout_id}
            </Text>
          )}

          <Flex gap="4" justify="center" wrap="wrap">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button size="3">Go to Dashboard</Button>
            </Link>
            <Link to="/premium" style={{ textDecoration: "none" }}>
              <Button size="3" color="purple">Explore Premium Features</Button>
            </Link>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
}
