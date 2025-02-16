import { memberListAdpater } from "@/adapters/members.adapter";
import { CategoryCard } from "@/components/common/category-card";
import LoaderWrapper from "@/components/common/loader-wrapper";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { RootTable } from "@/components/common/table";
import { Label } from "@/components/ui/label";
import { ICompany } from "@/interfaces";
import { useAppSelector } from "@/store/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { HomeIcon, MapPinIcon } from "lucide-react";

const columns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    size: 120,
    cell: ({ row }) => {
      const name = row.original.name;
      const email = row.original.email;
      return (
        <div className="h-10 flex items-center gap-2  ">
          <HomeIcon className="size-8 " />
          <div className="flex flex-col">
            <Label>{name}</Label>
            <span className="text-xs text-gray-600  truncate rounded-sm  max-md:w-40  w-40 text-left">
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Direccion",
    size: 120,
    cell: ({ row }) => {
      const { city, value } = row.original.address;
      return (
        <div className="h-10 flex items-center gap-2  ">
          <MapPinIcon className="size-8 " />
          <div className="flex flex-col">
            <Label>{city}</Label>
            <span className="text-xs text-gray-600  truncate rounded-sm  max-md:w-40  w-40 text-left">
              {value}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Users",
    header: "Miembros",
    size: 120,
    cell: ({ row }) => {
      const members = row.original.Users;
      return (
        <div className="flex flex-col justify-start">
          {members &&
            memberListAdpater(members)?.map((user) => (
              <div
                className="flex items-center gap-2 -ml-2  rounded-full "
                key={user.id}
              >
                <MemberAvatar member={user} size="xs" className="border" />
                {user.fullName}
              </div>
            ))}
        </div>
      );
    },
  },
  {
    accessorKey: "Services",
    header: "Servicios",
    size: 120,
    cell: ({ row }) => {
      const services = row.original.Services;
      return (
        <ul className="flex flex-col justify-start">
          {services?.map((service) => (
            <li key={service.id}>- {service.title}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Servicios",
    size: 120,
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="flex flex-col  gap-1 justify-start">
          {category?.map((cat) => (
            <CategoryCard category={cat} selected={false} />
          ))}
        </div>
      );
    },
  },
];
export function CompanyTable() {
  const { loading, companies, fetched } = useAppSelector((s) => s.company);

  return (
    <LoaderWrapper loading={loading && !fetched} type="company">
      <RootTable columns={columns} data={companies} tableType="company" />
    </LoaderWrapper>
  );
}
