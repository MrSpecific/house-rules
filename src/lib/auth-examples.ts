// Example usage in your React components

import { authClient } from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await authClient.signOut();

// Get session
const { data: session } = authClient.useSession();

// Check if user has active subscription (from Polar plugin)
const { data: subscription } = authClient.polar.useSubscription();

// Redirect to checkout
authClient.polar.checkout({
  slug: "pro", // The slug you defined in auth.ts
});

// Open customer portal
authClient.polar.portal();
