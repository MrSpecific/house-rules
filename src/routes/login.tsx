import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Box, Card, Text, TextField, Button, Callout } from "@radix-ui/themes";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

const MIN_PASSWORD_LENGTH = 8;

type AuthErrorShape = {
  message: string;
  code?: string | null;
};

function parseAuthError(error: unknown): AuthErrorShape {
  const err = error as Record<string, any> | undefined;
  const data = err?.data ?? err?.response?.data;
  const code = data?.code ?? err?.code ?? null;
  let message =
    data?.message ??
    err?.message ??
    (typeof error === "string" ? error : "Authentication failed");

  if (code === "PASSWORD_TOO_SHORT") {
    message = `Password is too short. Please use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return { message, code };
}

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorCode(null);
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
      const { message, code } = parseAuthError(err);
      setError(message);
      setErrorCode(code ?? null);
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
                {isSignUp && (
                  <Text
                    size="1"
                    mt="1"
                    as="p"
                    color={errorCode === "PASSWORD_TOO_SHORT" ? "tomato" : "gray"}
                  >
                    Use at least {MIN_PASSWORD_LENGTH} characters to create a strong password.
                  </Text>
                )}
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
