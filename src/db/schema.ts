// Re-export all Better-Auth tables
export * from "./auth-schema";

// Your application tables go here
// Example:
// import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
// import { user } from "./auth-schema";
// 
// export const household = pgTable("household", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   ownerId: text("owner_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
// });
