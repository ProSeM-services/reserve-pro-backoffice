import LoaderWrapper from "@/components/common/loader-wrapper";
import { EmptyList } from "@/components/common/emty-list";
import { CompanyTableRow } from "./company-table-row";
import { useCompaniesQuery } from "@/queries/companies";

export function CompanyTable() {
  const { data: companies = [], isLoading } = useCompaniesQuery();

  return (
    <LoaderWrapper loading={isLoading} type="company">
      {companies.length === 0 ? (
        <EmptyList type="company" />
      ) : (
        <div className=" space-y-2">
          {companies?.map((company) => (
            <CompanyTableRow company={company} key={company.id} />
          ))}
        </div>
      )}
    </LoaderWrapper>
  );
}
