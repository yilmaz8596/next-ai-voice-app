"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crown, Zap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (productId: string) => {
    setIsLoading(true);
    try {
      await authClient.checkout({
        products: [productId],
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Upgrade Your Plan
        </h1>
        <p className="text-muted-foreground">
          Choose the perfect plan for your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Beginner Plan */}
        <Card className="relative overflow-hidden flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <CardTitle>Beginner</CardTitle>
            </div>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <div className="text-3xl font-bold">50 Credits</div>
              <p className="text-sm text-muted-foreground mt-1">
                One-time purchase
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                50 TTS conversions
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Basic voice quality
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() =>
                handleCheckout("a9aa27ce-a3ba-46bd-b185-0d421a28dd8c")
              }
              disabled={isLoading}
            >
              Select Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative overflow-hidden border-orange-400/50 flex flex-col">
          <div className="absolute top-4 right-4">
            <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              POPULAR
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-orange-500" />
              <CardTitle>Pro</CardTitle>
            </div>
            <CardDescription>Most popular choice</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <div className="text-3xl font-bold">150 Credits</div>
              <p className="text-sm text-muted-foreground mt-1">
                One-time purchase
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                150 TTS conversions
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Premium voice quality
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600"
              onClick={() =>
                handleCheckout("d06706c3-b785-4a89-b7cb-d85620cf5d2e")
              }
              disabled={isLoading}
            >
              Select Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Elite Plan */}
        <Card className="relative overflow-hidden border-purple-400/50 flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <CardTitle>Elite</CardTitle>
            </div>
            <CardDescription>Maximum value</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <div className="text-3xl font-bold">250 Credits</div>
              <p className="text-sm text-muted-foreground mt-1">
                One-time purchase
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                250 TTS conversions
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                Best value for money
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                All premium features
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() =>
                handleCheckout("3d40a70d-cfe9-42a9-8f11-573ae2566fa9")
              }
              disabled={isLoading}
            >
              Select Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
