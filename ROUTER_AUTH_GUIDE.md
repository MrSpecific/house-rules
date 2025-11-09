# TanStack Router + Better-Auth Integration Guide

## Route Structure

### Public Routes
- `/` - Home page (shows auth status)
- `/login` - Login/Sign up page
- `/pricing` - Pricing page with Polar checkout

### Protected Routes (require authentication)
- `/dashboard` - User dashboard
- `/premium` - Premium content (requires active subscription)
- `/success` - Checkout success page

## Auth Patterns

### 1. Protecting a Route (Authentication Required)
```tsx
export const Route = createFileRoute("/protected")({
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    
    if (!session.data) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    
    return { user: session.data.user };
  },
  component: ProtectedComponent,
});
```

### 2. Protecting a Route (Subscription Required)
```tsx
export const Route = createFileRoute("/premium")({
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    
    if (!session.data) {
      throw redirect({ to: "/login" });
    }
    
    const hasSubscription = await hasActiveSubscription(session.data.user.id);
    if (!hasSubscription) {
      throw redirect({ to: "/pricing" });
    }
    
    return { user: session.data.user };
  },
  component: PremiumComponent,
});
```

### 3. Using Auth in Components
```tsx
// Option A: Use the hook
import { useAuth } from "@/lib/hooks/use-auth";

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;
  
  return <div>Hello {user.name}</div>;
}

// Option B: Use authClient directly
import { authClient } from "@/lib/auth-client";

function MyComponent() {
  const { data: session } = authClient.useSession();
  // ...
}
```

### 4. Accessing User in Protected Routes
```tsx
function ProtectedComponent() {
  const { user } = Route.useRouteContext();
  return <div>Hello {user.name}</div>;
}
```

## Key Files

- `src/lib/auth.ts` - Server-side Better-Auth config
- `src/lib/auth-client.ts` - Client-side auth client
- `src/lib/hooks/use-auth.ts` - Reusable auth hooks
- `src/routes/__root.tsx` - Root layout with navigation
- `src/routes/login.tsx` - Login/signup page
- `src/routes/dashboard.tsx` - Protected dashboard
- `src/routes/premium.tsx` - Subscription-protected content
- `src/routes/pricing.tsx` - Pricing with Polar checkout
- `src/routes/success.tsx` - Checkout success page

## Common Operations

### Sign Up
```tsx
await authClient.signUp.email({ email, password, name });
```

### Sign In
```tsx
await authClient.signIn.email({ email, password });
```

### Sign Out
```tsx
await authClient.signOut();
```

### Checkout
```tsx
authClient.polar.checkout({ slug: "pro" });
```

### Open Customer Portal
```tsx
authClient.polar.portal();
```
