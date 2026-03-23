import type { ReactNode } from "react";
import { Providers } from "../providers";
import { Sparkles, Mic, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning={true}>
      <Providers>
        <div className="auth-page flex min-h-screen">
          {/* Left Side - Branding */}
          <div className="relative hidden overflow-hidden bg-foreground lg:flex lg:w-1/2">
            <div className="bg-grid-white/[0.1] absolute inset-0 bg-size-[30px_30px]" />
            <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
              {/* Logo */}
              <Link
                href="/"
                className="mb-12 flex cursor-pointer items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/20 backdrop-blur-sm">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <span className="text-2xl font-bold text-background">
                  Voxio
                </span>
              </Link>

              {/* Hero Content */}
              <div className="max-w-md">
                <h1 className="mb-6 text-4xl leading-tight font-bold text-background xl:text-5xl">
                  Transform Text into{" "}
                  <span className="text-primary">Natural Speech</span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-background/80">
                  Join thousands of creators using advanced AI to generate
                  realistic, natural-sounding voices in seconds.
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  {[
                    {
                      icon: Mic,
                      text: "AI Voice Cloning",
                      color: "bg-chart-5/20 border-chart-5/30 text-chart-5",
                    },
                    {
                      icon: Zap,
                      text: "Lightning Fast Processing",
                      color: "bg-chart-1/20 border-chart-1/30 text-chart-1",
                    },
                    {
                      icon: Target,
                      text: "Professional Quality Audio",
                      color: "bg-chart-3/20 border-chart-3/30 text-chart-3",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm ${feature.color}`}
                      >
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-background/90">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-background/60">
                    Voices Generated
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.5K+</div>
                  <div className="text-sm text-background/60">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">4.8★</div>
                  <div className="text-sm text-background/60">Rating</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-32 bottom-20 h-24 w-24 rounded-full bg-chart-5/10 blur-2xl" />
            <div className="absolute top-1/2 right-10 h-16 w-16 rounded-full bg-chart-3/10 blur-xl" />
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex flex-1 flex-col justify-center bg-background px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              {/* Mobile Logo */}
              <div className="mb-8 text-center lg:hidden">
                <Link
                  href="/"
                  className="inline-flex cursor-pointer items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent">
                    AI Voice Studio
                  </span>
                </Link>
              </div>

              {/* Auth Form Container */}
              <div>{children}</div>

              {/* Footer Link */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Back to{" "}
                <Link
                  href="/"
                  className="cursor-pointer font-medium text-primary transition-colors hover:text-primary/80"
                >
                  homepage
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Providers>
    </div>
  );
}
