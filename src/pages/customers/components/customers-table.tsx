import { ICustomer } from "@/interfaces/customer.interface";
import { ColumnDef } from "@tanstack/react-table";
import { RootTable } from "@/components/common/table/root-table";
import LoaderWrapper from "@/components/common/loader-wrapper";
import { UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/icons/whatsApp-icon";
import { CustomerDropDown } from "./customer-dropdown";
import { useCustomersQuery } from "@/queries/customers";
const customerColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "email",
    header: "Cliente",
    size: 300,
    cell: ({ row }) => {
      const fullName = row.original.fullName;
      const email = row.original.email;
      return (
        <div className=" flex items-center gap-2  ">
          <UserIcon className="size-8" />
          <div className="flex flex-col">
            <Label>{fullName}</Label>
            <span className="text-sm text-gray-600">{email}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Celular",
    size: 300,
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <WhatsAppIcon />
        <p className="">{getValue<string>()}</p>
      </div>
    ),
  },
  {
    accessorKey: "appointments",
    header: "Turnos Agendados",
    size: 200,
    cell: ({ getValue }) => (
      <div className="size-10 border flex items-center justify-center rounded-full bg-muted mx-auto p-0">
        <p className="mx-auto text-center">{getValue<[]>().length}</p>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    size: 10,
    cell: ({ row }) => (
      <div className="flex  justify-center">
        <CustomerDropDown customer={row.original} />
      </div>
    ),
  },
];
export function CustomerTable({
  onSelect,
}: {
  onSelect: (customer: ICustomer) => void;
}) {
  const { data: customers = [], isLoading, isFetching } = useCustomersQuery();

  const isLoadingData = !customers && (isLoading || isFetching);
  return (
    <LoaderWrapper loading={isLoadingData} type="customers">
      <RootTable
        columns={customerColumns}
        data={customers}
        tableType="customers"
        onRowClick={(row) => onSelect(row)}
      />
    </LoaderWrapper>
  );
}
