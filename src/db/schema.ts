import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Re-export all Better-Auth tables
export * from "./auth-schema";
import { user } from "./auth-schema";

// Your application tables go here
// Example:
// export const household = pgTable("household", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   ownerId: text("owner_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
// });

export const rule = pgTable("rule", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  createdBy: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const game = pgTable("game", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  approved: boolean("approved").default(false).notNull(),
});
