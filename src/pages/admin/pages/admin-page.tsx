import { NavUser } from "@/components/common/nav-user";
import AdminDataProvider from "@/components/providers/admin/admin-data-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NotificationsButton } from "../components/payments/Notifications-button";

import { Link, Route, Routes, useLocation } from "react-router";
import { DollarSignIcon, LayoutDashboardIcon } from "lucide-react";
import { AdminDashboardPage } from "./admin-dashboard-page";
import { PaymentPlansPage } from "./payment-plans-page";

export function AdminPage() {
  const location = useLocation();
  return (
    <div className="h-[100dvh] w-full  flex flex-col  overflow-hidden  ">
      <SessionProvider>
        <SidebarProvider>
          <Sidebar collapsible="icon" className="h-full  ">
            <SidebarHeader
              className="flex justify-center items-center p-4
            "
            >
              <div className=" size-[100px] flex items-center justify-center">
                <img src="/images/logo.svg" className="w-[100%] object-cover" />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Link
                to={"/admin"}
                className={`flex gap-2 max-md:p-2 text-md   items-center h-12  max-sm:h-full  transition-all duration-300  px-2  ${
                  location.pathname === "/admin"
                    ? "bg-indigo-500 text-white "
                    : " text-gray-700 border border-transparent hover:border-indigo-200"
                } $`}
              >
                <LayoutDashboardIcon className="size-4" />

                <span>Dashboard</span>
              </Link>
              <Link
                to={"/admin/payment-plans"}
                className={`flex gap-2 max-md:p-2 text-md   items-center h-12    max-sm:h-full  transition-all duration-300  px-2  ${
                  location.pathname === "/admin/payment-plans"
                    ? "bg-indigo-500 text-white "
                    : " text-gray-700 border border-transparent hover:border-indigo-200"
                } $`}
              >
                <DollarSignIcon className="size-4" />

                <span>Planes</span>
              </Link>
            </SidebarContent>
            <SidebarFooter>
              <NavUser />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <AdminDataProvider>
            <div className=" h-full w-full p-6   flex flex-col gap-4  ">
              <section className="h-[5vh] flex justify-between items-center gap-4 border rounded-md  p-4  ">
                <SidebarTrigger className="-ml-1" />
                <NotificationsButton />
              </section>
              <section className=" flex-1 overflow-auto max-h-[90dvh] ">
                <Routes>
                  <Route path="/" element={<AdminDashboardPage />} />
                  <Route path="/payment-plans" element={<PaymentPlansPage />} />
                  <Route path="*" element={<h2> NOT FOUND</h2>} />
                </Routes>
              </section>
            </div>
          </AdminDataProvider>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
