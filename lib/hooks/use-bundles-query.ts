"use client";

import { useQuery } from "@tanstack/react-query";
import { Bundle } from "@/lib/db/schema";

async function fetchBundles(): Promise<Bundle[]> {
  const response = await fetch("/api/bundles");
  if (!response.ok) {
    throw new Error("Failed to fetch bundles");
  }
  return response.json();
}

export function useBundlesQuery(initialData?: Bundle[]) {
  return useQuery({
    queryKey: ["bundles"],
    queryFn: fetchBundles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    initialData,
  });
}

export function useBundles(initialData?: Bundle[]) {
  const {
    data: bundles,
    isLoading,
    error,
    refetch,
  } = useBundlesQuery(initialData);

  return {
    bundles: bundles || [],
    isLoading,
    error,
    refetchBundles: refetch,
  };
}

// Server-side function for SSR
export async function getBundlesForSSR() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/bundles`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch bundles");
  }
  return response.json();
}
