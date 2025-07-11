import { Route, Routes } from "react-router";
import { CompanyLinks } from "../components";
import { AddButton } from "@/components/common/add-button";
import { CompanyDetailPage } from "./company-detail-page";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { setSelectedCompany } from "@/store/feature/company/companySlice";
import { Label } from "@/components/ui/label";
import { Table2, TableOfContents } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyTable } from "../components/table/company-table";
import { EmptyList } from "@/components/common/emty-list";
type PageOptions = "list" | "table";
export function CompanyPage() {
  const { companies } = useAppSelector((s) => s.company);
  const [pageOption, setPageOption] = useState<PageOptions>("list");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (companies.length < 1) return;

    dispatch(setSelectedCompany(companies[0].id));
  }, [companies]);

  const switchPageOption = () => {
    if (pageOption === "list") setPageOption("table");
    if (pageOption === "table") setPageOption("list");
  };
  return (
    <>
      <div className="flex flex-col    size-full space-y-4">
        <section className=" flex items-end  justify-between">
          <h2 className="text-xl font-semibold">Sucursales</h2>

          <div className="flex items-center gap-2">
            <Button variant={"ghost"} onClick={switchPageOption}>
              {pageOption === "list" ? <Table2 /> : <TableOfContents />}
            </Button>
            <AuthorizationWrapper permission={Permission.CREATE_COMPANY}>
              <AddButton type="company" />
            </AuthorizationWrapper>
          </div>
        </section>
        <Separator />
        {companies.length === 0 ? (
          <div className=" h-full flex items-center justify-center">
            <EmptyList type="company" />
          </div>
        ) : (
          <>
            {pageOption === "list" ? (
              <>
                {companies.length > 1 ? (
                  <section className="flex max-lg:flex-col gap-2  h-[90%]">
                    <div className=" space-y-2  w-1/4 max-lg:w-full  lg:h-full ">
                      <CompanyLinks />
                    </div>
                    <div className="flex flex-col gap-3 flex-grow overflow-auto max-h-full lg:max-w-[75%]  bg-background rounded-md md:p-6 border border-border">
                      <Routes>
                        <Route path="/" element={<EmptyCompanyDetailPage />} />
                        <Route path="/:id" element={<CompanyDetailPage />} />
                      </Routes>
                    </div>
                  </section>
                ) : (
                  <section className="flex max-lg:flex-col gap-2  h-[90%]">
                    <CompanyDetailPage />
                  </section>
                )}
              </>
            ) : (
              <CompanyTable />
            )}
          </>
        )}
      </div>
    </>
  );
}

function EmptyCompanyDetailPage() {
  return (
    <div className="h-full w-ful grid place-items-center  ">
      <Label className="text-xl max-md:text-lg text-center">
        Selecciona una sucursal para ver sus detalles
      </Label>
    </div>
  );
}
