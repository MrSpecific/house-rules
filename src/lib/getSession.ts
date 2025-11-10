import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import type { UserRole } from "./permissions";

type SessionResponse = {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: UserRole | null;
  } | null;
};

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({
      headers,
    });

    return session as SessionResponse;
  }
);
