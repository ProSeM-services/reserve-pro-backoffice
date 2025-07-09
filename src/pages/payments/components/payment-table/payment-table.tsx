import { RootTable } from "@/components/common/table";
import { IPayment } from "@/interfaces/payment.interface";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusCell } from "./payment-status-cell";
import { FromatedDate } from "@/lib/format-date";
import { PaymentByCell } from "./payment-by-cell";
import { formatCurrency } from "@/lib/utils/format-currency";
import { EmptyList } from "@/components/common/emty-list";

const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "amount",
    header: "Monto",
    size: 100,
    cell: (info) => (
      <p className="text-lg ">{formatCurrency(info.getValue<number>())}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    size: 100,
    cell: (info) => (
      <div className="flex justify-center">
        <PaymentStatusCell
          paymentStatus={info.getValue<IPayment["status"]>()}
        />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    size: 150,
    cell: (info) => <FromatedDate date={info.getValue<string>()} />,
  },

  {
    accessorKey: "end_date",
    header: "Vencimiento",
    size: 150,
    cell: (info) => <FromatedDate date={info.getValue<string>()} />,
  },
  {
    accessorKey: "payment_by",
    header: "Pagado Por",
    size: 200,
    cell: (info) => (
      <div className="flex justify-center">
        <PaymentByCell payment_by={info.getValue<string>()} />
      </div>
    ),
  },
];
export function PaymentsTable() {
  const { payments } = useAppSelector((s) => s.payments);

  if (payments.length === 0) {
    return <EmptyList type="paymentPlan" />;
  }
  return <RootTable columns={columns} data={payments} />;
}
