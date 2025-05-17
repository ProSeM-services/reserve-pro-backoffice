import { RootTable } from "@/components/common/table";
import { IPayment } from "@/interfaces/payment.interface";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { EnterpriseCell } from "./enteprise-cell";
import { PaymentStatusCell } from "./payment-status-cell";
import { PaymentVoucher } from "@/pages/payments/components/payment-voucher";
import { PaymentActionsCell } from "./payments-actions-cell";
import { FromatedDate } from "@/lib/format-date";

const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "EnterpriseId",
    header: "Negocio",
    size: 100,
    cell: (info) => (
      <EnterpriseCell EnterpriseId={info.row.original.EnterpriseId} />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
    cell: (info) => `$${info.getValue()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    cell: (info) => (
      <PaymentStatusCell paymentStatus={info.getValue<IPayment["status"]>()} />
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    size: 200,
    cell: (info) => <FromatedDate date={info.getValue<string>()} />,
  },

  {
    accessorKey: "image",
    header: "",
    size: 20,
    cell: (info) => <PaymentVoucher payment={info.row.original} />,
  },
  {
    accessorKey: "id",
    header: "",
    size: 20,
    cell: (info) => <PaymentActionsCell payment={info.row.original} />,
  },
];
export function PaymentsTable() {
  const { payments } = useAppSelector((s) => s.payments);
  return <RootTable columns={columns} data={payments} />;
}
