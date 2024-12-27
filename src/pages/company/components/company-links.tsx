import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router";
import { CompanyCard } from "../components/company-card";
import { EmptyList } from "@/components/common/emty-list";
import LoaderWrapper from "@/components/common/loader-wrapper";

export function CompanyLinks() {
  const { companies, loading } = useAppSelector((s) => s.company);

  return (
    <LoaderWrapper loading={loading} type="company">
      {companies.length === 0 ? (
        <EmptyList type="company" />
      ) : (
        <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
          {companies.map((company) => (
            <Link
              to={`/company/${company.id}`}
              key={company.id}
              className={`  transition-all duration-300 border rounded-md  flex items-center gap-2 bg-background `}
            >
              <CompanyCard company={company} readonly />
            </Link>
          ))}
        </div>
      )}
    </LoaderWrapper>
  );
}
