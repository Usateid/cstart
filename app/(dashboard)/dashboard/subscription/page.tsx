import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActiveSubscriptions from "./_components/active";
import { Suspense } from "react";

export default function SubscriptionPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[88px]">
          <Suspense fallback={<div>Loading...</div>}>
            <ActiveSubscriptions />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
