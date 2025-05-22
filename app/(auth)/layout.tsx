import "../globals.css";

import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { Suspense } from "react";
import BreadcrumbNav from "@/components/layouts/breadcrump-nav";
import LogoutBtnNav from "@/components/layouts/logoutBtn-nav";
import { fetchUserRepository } from "@/repository/fetchUserRepository";
import InitializeUser from "@/app/(auth)/user-initialize";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserRepository();

  if(!user){
    redirect("/login")
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14 bg-gray-100">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                <BreadcrumbNav />
              </Suspense>
            </div>
            <div className="mr-5">
              <Suspense fallback={null}>
                <LogoutBtnNav />
              </Suspense>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 md:p-8 pt-8">
            <InitializeUser user={user}>
              {children}
              <Toaster richColors position="bottom-right" />
            </InitializeUser>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
