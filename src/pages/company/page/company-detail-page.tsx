import { useParams } from "react-router";
import { CompanyDetails } from "../components/CompanyDetails";

export function CompanyDetailPage() {
  const { id } = useParams();

  if (!id) return null;

  return <CompanyDetails companyId={id} />;
}
