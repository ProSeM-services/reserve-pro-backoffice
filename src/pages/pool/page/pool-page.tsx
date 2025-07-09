import { NavUser } from "@/components/common/nav-user";
import { SessionProvider } from "@/components/providers/session-provider";
import {
  Sidebar,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function PoolPage() {
  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden    text-xs ">
      <SessionProvider>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="h-full ">
            <SidebarFooter>
              <NavUser />
            </SidebarFooter>
          </Sidebar>
          <div className=" h-full w-full flex flex-col  items-center justify-center bg-accent">
            <h1 className="text-2xl font-bold">Reserve Pro | Pool jobs</h1>
            <p>El lugar para encontrar trabajo</p>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
