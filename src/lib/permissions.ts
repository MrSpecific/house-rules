export const USER_ROLES = ["user", "moderator", "administrator", "super_administrator"] as const;

export type UserRole = (typeof USER_ROLES)[number];

const ROLE_PRIORITY: Record<UserRole, number> = {
  user: 0,
  moderator: 1,
  administrator: 2,
  super_administrator: 3,
};

export function hasRequiredRole(required: UserRole, current?: UserRole | null): boolean {
  if (!current) return false;
  return ROLE_PRIORITY[current] >= ROLE_PRIORITY[required];
}

export function formatRole(role?: UserRole | null) {
  if (!role) return "user";
  return role.replace("_", " ");
}
