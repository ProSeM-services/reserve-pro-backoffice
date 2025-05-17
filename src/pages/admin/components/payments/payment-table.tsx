import { RootTable } from "@/components/common/table";
import { IPayment } from "@/interfaces/payment.interface";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { EnterpriseCell } from "./enteprise-cell";
import { PaymentStatusCell } from "./payment-status-cell";

const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "EnterpriseId",
    header: "Negocio",
    cell: (info) => (
      <EnterpriseCell EnterpriseId={info.row.original.EnterpriseId} />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => `$${info.getValue()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <PaymentStatusCell paymentStatus={info.getValue<IPayment["status"]>()} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "EnterpriseId",
    header: "User",
    cell: (info) => (
      <EnterpriseCell EnterpriseId={info.row.original.EnterpriseId} />
    ),
  },
];
export function PaymentsTable() {
  const { payments } = useAppSelector((s) => s.payments);
  return <RootTable columns={columns} data={payments} />;
}
