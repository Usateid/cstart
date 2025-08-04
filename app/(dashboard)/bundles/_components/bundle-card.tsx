import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getDurationLabel } from "@/lib/enums";
import { Bundle, BundleDuration } from "@/lib/db/schema";

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Card title={bundle.name}>
      <p className="text-gray-600 mb-4">{bundle.description}</p>
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Attività incluse:</h4>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-gray-900">
          <span className="text-3xl font-bold">€{bundle.price}</span>
          <span className="text-gray-600">
            /{getDurationLabel(bundle.duration as BundleDuration)}
          </span>
        </div>
      </div>
    </Card>
  );
}
