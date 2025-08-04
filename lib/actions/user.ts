"use server";

import { getUser } from "@/lib/db/queries";
import { User } from "@/lib/db/schema";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Function for server-side rendering
export async function getServerSideUser(): Promise<User | null> {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.error("Error fetching user for SSR:", error);
    return null;
  }
}
