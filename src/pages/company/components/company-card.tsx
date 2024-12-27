import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { Edit, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface CompanyCardProps {
  company: ICompany;
  readonly?: boolean;
}

export function CompanyCard({ company, readonly = false }: CompanyCardProps) {
  const nav = useNavigate();
  return (
    <div
      className={` flex justify-between items-center   ${
        readonly ? "p-2" : "px-2"
      } rounded-sm border border-accent shadow-sm w-full  text-[12px]`}
    >
      <div className="flex items-center gap-4  max-md:flex-grow   w-3/4 justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5 text-primary" />
          <span className="  font-medium text-nowrap">{company.name}</span>
        </div>
        <p
          className={`
              truncate rounded-sm px-2   text-gray-400 max-md:w-40  w-80 text-left`}
        >
          {company.address.value}
        </p>
      </div>
      {!readonly && (
        <Button variant={"ghost"} onClick={() => nav(`/company/${company.id}`)}>
          <Edit className="size-4" />
        </Button>
      )}
    </div>
  );
}
