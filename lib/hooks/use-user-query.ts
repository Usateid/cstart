"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/actions/user";
import { User } from "@/lib/db/schema";

export function useUserQuery(initialData?: User | null) {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    initialData,
  });
}

export function useUser(initialData?: User | null) {
  const { data: user, isLoading, error, refetch } = useUserQuery(initialData);

  return {
    user: user || null,
    isLoading,
    error,
    mutateUser: refetch,
  };
}
