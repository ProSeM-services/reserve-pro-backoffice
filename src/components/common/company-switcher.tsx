import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

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

import { AudioWaveform } from "lucide-react";
import LoaderWrapper from "./loader-wrapper";
import { useToast } from "../ui/use-toast";
import { ICompany } from "@/interfaces";
import useSession from "@/hooks/useSession";
import { setCrossMainCompany } from "@/store/feature/main/mainSlice";
export function CompanySwitcher() {
  const { isMobile } = useSidebar();
  const { member } = useSession();
  const { inmutablesCompanies, loading } = useAppSelector((s) => s.company);
  const [activeTeam, setActiveTeam] = React.useState(member?.companyName);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleSelectCompany = (company: ICompany | string) => {
    if (typeof company === "string") {
      setActiveTeam(member?.companyName);
      return;
    }
    dispatch(setCrossMainCompany(company.id));
    setActiveTeam(company.name);
    toast({
      title: "Atencion",
      description: `Los datos de la aplicación serán relacionades a la sucursal ${company.name}`,
    });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <AudioWaveform className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam}</span>
                <span className="truncate text-xs">Reserve Pro</span>
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
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Sucursales
            </DropdownMenuLabel>
            <LoaderWrapper loading={loading} type="company">
              <DropdownMenuItem
                key={"todas"}
                onClick={() => handleSelectCompany(member?.companyName)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <AudioWaveform className="size-4 shrink-0" />
                </div>
                {member?.companyName}
                <DropdownMenuShortcut>⌘{0}</DropdownMenuShortcut>
              </DropdownMenuItem>
              {inmutablesCompanies.map((option, index) => (
                <DropdownMenuItem
                  key={option.name}
                  onClick={() => handleSelectCompany(option)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <AudioWaveform className="size-4 shrink-0" />
                  </div>
                  {option.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </LoaderWrapper>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
