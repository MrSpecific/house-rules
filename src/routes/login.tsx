import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Box, Card, Text, TextField, Button, Callout } from "@radix-ui/themes";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await authClient.signUp.email({
          email,
          password,
          name,
        });
      } else {
        await authClient.signIn.email({
          email,
          password,
        });
      }
      // Redirect to dashboard after successful auth
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      console.error("Auth error:", err);
      // Try to extract a more detailed error message
      let errorMessage = "Authentication failed";
      if (err?.message) {
        errorMessage = err.message;
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ maxWidth: "400px", margin: "2rem auto", padding: "0 1rem" }}>
      <Card>
        <Box p="6">
          <Text size="6" weight="bold" mb="4" as="div">
            {isSignUp ? "Sign Up" : "Login"}
          </Text>

          <form onSubmit={handleSubmit}>
            <Box mb="4" display="flex" direction="column" gap="4">
              {isSignUp && (
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label" htmlFor="name">
                    Name
                  </Text>
                  <TextField.Root
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    size="3"
                  />
                </Box>
              )}

              <Box>
                <Text size="2" weight="medium" mb="2" as="label" htmlFor="email">
                  Email
                </Text>
                <TextField.Root
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  size="3"
                />
              </Box>

              <Box>
                <Text size="2" weight="medium" mb="2" as="label" htmlFor="password">
                  Password
                </Text>
                <TextField.Root
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  size="3"
                />
              </Box>

              {error && (
                <Callout.Root color="red">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              <Button
                type="submit"
                disabled={loading}
                size="3"
                style={{ width: "100%" }}
              >
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
              </Button>
            </Box>
          </form>

          <Button
            variant="ghost"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ width: "100%" }}
            size="2"
          >
            {isSignUp ? "Already have an account? Login" : "Need an account? Sign up"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
