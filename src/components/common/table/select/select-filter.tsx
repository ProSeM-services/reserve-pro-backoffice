"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { TableColumnFilterType, TableType } from "@/interfaces";
import { LoaderSpinner } from "../../loader-spinner";
import { useMembersQuery } from "@/queries/members";
import { useCustomersQuery } from "@/queries/customers";

interface ISelectFilter {
  tableType?: TableType;
  onValueChange: (value: string) => void;
  value?: string;
  filterType?: TableColumnFilterType;
}
const SelctMembers = ({ onValueChange }: ISelectFilter) => {
  const { data: members = [], isLoading } = useMembersQuery();

  if (isLoading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger className=" bg-card text-card-foreground   text-xs ">
        <SelectValue placeholder="Filter by Profesional" />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground  border-none text-xs">
        <SelectGroup>
          <SelectLabel className="px-2 py-1 font-semibold">
            Profesionales
          </SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {members.map((t) => (
            <SelectItem value={t.id} key={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const SelectCustomer = ({ onValueChange }: ISelectFilter) => {
  const { data: customers = [], isLoading } = useCustomersQuery();

  if (isLoading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger className=" bg-card text-card-foreground  text-xs ">
        <SelectValue placeholder="Filtrar por email" />
      </SelectTrigger>
      <SelectContent className="bg-card text-card-foreground border-none text-xs">
        <SelectGroup>
          <SelectLabel className="px-2 py-1 font-semibold">
            Clientes
          </SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {customers.map((t) => (
            <SelectItem value={t.email} key={t.id}>
              {t.email}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export function SelectFilter({
  onValueChange,
  filterType = "members",
}: ISelectFilter) {
  if (filterType === "members") {
    return (
      <SelctMembers onValueChange={onValueChange} filterType={filterType} />
    );
  }

  if (filterType === "customers") {
    return (
      <SelectCustomer onValueChange={onValueChange} filterType={filterType} />
    );
  }

  return <></>;
}
