import { useAppSelector } from "@/store/hooks";
export default function CompanyDetailCell({
  companyId,
}: {
  companyId: string;
}) {
  const { inmutablesCompanies } = useAppSelector((s) => s.company);

  const company = inmutablesCompanies.find((co) => co.id === companyId);

  if (!company) return;
  return (
    <div className=" flex items-center gap-2  ">
      <p>{company.name}</p>
    </div>
  );
}
