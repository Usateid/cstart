import { db } from "@/lib/db/drizzle";
import { activeBundles, bundles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getBundles() {
  return await db.select().from(bundles);
}

// Get the active bundle of a user
async function getActiveBundles(userId: number) {
  return await db
    .select()
    .from(activeBundles)
    .where(eq(activeBundles.userId, userId));
}

async function putActiveBundle(userId: number, bundleId: number) {
  return await db.insert(activeBundles).values({
    userId,
    bundleId,
  });
}
export { getBundles, getActiveBundles, putActiveBundle };
