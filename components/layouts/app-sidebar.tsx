"use client"

import * as React from "react"
import {
//   AudioWaveform,
//   BookOpen,
  Bot,
//   Command,
  GalleryVerticalEnd,
//   Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/layouts/nav-main"
import { TeamSwitcher } from "@/components/layouts/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Auth Syatem",
      logo: GalleryVerticalEnd,
      plan: "Authentication",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Bot,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-blue-900 text-white">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
