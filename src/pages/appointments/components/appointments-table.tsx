import { RootTable } from "@/components/common/table/root-table";
import { ColumnDef } from "@tanstack/react-table";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loader-wrapper";
import { CalendarCheck, CalendarX, UserIcon } from "lucide-react";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import { FromatedDate } from "@/lib/format-date";

export function AppointmentsTable() {
  const { appointments, loading, fetched } = useAppSelector(
    (s) => s.appointments
  );

  const columns: ColumnDef<(typeof appointments)[0]>[] = [
    {
      accessorKey: "canceled",
      header: "",
      size: 5,
      cell: ({ getValue }) => (
        <p
          className={`${
            getValue<boolean>() ? "bg-red-700" : "bg-green-700 "
          } font-light  rounded-full mx-auto size-6 text-white flex justify-center items-center`}
        >
          {getValue<boolean>() ? (
            <CalendarX className="size-3" />
          ) : (
            <CalendarCheck className="size-3" />
          )}
        </p>
      ),
    },
    {
      accessorKey: "fullName",
      header: "Cliente",
      size: 200,
      cell: ({ row }) => {
        const fullName = row.original.fullName;
        const email = row.original.email;
        return (
          <div className="h-10 flex items-center gap-2  ">
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
      accessorKey: "UserId",
      header: "Profesional",
      enableColumnFilter: false,
      meta: {
        filterVariant: "select",
        filterType: "members",
      },
      size: 200,
      cell: ({ row }) => {
        const user = row.original.User;
        if (!user) return <p>no data</p>;
        return (
          <div className="h-10 flex items-center gap-2  ">
            <MemberAvatar member={user} size="sm" />
            <div className="flex flex-col">
              <Label>{user.fullName}</Label>
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Fecha y Horario",
      size: 100,
      cell: ({ row }) => {
        const time = row.original.time;
        const date = new Date(row.original.date).toLocaleDateString();

        return (
          <div>
            <Label>
              <FromatedDate date={date} />
            </Label>
            <p className="font-medium text-gray-600">{time} hs</p>
          </div>
        );
      },
    },
  ];

  return (
    <LoaderWrapper loading={loading && !fetched} type="appointments">
      <RootTable
        columns={columns}
        data={appointments}
        tableType="appoitnemnts"
      />
    </LoaderWrapper>
  );
}
