import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";

async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1);
}

export { getUserByEmail };
