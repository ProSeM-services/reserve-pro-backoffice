import { RootTable } from "@/components/common/table";
import { IEnterprise } from "@/interfaces/enterprise.interface";
import { Location } from "@/interfaces/location.interface";
import { FromatedDate } from "@/lib/format-date";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";

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
    header: "Dirección",
    cell: ({ getValue }) => <>{getValue<Location>().value}</>,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    cell: ({ getValue }) => (
      <FromatedDate date={new Date(getValue<string>()).toISOString()} />
    ),
  },
];

export function EnterpriseTable() {
  const { enterprises } = useAppSelector((s) => s.enterprise);

  // Aquí deberías usar un componente de tabla, por ejemplo, react-table o tu propio componente
  // Ejemplo básico:
  return <RootTable columns={columns} data={enterprises} />;
}
