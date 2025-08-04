import { createQueryClient } from "@/lib/providers/query-provider";
import { getBundlesForSSR } from "@/lib/hooks/use-bundles-query";

export async function prefetchBundles() {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["bundles"],
    queryFn: getBundlesForSSR,
  });

  return queryClient;
}

export async function getBundlesSSR() {
  const queryClient = createQueryClient();

  try {
    const bundles = await queryClient.fetchQuery({
      queryKey: ["bundles"],
      queryFn: getBundlesForSSR,
    });

    return {
      bundles,
      queryClient,
    };
  } catch (error) {
    console.error("Error fetching bundles for SSR:", error);
    return {
      bundles: [],
      queryClient,
    };
  }
}
