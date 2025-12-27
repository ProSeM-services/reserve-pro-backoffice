import { ICompany } from "@/interfaces";
import { Link } from "react-router";
import { Label } from "@/components/ui/label";

export function CompanyTableRow({ company }: { company: ICompany }) {
  return (
    <Link
      to={`/company/${company.id}`}
      className="flex items-center justify-between border rounded-md p-4 hover:bg-muted transition-colors"
    >
      <div className="flex flex-col gap-1">
        <Label className="text-base font-semibold">{company.name}</Label>
        {company.email ? (
          <span className="text-sm text-muted-foreground">{company.email}</span>
        ) : null}
      </div>
    </Link>
  );
}
