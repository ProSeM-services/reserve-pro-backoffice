import { Column, Table } from "@tanstack/react-table";
import { Input } from "../../ui/input";
import { TableType } from "@/interfaces";
import { SelectFilter } from "./select/select-filter";
interface TableFilterProps<TData> {
  column: Column<any, unknown>;
  tableType?: TableType;
  table: Table<TData>;
}
interface IHeaderFilter<TData> {
  column: Column<any, unknown>;
  tableType: TableType;
  table: Table<TData>;
}

export function TableFilter<TData>({
  column,
  table,
  tableType,
}: TableFilterProps<TData>) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterType } = column.columnDef.meta ?? {};
  const handleFilter = (value: string) => {
    if (value === "all") return table.resetColumnFilters();
    column.setFilterValue(value);
  };
  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2"></div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <SelectFilter
      onValueChange={handleFilter}
      tableType={tableType}
      filterType={filterType}
      value={columnFilterValue?.toString()}
    />
  ) : (
    <Input
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}
