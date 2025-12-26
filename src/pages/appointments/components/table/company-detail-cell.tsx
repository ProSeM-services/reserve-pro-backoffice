import { House } from "lucide-react";
import { useCompaniesQuery } from "@/queries/companies";
export default function CompanyDetailCell({
  companyId,
}: {
  companyId: string;
}) {
  const { data: companies = [] } = useCompaniesQuery();

  const company = companies.find((co) => co.id === companyId);

  if (!company) return null;
  return (
    <div className=" flex items-center gap-2  ">
      <House className="size-4" /> <p>{company.name}</p>
    </div>
  );
}
