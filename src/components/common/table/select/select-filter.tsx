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
import { useAppSelector } from "@/store/hooks";
interface ISelectFilter {
  tableType?: TableType;
  onValueChange: (value: string) => void;
  value?: string;
  filterType?: TableColumnFilterType;
}
const SelctMembers = ({ onValueChange }: ISelectFilter) => {
  const { members: data, loading } = useAppSelector((s) => s.member);

  if (loading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }

  if (data) {
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
            {data.map((t) => (
              <SelectItem value={t.id} key={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
};

const SelectCustomer = ({ onValueChange }: ISelectFilter) => {
  const { customers: data, loading } = useAppSelector((s) => s.customers);

  if (loading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }

  if (data) {
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
            {data.map((t) => (
              <SelectItem value={t.email} key={t.id}>
                {t.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
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
