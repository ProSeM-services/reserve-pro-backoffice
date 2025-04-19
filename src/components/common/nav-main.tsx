import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { Permission } from "@/lib/constants/permissions";
import { hasPermission } from "@/lib/auth/has-permission";
import useSession from "@/hooks/useSession";
import AuthorizationWrapper from "../auth/authorization-wrapper";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      permission?: Permission;
    }[];
  }[];
}) {
  const { member } = useSession();

  const validatePermission = (subItem: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      permission?: Permission;
    }[];
  }) => {
    const filteredItems = subItem.items
      ? subItem.items.filter((item) => {
          if (!item.permission || !member) return true;
          return hasPermission(member, item.permission);
        })
      : [];

    return filteredItems?.length > 0;
  };

  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(
          (item) =>
            validatePermission(item) && (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <section className="pl-4">
                      {item.items?.map((subItem) =>
                        subItem.permission ? (
                          <AuthorizationWrapper permission={subItem.permission}>
                            <div key={subItem.title}>
                              <div>
                                <Link
                                  to={subItem.url}
                                  className={`flex max-sm:flex-col max-sm:justify-center text-sm border-blue-500  px-2  ${
                                    location.pathname === subItem.url
                                      ? "sm:border-l-4 max-sm:border-t-4"
                                      : ""
                                  }  items-center h-12   max-sm:h-full transition-all duration-200 ${
                                    location.pathname === subItem.url
                                      ? "text-primary bg-background/75 "
                                      : " text-primary/50"
                                  } $`}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </div>
                            </div>
                          </AuthorizationWrapper>
                        ) : (
                          <div key={subItem.title}>
                            <div>
                              <Link
                                to={subItem.url}
                                className={`flex max-sm:flex-col max-sm:justify-center text-md border-blue-500  items-center h-12   max-sm:h-full transition-all duration-200 px-2 ${
                                  location.pathname === subItem.url
                                    ? "sm:border-l-4 max-sm:border-t-4"
                                    : ""
                                }  ${
                                  location.pathname === subItem.url
                                    ? "text-primary bg-background/75 "
                                    : " text-primary/50"
                                } $`}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
