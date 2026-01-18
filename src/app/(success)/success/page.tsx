"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkout_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Replace current history entry to prevent back navigation
    window.history.replaceState(null, "", "/success");
  }, []);

  useEffect(() => {
    // Countdown timer
    if (countdown <= 0) {
      router.replace("/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

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
              <p className="text-sm text-muted-foreground pt-2">
                Redirecting to dashboard in {countdown} seconds...
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => router.replace("/dashboard")}
              className="w-full sm:w-auto"
            >
              Go to Dashboard Now
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
