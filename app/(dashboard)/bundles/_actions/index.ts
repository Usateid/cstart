"use server";

import { getActiveBundles, putActiveBundle } from "@/lib/db/queries/bundle";

export default async function createBooking(id: string, userId: number) {
  // Save data inside Booking table

  console.log(id, userId);
  // Check if the user has already a bundle active

  // Save the booking information in db
  const userActiveBundles = await getActiveBundles(userId);
  if (userActiveBundles.length > 0) {
    return { success: false, error: "User already has an active bundle" };
  }

  // Save the booking information in db
  await putActiveBundle(userId, parseInt(id));

  return { success: true };
}
