import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or } from "drizzle-orm";
import postgres from "postgres";
import "dotenv/config";

import * as schema from "../database/schema";

export const tables = schema;

const connectionString = process.env.DATABASE_URL!;

const queryClient = postgres(connectionString, { prepare: false });

export function useDrizzle() {
  return drizzle(queryClient, { schema });
}
