"use client";
import { useUserContext } from "@/lib/contexts/user-context";
import { use } from "react";
import SubscriptionList from "./list";
export default function SubscriptionPage() {
  const { userPromise } = useUserContext();
  const user = use(userPromise);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>Active Subscriptions</h2>
      <SubscriptionList userId={user.id} />
    </div>
  );
}
