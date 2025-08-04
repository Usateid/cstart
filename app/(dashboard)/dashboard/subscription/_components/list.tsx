"use client";
import { useQuery } from "@tanstack/react-query";

export default function SubscriptionList({ userId }: { userId: number }) {
  const { data: activeBundles, isLoading } = useQuery({
    queryKey: ["active-subscription", userId],
    queryFn: () =>
      fetch(`/api/subscriptions?id=${userId}`).then((res) => res.json()),
  });
  return (
    <div>
      <span>
        {isLoading ? (
          "Sto caricando i tuoi abbonamenti..."
        ) : (
          <span>{activeBundles?.length}</span>
        )}
      </span>
    </div>
  );
}
