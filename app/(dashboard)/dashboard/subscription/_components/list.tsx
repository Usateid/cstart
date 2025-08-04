"use client";
import { useState, useEffect } from "react";

export default function SubscriptionList({ userId }: { userId: number }) {
  const [activeBundles, setActiveBundles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`/api/subscriptions?id=${userId}`);
        const data = await response.json();
        setActiveBundles(data);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

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
