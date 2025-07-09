import { useAppSelector } from "@/store/hooks";
import { PaymentsTable } from "../components/payments/payment-table";
import { PaymentStatusCell } from "../components/payments/payment-status-cell";
import { useState } from "react";
import { EnterpriseTable } from "../components/enterprise/enterprises-table";
import { CompanyTable } from "@/pages/company/components/table/company-table";
import { UsersTable } from "../components/members/members-table";
import { formatCurrency } from "@/lib/utils/format-currency";

type TPage = "payments" | "enterprise" | "companies" | "accounts";

export function AdminDashboardPage() {
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
    <div className=" h-full w-full p-6   flex flex-col gap-4">
      <section className="h-[30dvh] flex justify-between gap-4 ">
        <div
          onClick={() => setPageTpye("payments")}
          className={`${
            pageType === "payments"
              ? "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 transition"
              : "hover:bg-accent"
          }    rounded-md  border   p-4 flex flex-col cursor-pointer  transition-all duration-300`}
        >
          <span className=" ">Estado de pagos</span>
          <div className="w-full  flex flex-col flex-grow items-start justify-center gap-2 px-8">
            <div className="flex  justify-between w-full gap-2">
              <PaymentStatusCell paymentStatus="paid" />
              <p className=" font-semibold">{formatCurrency(total_paid)}</p>
            </div>
            <div className="flex  justify-between w-full gap-2">
              <PaymentStatusCell paymentStatus="pending" />
              <p className=" font-semibold">${total_pending.toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-full  gap-2">
              <PaymentStatusCell paymentStatus="failed" />
              <p className=" font-semibold">${total_failled.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setPageTpye("enterprise")}
          className={`${
            pageType === "enterprise"
              ? "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 transition"
              : "hover:bg-accent"
          } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer  transition-all duration-300`}
        >
          <span className="">Total Negocios</span>
          <div className="w-full flex-grow flex items-center justify-center">
            <p className="text-6xl font-semibold">{enterprises.length}</p>
          </div>
        </div>
        <div
          onClick={() => setPageTpye("companies")}
          className={`${
            pageType === "companies"
              ? "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 transition"
              : "hover:bg-accent"
          } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer  transition-all duration-300`}
        >
          <span className="">Total Sucursales</span>
          <div className="w-full flex-grow flex items-center justify-center">
            <p className="text-6xl font-semibold">{companies.length}</p>
          </div>
        </div>
        <div
          onClick={() => setPageTpye("accounts")}
          className={`${
            pageType === "accounts"
              ? "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:brightness-110 transition"
              : "hover:bg-accent"
          } flex-grow   rounded-md  border  p-4 flex flex-col cursor-pointer  transition-all duration-300`}
        >
          <span className="">Total Cuentas</span>
          <div className="w-full flex-grow flex items-center justify-center">
            <p className="text-6xl font-semibold">{members.length}</p>
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
  );
}
