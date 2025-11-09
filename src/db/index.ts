import { drizzle } from "drizzle-orm/neon-http";
import postgres from "postgres";

import * as schema from "./schema";

const db = drizzle(import.meta.env.DATABASE_URL);

export { db, schema };
