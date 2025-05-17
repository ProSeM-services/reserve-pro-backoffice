import { RootTable } from "@/components/common/table";
import { IPayment } from "@/interfaces/payment.interface";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusCell } from "./payment-status-cell";
import { PaymentVoucher } from "@/pages/payments/components/payment-voucher";
import { FromatedDate } from "@/lib/format-date";

const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "amount",
    header: "Monto",
    size: 100,
    cell: (info) => (
      <p className="text-lg ">$ {info.getValue<number>().toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
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
    accessorKey: "notes",
    header: "Notas",
    size: 200,
    cell: (info) => <p className="text-xs ">{info.getValue<string>()}</p>,
  },
  {
    accessorKey: "image",
    header: "",
    size: 20,
    cell: (info) => <PaymentVoucher payment={info.row.original} />,
  },
];
export function PaymentsTable() {
  const { payments } = useAppSelector((s) => s.payments);
  return <RootTable columns={columns} data={payments} />;
}
