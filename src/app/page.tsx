import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  Scissors,
  Expand,
  Target,
  Download,
  CheckCircle2,
  Play,
} from "lucide-react";
import Link from "next/link";
import DemoSection from "@/components/demo-section";
import AnimatedCounter from "@/components/animated-counter";
import HeroAnimatedText from "@/components/hero-animated-text";
import AnimateOnView from "@/components/animate-on-view";

export default function HomePage() {
  const features = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Voice Cloning",
      description:
        "Create custom AI voices by cloning your own voice or using pre-built professional voices.",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
    {
      icon: <Expand className="h-8 w-8" />,
      title: "Natural Speech Synthesis",
      description:
        "Convert text to speech with lifelike intonation, emotion, and natural-sounding voices.",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Multiple Languages & Voices",
      description:
        "Access hundreds of voices in multiple languages with regional accents and speaking styles.",
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Generate high-quality speech in seconds. Our optimized AI infrastructure delivers results instantly.",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Voice Actor",
      content:
        "This tool has revolutionized my workflow. Voice cloning that used to take hours now takes minutes!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Podcaster",
      content:
        "Perfect for content creation. The natural speech synthesis makes my audiobooks sound professional.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      content:
        "The voice variety is incredible. I can create content in multiple languages with authentic accents.",
      rating: 5,
    },
  ];
  const pricingFeatures = [
    "Voice Cloning",
    "Natural Speech Synthesis",
    "Multiple Languages & Voices",
    "High-Quality Audio Downloads",
    "Fast Processing",
    "Cloud Storage",
  ];
  return (
    <div className="min-h-screen bg-background">
      <AnimateOnView delay={0} className="animate-nav">
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent">
                  Voxio
                </span>
              </div>
              <div className="hidden items-center space-x-8 md:flex">
                <Link
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Reviews
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/auth/sign-in">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="cursor-pointer gap-2">
                    Try Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </AnimateOnView>
      <AnimateOnView delay={60}>
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-foreground" />
                <span className="font-medium text-foreground">
                  Powered by Advanced AI
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                <HeroAnimatedText
                  before="Transform Text into"
                  highlight="Natural Speech"
                />
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Professional voice synthesis powered by artificial intelligence.
                Convert text to speech with lifelike voices, multiple languages,
                and natural intonation - all in seconds.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="cursor-pointer gap-2 px-8 py-6 text-base"
                  >
                    <Play className="h-5 w-5" />
                    Try It Free Now
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer gap-2 px-8 py-6 text-base"
                  >
                    <Play className="h-5 w-5" />
                    Listen to Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="mb-8 text-sm text-muted-foreground">
                Trusted by thousands of creators worldwide
              </p>
              <div className="grid grid-cols-2 items-center justify-center gap-6 opacity-80 sm:grid-cols-5">
                <div className="text-center">
                  <AnimatedCounter
                    target={50}
                    suffix="K+"
                    duration={1400}
                    className="text-2xl font-bold text-foreground"
                  />
                  <div className="text-xs text-muted-foreground">
                    Voices Generated
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    target={5}
                    suffix="K+"
                    duration={1200}
                    className="text-2xl font-bold text-foreground"
                  />
                  <div className="text-xs text-muted-foreground">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    target={99.9}
                    decimals={1}
                    suffix="%"
                    duration={1600}
                    className="text-2xl font-bold text-foreground"
                  />
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    target={4.8}
                    decimals={1}
                    suffix="★"
                    duration={1300}
                    className="text-2xl font-bold text-chart-1"
                  />
                  <div className="text-xs text-muted-foreground">
                    User Rating
                  </div>
                </div>
                <div className="col-span-2 text-center sm:col-span-1">
                  <AnimatedCounter
                    target={24}
                    suffix="/7"
                    duration={1000}
                    className="text-2xl font-bold text-foreground"
                  />
                  <div className="text-xs text-muted-foreground">
                    Voice Synthesis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnView>
      <AnimateOnView delay={120}>
        <DemoSection />
      </AnimateOnView>
      <AnimateOnView delay={220}>
        <section id="features" className="bg-background py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Powerful AI Voices at Your{" "}
                <span className="from-primary to-chart-5 bg-linear-to-r bg-clip-text text-transparent">
                  Fingertips
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to create natural-sounding speech with the
                power of artificial intelligence
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-border bg-card/70 backdrop-blur-sm transition-all hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div
                      className={`${feature.bgColor} mb-4 inline-flex items-center justify-center rounded-lg p-3 ${feature.color}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnView>
      <AnimateOnView delay={260}>
        <section className="bg-muted/30 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Simple. Fast. Professional.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get professional results in three simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Enter Your Text",
                  description:
                    "Type or paste your text content. We support multiple languages and handle complex formatting.",
                },
                {
                  step: "02",
                  title: "Choose Your Voice",
                  description:
                    "Select from hundreds of AI voices: clone your own voice, choose pre-built professional voices, or customize settings.",
                },
                {
                  step: "03",
                  title: "Generate & Download",
                  description:
                    "Get your natural-sounding speech in seconds. High-quality audio ready for any use case.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="mb-4 flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg">
                      {item.step}
                    </div>
                    {index < 2 && (
                      <div className="ml-4 hidden h-0.5 w-full bg-border md:block" />
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnView>
      <AnimateOnView delay={300}>
        <section id="testimonials" className="bg-background py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Loved by{" "}
                <span className="from-primary to-chart-5 bg-linear-to-r bg-clip-text text-transparent">
                  Creators
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users are saying about AI Voice Studio
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="relative border-border bg-card/70 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-1">
                      {Array.from({ length: Number(testimonial.rating) }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ),
                      )}
                    </div>
                    <p className="mb-4 text-muted-foreground italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnView>
      <AnimateOnView delay={340}>
        <section id="pricing" className="bg-muted/30 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Start Creating{" "}
                <span className="from-primary to-chart-5 bg-linear-to-r bg-clip-text text-transparent">
                  For Free
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No credit card required. Begin transforming your text into
                speech instantly.
              </p>
            </div>
            <div className="mx-auto max-w-lg">
              <Card className="relative overflow-hidden border-2 border-primary/50 bg-card/70 backdrop-blur-sm">
                <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Free to Start
                </div>
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-foreground">
                      Free Plan
                    </h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-foreground">
                        $0
                      </span>
                      <span className="ml-2 text-muted-foreground">
                        to start
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Try all features with free credits
                    </p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    {pricingFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard">
                    <Button
                      className="w-full cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      size="lg"
                    >
                      <Sparkles className="h-4 w-4" />
                      Try It Free Now
                    </Button>
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Includes 10 free credits • No credit card required
                    </p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimateOnView>
      <AnimateOnView delay={380}>
        <section className="bg-primary/10 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Transform Your Text?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of creators using AI to bring their content to
                life with natural speech
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="cursor-pointer gap-2 bg-primary text-primary-foreground px-8 py-6 text-base hover:bg-primary/90"
                  >
                    <Sparkles className="h-5 w-5" />
                    Try It Free Now
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer gap-2 border-border px-8 py-6 text-base text-foreground hover:bg-muted"
                  >
                    <Download className="h-5 w-5" />
                    Listen to Examples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnView>
      <footer className="border-t border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent">
                    AI Voice Studio
                  </span>
                </div>
                <p className="max-w-md text-muted-foreground">
                  Professional voice synthesis powered by artificial
                  intelligence. Transform your text into natural-sounding speech
                  with cutting-edge AI technology.
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Product</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#features"
                      className="transition-colors hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="transition-colors hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Support</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="mailto:support@aivoicestudio.com"
                      className="transition-colors hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="transition-colors hover:text-foreground"
                    >
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 AI Voice Studio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
