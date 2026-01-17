import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout_id?: string }>;
}) {
  const params = await searchParams;
  const checkoutId = params.checkout_id;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Success Icon */}
            <div className="rounded-full bg-green-100 dark:bg-green-950 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Payment Successful!
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Your purchase has been completed successfully. Credits have been
                added to your account.
              </p>
              {checkoutId && (
                <p className="text-xs text-muted-foreground font-mono pt-2">
                  Order ID: {checkoutId}
                </p>
              )}
            </div>

            {/* Action Button */}
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>

            {/* Additional Info */}
            <p className="text-xs text-muted-foreground">
              You can now access all features from your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
