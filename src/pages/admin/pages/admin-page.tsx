import { NavUser } from "@/components/common/nav-user";
import AdminDataProvider from "@/components/providers/admin/admin-data-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { PaymentsTable } from "../components/payments/payment-table";

export function AdminPage() {
  const { companies } = useAppSelector((s) => s.company);
  const { members } = useAppSelector((s) => s.member);
  const { enterprises } = useAppSelector((s) => s.enterprise);
  const { notifications } = useAppSelector((s) => s.notifications);

  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden     ">
      <SessionProvider>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="h-full ">
            <SidebarFooter>
              <NavUser />
            </SidebarFooter>
          </Sidebar>
          <AdminDataProvider>
            <div className=" h-full w-full p-6   flex flex-col gap-4">
              <section className="h-[5vh] flex justify-between gap-4  ">
                <div className="flex-grow  rounded-md aspect-square border p-4">
                  Notificaiones {notifications.length}
                </div>
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
