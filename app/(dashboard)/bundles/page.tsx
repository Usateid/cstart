import { getBundles } from "@/lib/db/queries/bundle";
import { getDurationLabel } from "@/lib/enums";
import { BundleDuration } from "@/lib/db/schema";
import { Card } from "@/components/ui/card";
import DialogBooking from "./_components/dialog";

// This function runs at build time and generates static props
export async function generateStaticParams() {
  // This ensures the page is statically generated
  return [];
}

export default async function BundlesPage() {
  // Fetch bundles at build time
  const bundles = await getBundles();

  return (
    <div className="container mx-auto">
      <span className="text-4xl font-bold">
        Qui puoi prenotare un abbonamento
      </span>

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
    </div>
  );
}
