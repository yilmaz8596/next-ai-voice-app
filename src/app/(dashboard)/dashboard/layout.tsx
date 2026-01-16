import "../../globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import BreadcrumbPageClient from "@/components/sidebar/breadcrumb-page-client";
import { Metadata } from "next";
import AppSidebar from "@/components/sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "Voxio",
  description: "AI Voice Application",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning={true} className="flex h-screen w-screen">
      <Providers>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex h-screen flex-col">
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur">
              <div className="flex shrink-0 grow items-center gap-3">
                <SidebarTrigger className="hover:bg-muted -ml-1 h-8 w-8 transition-colors" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-6 data-[orientation=vertical]:h-6"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPageClient />
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="from-background to-muted/20 flex-1 overflow-y-auto bg-gradient-to-br p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </Providers>
    </div>
  );
}
