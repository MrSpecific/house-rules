import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// Re-export all Better-Auth tables
export * from "./auth-schema";
import { user } from "./auth-schema";

// Subscription tracking
export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(), // Polar subscription ID
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // active, canceled, past_due, etc.
  productId: text("product_id").notNull(), // Polar product ID
  priceId: text("price_id").notNull(), // Polar price ID
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

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
