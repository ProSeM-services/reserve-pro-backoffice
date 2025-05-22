import { RootTable } from "@/components/common/table";
import { IUser } from "@/interfaces";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { EnterpriseCell } from "../payments/enteprise-cell";
import { UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import CompanyDetailCell from "@/pages/appointments/components/table/company-detail-cell";
import { FromatedDate } from "@/lib/format-date";

const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const fullName = row.original.name + " " + row.original.lastName;
      const email = row.original.email;
      return (
        <div className="h-10 flex items-center gap-2  ">
          <UserIcon className="size-8 " />
          <div className="flex flex-col">
            <Label>{fullName}</Label>
            <span className="text-xs text-gray-600  truncate rounded-sm  max-md:w-40  w-40 text-left">
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "EnterpriseId",
    header: "Negocio",
    cell: ({ getValue }) => (
      <EnterpriseCell EnterpriseId={getValue<string>()} />
    ),
  },
  {
    accessorKey: "CompanyId",
    header: "Negocio",
    cell: ({ row }) => {
      const companyId = row.original.CompanyId;
      if (!companyId) return <i>NO ASIGNADO</i>;
      return <CompanyDetailCell companyId={companyId} />;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creacion",
    cell: (info) => <FromatedDate date={info.getValue<string>()} />,
  },
];

export function UsersTable() {
  const { members } = useAppSelector((s) => s.member);

  return <RootTable data={members} columns={columns} />;
}
