import * as React from "react";
import {
  BookOpen,
  BookPlus,
  Bot,
  Building,
  CalendarCheck,
  CalendarDays,
  LayoutDashboard,
  Settings2,
  SquareTerminal,
  SquareUser,
  Users,
} from "lucide-react";
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
          icon: LayoutDashboard,
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
          icon: Building,
        },
        {
          title: "Miembros",
          url: "/members",
          permission: Permission.VIEW_MEMBERS,
          icon: Users,
        },
        {
          title: "Servicios",
          url: "/services",
          permission: Permission.VIEW_SERVICES,
          icon: BookPlus,
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
          icon: CalendarCheck,
        },
        {
          title: "Clientes",
          url: "/customers",
          permission: Permission.VIEW_CUSTOMERS,
          icon: SquareUser,
        },
        {
          title: "Calendario",
          url: "/calendar",
          permission: Permission.VIEW_APPOINTMENTS,
          icon: CalendarDays,
        },
      ],
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Horarios",
          url: "/set-hours",
          permission: Permission.VIEW_WORKHOURS,
        },
        {
          title: "Subscripcion",
          url: "/payments",
          permission: Permission.VIEW_PAYMENTS,
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
