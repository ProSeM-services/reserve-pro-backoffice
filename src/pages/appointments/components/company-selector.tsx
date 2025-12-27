import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { HouseIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCompaniesQuery } from "@/queries/companies";

export function CompanySelector({
  onChange,
}: {
  onChange: (companyId: string | "all") => void;
}) {
  const { data: companies = [] } = useCompaniesQuery();
  const [selected, setSelected] = useState<string | "all">("all");
  const companyFilter = localStorage.getItem("companyFilterId");

  useEffect(() => {
    if (companyFilter) {
      setSelected(companyFilter);
      onChange(companyFilter);
    }
  }, []);

  const handleSelectCompany = (id: string) => {
    if (id === "all") {
      localStorage.removeItem("companyFilterId");
      setSelected("all");
      onChange("all");
      return;
    }
    localStorage.setItem("companyFilterId", id);
    setSelected(id);
    onChange(id);
  };
  return (
    <Select
      onValueChange={(value) => handleSelectCompany(value)}
      disabled={companies.length === 1}
    >
      <SelectTrigger className="h-12 px-4 space-x-4 w-full">
        {selected === "all" ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <HouseIcon />
            <div className="flex flex-col items-start">
              <Label>Todas las sucursales</Label>
            </div>
          </div>
        ) : (
          selected && (
            <div className="flex items-center gap-2 cursor-pointer font-medium">
              <HouseIcon />
              <p>{companies.find((c) => c.id === selected)?.name}</p>
            </div>
          )
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>
          <div className="flex gap-2 cursor-pointer">
            <HouseIcon />
            <div className="flex flex-col">
              <Label>Todos</Label>
              <span>Turnos de todas las sucursales</span>
            </div>
          </div>
        </SelectItem>
        {companies.map((company) => (
          <SelectItem value={company.id} key={company.id}>
            <div className="flex items-center gap-2 cursor-pointer font-medium">
              <HouseIcon />
              <p>{company.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
