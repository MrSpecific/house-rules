import { authClient } from "@/lib/auth-client";

// Custom hooks for common auth operations
export function useAuth() {
  const session = authClient.useSession();
  
  return {
    user: session.data?.user || null,
    isAuthenticated: !!session.data,
    isLoading: session.isPending,
    error: session.error,
  };
}

export function useSubscription() {
  // When you have the Polar plugin fully set up
  // const subscription = authClient.polar.useSubscription();
  // return subscription;
  
  // Placeholder for now
  return {
    data: null,
    isLoading: false,
  };
}
