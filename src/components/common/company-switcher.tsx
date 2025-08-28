import * as React from "react";
import { BriefcaseBusiness, ChevronsUpDown, GitBranch } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import LoaderWrapper from "./loader-wrapper";
import { useToast } from "../ui/use-toast";
import { ICompany } from "@/interfaces";
import useSession from "@/hooks/useSession";
import { setCrossMainCompany } from "@/store/feature/main/mainSlice";
import CompanyDetailCell from "@/pages/appointments/components/table/company-detail-cell";
export function CompanySwitcher() {
  const { isMobile } = useSidebar();
  const { member } = useSession();
  const { inmutablesCompanies, loading } = useAppSelector((s) => s.company);
  const { enterprise } = useAppSelector((s) => s.enterprise);
  const [activeTeam, setActiveTeam] = React.useState(enterprise?.name || "");
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleSelectCompany = (company: ICompany | string) => {
    if (typeof company === "string") {
      setActiveTeam(enterprise?.name);
      dispatch(setCrossMainCompany("all"));
      toast({
        title: "Atencion",
        description: `Los datos de la aplicación estarán relacionades a toda la empresa`,
      });
      return;
    }
    dispatch(setCrossMainCompany(company.id));
    setActiveTeam(company.name);
    toast({
      title: "Atencion",
      description: `Los datos de la aplicación estarán relacionades a la sucursal ${company.name}`,
    });
  };

  if (member.role === "BASIC" && member.CompanyId) {
    return <CompanyDetailCell companyId={member.CompanyId} />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate  text-xs">{activeTeam}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <LoaderWrapper loading={loading} type="company">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Negocio
              </DropdownMenuLabel>
              <DropdownMenuItem
                key={"todas"}
                onClick={() => handleSelectCompany(enterprise?.name || "")}
                className="gap-2 p-2     cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <BriefcaseBusiness className="size-4 shrink-0" />
                </div>
                {enterprise?.name}
                <DropdownMenuShortcut>Negocio</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Sucursales
              </DropdownMenuLabel>
              {inmutablesCompanies.map((option, index) => (
                <DropdownMenuItem
                  key={option.name}
                  onClick={() => handleSelectCompany(option)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <GitBranch className="size-4 shrink-0" />
                  </div>
                  {option.name}
                  <DropdownMenuShortcut>
                    sucursal {index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </LoaderWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
