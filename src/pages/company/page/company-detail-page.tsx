import LoaderWrapper from "@/components/common/loader-wrapper";
import { ICompany } from "@/interfaces";
import { CompanyServices } from "@/services/company.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CompanyDetailPage() {
  const [company, setCompany] = useState<ICompany>();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  console.log(typeof params.id);

  useEffect(() => {
    if (!params.id || typeof params.id !== "string") return;

    const fetchData = async () => {
      setLoading(true);
      const res = await CompanyServices.getCopanyById(params.id || "");
      setLoading(false);

      setCompany(res);
    };
    fetchData();
  }, [params.id]);

  return (
    <LoaderWrapper loading={loading} type="company">
      {company?.name}
    </LoaderWrapper>
  );
}
