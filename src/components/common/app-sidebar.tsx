import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { CompanySwitcher } from "./company-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Permission } from "@/lib/constants/permissions";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Nosotros",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Sucursales",
          url: "/company",
          permission: Permission.VIEW_COMPANY,
        },
        {
          title: "Miembros",
          url: "/members",
          permission: Permission.VIEW_MEMBERS,
        },
        {
          title: "Servicios",
          url: "/services",
          permission: Permission.VIEW_SERVICES,
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Turnos",
          url: "/appointment",
          permission: Permission.VIEW_APPOINTMENTS,
        },
        {
          title: "Clientes",
          url: "/customers",
          permission: Permission.VIEW_CUSTOMERS,
        },
      ],
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Horarios",
          url: "/set-hours",
          permission: Permission.VIEW_WORKHOURS,
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanySwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
