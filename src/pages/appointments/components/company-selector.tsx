import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { setSelectedCompanyForAppointments } from "@/store/feature/appointnments/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HouseIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function CompanySelector() {
  const { companies, inmutablesCompanies } = useAppSelector((s) => s.company);
  const { crossCompanyId } = useAppSelector((s) => s.main);

  const { selectedCompanyForAppointments } = useAppSelector(
    (s) => s.appointments
  );
  const [ableToSelect, setAbleToSelect] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("crossCompanyId", crossCompanyId);
    if (crossCompanyId) {
      if (crossCompanyId === "all") {
        setAbleToSelect(true);
        return;
      }
      const company = inmutablesCompanies.find((e) => e.id === crossCompanyId);
      if (!company) return;
      dispatch(setSelectedCompanyForAppointments(company));
      setAbleToSelect(false);
    }
  }, [crossCompanyId]);

  const handleSelectCompany = (id: string) => {
    if (id === "all") {
      dispatch(setSelectedCompanyForAppointments(id));
      return;
    }

    const company = companies.find((e) => e.id === id);
    if (!company) return;
    dispatch(setSelectedCompanyForAppointments(company));
  };
  return (
    <Select
      onValueChange={(value) => handleSelectCompany(value)}
      disabled={!ableToSelect}
    >
      <SelectTrigger className="h-12 px-4 space-x-4 w-full">
        {selectedCompanyForAppointments === "all" ? (
          <div className="flex gap-2 cursor-pointer">
            <HouseIcon />
            <div className="flex flex-col items-start">
              <Label>Todos</Label>
              <span>Turnos de todas las </span>
            </div>
          </div>
        ) : (
          selectedCompanyForAppointments && (
            <div className="flex items-center gap-2 cursor-pointer font-medium">
              <HouseIcon />
              <p>{selectedCompanyForAppointments.name}</p>
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
          <SelectItem value={company.id}>
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
