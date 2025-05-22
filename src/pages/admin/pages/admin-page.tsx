import { NavUser } from "@/components/common/nav-user";
import AdminDataProvider from "@/components/providers/admin/admin-data-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { PaymentsTable } from "../components/payments/payment-table";

import { NotificationsButton } from "../components/payments/Notifications-button";
import { PaymentStatusCell } from "../components/payments/payment-status-cell";
import { useState } from "react";
import { EnterpriseTable } from "../components/enterprise/enterprises-table";
import { CompanyTable } from "@/pages/company/components/table/company-table";
import { UsersTable } from "../components/members/members-table";

type TPage = "payments" | "enterprise" | "companies" | "accounts";
export function AdminPage() {
  const { companies } = useAppSelector((s) => s.company);
  const { members } = useAppSelector((s) => s.member);
  const { enterprises } = useAppSelector((s) => s.enterprise);
  const { payments } = useAppSelector((s) => s.payments);

  const [pageType, setPageTpye] = useState<TPage>("payments");
  const total_pending = payments
    .filter((payment) => payment.status === "pending")
    .reduce((acc, payment) => acc + payment.amount, 0);
  const total_paid = payments
    .filter((payment) => payment.status === "paid")
    .reduce((acc, payment) => acc + payment.amount, 0);
  const total_failled = payments
    .filter((payment) => payment.status === "failed")
    .reduce((acc, payment) => acc + payment.amount, 0);

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
                <SidebarTrigger className="-ml-1" />
                <NotificationsButton />
              </section>
              <section className="h-[30vh] flex justify-between gap-4 ">
                <div
                  onClick={() => setPageTpye("enterprise")}
                  className={`${
                    pageType === "enterprise" ? "bg-primary text-white" : ""
                  } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer hover:bg-accent transition-all duration-300`}
                >
                  <span className="">Total Negocios</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">
                      {enterprises.length}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setPageTpye("companies")}
                  className={`${
                    pageType === "companies" ? "bg-primary text-white" : ""
                  } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer hover:bg-accent transition-all duration-300`}
                >
                  <span className="">Total Sucursales</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">{companies.length}</p>
                  </div>
                </div>
                <div
                  onClick={() => setPageTpye("accounts")}
                  className={`${
                    pageType === "accounts" ? "bg-primary text-white" : ""
                  } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer hover:bg-accent transition-all duration-300`}
                >
                  <span className="">Total Cuentas</span>
                  <div className="w-full flex-grow flex items-center justify-center">
                    <p className="text-6xl font-semibold">{members.length}</p>
                  </div>
                </div>
                <div
                  onClick={() => setPageTpye("payments")}
                  className={`${
                    pageType === "payments" ? "bg-primary text-white" : ""
                  }    rounded-md  border  p-4 flex flex-col cursor-pointer hover:bg-accent transition-all duration-300`}
                >
                  <span className="">Estado de pagos</span>
                  <div className="w-full  flex flex-col flex-grow items-start justify-center gap-2">
                    <div className="flex  justify-between w-full gap-2">
                      <PaymentStatusCell paymentStatus="paid" />
                      <p className=" font-semibold">${total_paid.toFixed(2)}</p>
                    </div>
                    <div className="flex  justify-between w-full gap-2">
                      <PaymentStatusCell paymentStatus="pending" />
                      <p className=" font-semibold">
                        ${total_pending.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between w-full  gap-2">
                      <PaymentStatusCell paymentStatus="failed" />
                      <p className=" font-semibold">
                        ${total_failled.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex-grow     flex flex-col gap-4  ">
                {pageType === "enterprise" && <EnterpriseTable />}
                {pageType === "companies" && <CompanyTable />}
                {pageType === "accounts" && <UsersTable />}
                {pageType === "payments" && <PaymentsTable />}
              </section>
            </div>
          </AdminDataProvider>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
