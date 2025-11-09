// Example usage in your React components

import { authClient, polarCheckout, polarPortal } from "@/lib/auth-client";

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

// Redirect to checkout (navigates to /api/auth/polar/checkout/pro)
polarCheckout("pro");

// Open customer portal (navigates to /api/auth/polar/portal)
polarPortal();
