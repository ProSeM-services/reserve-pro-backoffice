import { RootTable } from "@/components/common/table";
import { IEnterprise } from "@/interfaces/enterprise.interface";
import { Location } from "@/interfaces/location.interface";
import { FromatedDate } from "@/lib/format-date";
import { ColumnDef } from "@tanstack/react-table";
import { useEnterprisesQuery } from "@/queries/enterprises";

export const columns: ColumnDef<IEnterprise>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company_count",
    header: "Sucursales",
  },
  {
    accessorKey: "address",
    header: "Direccion",
    cell: ({ getValue }) => <>{getValue<Location>().value}</>,
  },
  {
    accessorKey: "payment_plan",
    header: "Plan de pago",
    cell: ({ getValue }) => <>{getValue<string>() || "-"}</>,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creacion",
    cell: ({ getValue }) => (
      <FromatedDate date={new Date(getValue<string>()).toISOString()} />
    ),
  },
];

export function EnterpriseTable() {
  const { data: enterprises = [] } = useEnterprisesQuery();

  const sortedEnterprises = [...enterprises].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return <RootTable columns={columns} data={sortedEnterprises} />;
}
