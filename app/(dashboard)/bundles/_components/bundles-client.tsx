"use client";

import { useBundles } from "@/lib/hooks/use-bundles-query";
import { getDurationLabel } from "@/lib/enums";
import { BundleDuration, Bundle } from "@/lib/db/schema";
import { Card } from "@/components/ui/card";
import DialogBooking from "./dialog";

interface BundlesClientProps {
  initialBundles: Bundle[];
}

export default function BundlesClient({ initialBundles }: BundlesClientProps) {
  const { bundles, isLoading, error, refetchBundles } =
    useBundles(initialBundles);

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-600 mb-4">
          Errore nel caricamento dei pacchetti
        </p>
        <button
          onClick={() => refetchBundles()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Riprova
        </button>
      </div>
    );
  }

  if (isLoading && bundles.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-600">Caricamento pacchetti...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {bundles.map((bundle) => (
        <Card key={bundle.id} title={bundle.name}>
          <p className="text-gray-600 mb-4">{bundle.description}</p>
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Attività incluse:
            </h4>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-gray-900">
              <span className="text-3xl font-bold">€{bundle.price}</span>
              <span className="text-gray-600">
                /{getDurationLabel(bundle.duration as BundleDuration)}
              </span>
            </div>
            <DialogBooking bundle={bundle} />
          </div>
        </Card>
      ))}
    </div>
  );
}
