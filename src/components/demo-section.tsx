import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-slate-200 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Live Demo
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Listen to short examples of our AI voices.
              </p>
            </div>
            <div>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
