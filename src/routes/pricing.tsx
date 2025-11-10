import { createFileRoute, Link } from "@tanstack/react-router";
import { polarCheckout } from "@/lib/auth-client";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Card,
  Badge,
} from "@radix-ui/themes";

export const Route = createFileRoute("/pricing")({
  component: PricingComponent,
});

function PricingComponent() {
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login first
      window.location.href = "/login?redirect=/pricing";
      return;
    }

    // This will redirect to the Polar checkout page
    // The slug "pro" matches what you defined in the polar plugin config in auth.ts
    polarCheckout("pro");
  };

  return (
    <Box style={{ maxWidth: "1024px", margin: "2rem auto", padding: "0 1rem" }}>
      <Heading size="9" align="center" mb="8">
        Pricing
      </Heading>

      <Flex gap="6" wrap="wrap" justify="center">
        {/* Free Plan */}
        <Card style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
          <Box p="6">
            <Heading size="6" mb="2">
              Free
            </Heading>
            <Flex align="baseline" gap="2" mb="4">
              <Text size="8" weight="bold">
                $0
              </Text>
              <Text size="3" color="gray">
                /month
              </Text>
            </Flex>
            <Flex
              direction="column"
              gap="2"
              mb="6"
              as="div"
              style={{ listStyle: "none", padding: 0 }}
            >
              <Text as="div" size="3">
                ✓ Basic features
              </Text>
              <Text as="div" size="3">
                ✓ Community support
              </Text>
              <Text as="div" size="3">
                ✓ Limited access
              </Text>
            </Flex>
            <Button variant="soft" disabled style={{ width: "100%" }}>
              Current Plan
            </Button>
          </Box>
        </Card>

        {/* Pro Plan */}
        <Box style={{ position: "relative" }}>
          <Card
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "400px",
              position: "relative",
            }}
          >
            <Box p="6">
              <Heading size="6" mb="2">
                Pro
              </Heading>
              <Flex align="baseline" gap="2" mb="4">
                <Text size="8" weight="bold">
                  $5
                </Text>
                <Text size="3" color="gray">
                  /month
                </Text>
              </Flex>
              <Flex
                direction="column"
                gap="2"
                mb="6"
                style={{ listStyle: "none", padding: 0 }}
              >
                <Text as="div" size="3">
                  ✓ All basic features
                </Text>
                <Text as="div" size="3">
                  ✓ Priority support
                </Text>
                <Text as="div" size="3">
                  ✓ Unlimited Rule Sets
                </Text>
                <Text as="div" size="3">
                  ✓ Unlimited access
                </Text>
              </Flex>
              <Button
                onClick={handleCheckout}
                size="3"
                style={{ width: "100%" }}
              >
                {isAuthenticated ? "Subscribe Now" : "Login to Subscribe"}
              </Button>
            </Box>
          </Card>
          <Box
            style={{
              position: "absolute",
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-background)",
            }}
          >
            <Badge color="blue" size="2">
              Popular
            </Badge>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
