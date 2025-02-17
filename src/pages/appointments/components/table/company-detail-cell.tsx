import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { HomeIcon } from "lucide-react";

export default function CompanyDetailCell({
  companyId,
}: {
  companyId: string;
}) {
  const { inmutablesCompanies } = useAppSelector((s) => s.company);

  const company = inmutablesCompanies.find((co) => co.id === companyId);

  if (!company) return;
  return (
    <div className="h-10 flex items-center gap-2  ">
      <HomeIcon className="size-6" />
      <div className="flex flex-col">
        <Label>{company.name}</Label>
        <span className="text-xs text-gray-600  truncate rounded-sm  max-md:w-40  w-40 text-left">
          {company.address.value}
        </span>
      </div>
    </div>
  );
}
