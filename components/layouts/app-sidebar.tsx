"use client"

import * as React from "react"
import {
//   AudioWaveform,
//   BookOpen,
  Bot,
//   Command,
  // GalleryVerticalEnd,
//   Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/layouts/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import CompanyDetailsNav from "./company-details-nav"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Bot,
    },
    {
      title: "Admin",
      url: "/admin",
      icon: SquareTerminal,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-blue-900 text-white">
      <SidebarHeader>
        <CompanyDetailsNav />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
