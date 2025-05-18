import { NavUser } from "@/components/common/nav-user";
import AdminDataProvider from "@/components/providers/admin/admin-data-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { PaymentsTable } from "../components/payments/payment-table";

import { NotificationsButton } from "../components/payments/Notifications-button";
export function AdminPage() {
  const { companies } = useAppSelector((s) => s.company);
  const { members } = useAppSelector((s) => s.member);
  const { enterprises } = useAppSelector((s) => s.enterprise);
  const { notifications } = useAppSelector((s) => s.notifications);

  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden     ">
      <SessionProvider>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="h-full  ">
            <SidebarHeader
              className="flex justify-center items-center p-4
            "
            >
              <div className=" size-[100px] flex items-center justify-center">
                <img
                  src="/images/reserve-pro-high-resolution-logo-transparent.png"
                  className="w-[100%] object-cover"
                />
              </div>
            </SidebarHeader>

            <SidebarFooter>
              <NavUser />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <AdminDataProvider>
            <div className=" h-full w-full p-6   flex flex-col gap-4">
              <section className="h-[5vh] flex justify-between items-center gap-4 border rounded-md  p-4 ">
                <div className="flex-grow  ">
                  Notificaiones {notifications.length}
                </div>
                <NotificationsButton />
              </section>
              <section className="h-[30vh] flex justify-between gap-4 ">
                <div className="flex-grow  rounded-md aspect-square border  p-4 flex flex-col">
                  <span className="">Total Negocios</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">
                      {enterprises.length}
                    </p>
                  </div>
                  <Button>Detalles</Button>
                </div>
                <div className="flex-grow  rounded-md aspect-square border  p-4 flex flex-col">
                  <span className="">Total Sucursales</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">{companies.length}</p>
                  </div>
                  <Button>Detalles</Button>
                </div>
                <div className="flex-grow  rounded-md aspect-square border  p-4 flex flex-col">
                  <span className="">Total Cuentas</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">{members.length}</p>
                  </div>
                  <Button>Detalles</Button>
                </div>
              </section>
              <section className="flex-grow    rounded-md p-4 flex flex-col gap-4">
                <p>Pagos</p>
                <PaymentsTable />
              </section>
            </div>
          </AdminDataProvider>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
