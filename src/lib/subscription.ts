import { db } from "@/db";
import { subscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserSubscription(userId: string) {
  const [userSubscription] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .limit(1);

  return userSubscription;
}

export async function hasActiveSubscription(userId: string) {
  const userSubscription = await getUserSubscription(userId);
  
  if (!userSubscription) return false;
  
  const now = new Date();
  const isActive = 
    userSubscription.status === "active" &&
    userSubscription.currentPeriodEnd > now;
  
  return isActive;
}
