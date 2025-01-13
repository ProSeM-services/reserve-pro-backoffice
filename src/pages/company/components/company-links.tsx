import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router";
import { CompanyCard } from "../components/company-card";
import { EmptyList } from "@/components/common/emty-list";
import LoaderWrapper from "@/components/common/loader-wrapper";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CompanyLinks() {
  const { companies, loading } = useAppSelector((s) => s.company);

  return (
    <>
      <section className="max-lg:hidden">
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
      </section>
      <section className="lg:hidden">
        <LoaderWrapper loading={loading} type="company">
          {companies.length === 0 ? (
            <EmptyList type="company" />
          ) : (
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sucursales" />
              </SelectTrigger>
              <SelectContent>
                <div>
                  {companies.map((company) => (
                    <Link
                      to={`/company/${company.id}`}
                      key={company.id}
                      className={`cursor-pointer`}
                    >
                      <SelectItem value={company.name}>
                        <CompanyCard company={company} readonly />
                      </SelectItem>
                    </Link>
                  ))}
                </div>
              </SelectContent>
            </Select>
          )}
        </LoaderWrapper>
      </section>
    </>
  );
}
