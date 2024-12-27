import { ICompany } from "@/interfaces";
import { CompanyServices } from "@/services/company.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CompanyDetailPage() {
  const [company, setCompany] = useState<ICompany>();
  const params = useParams();
  console.log(typeof params.id);

  useEffect(() => {
    if (!params.id || typeof params.id !== "string") return;

    const fetchData = async () => {
      const res = await CompanyServices.getCopanyById(params.id || "");

      setCompany(res);
    };
    fetchData();
  }, [params.id]);

  if (!company) return null;
  return <div>{company.name}</div>;
}
