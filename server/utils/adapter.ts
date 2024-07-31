import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "../database/schema";

const db = useDrizzle();

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;
