import { useEnterprisesQuery } from "@/queries/enterprises";

export function EnterpriseCell({ EnterpriseId }: { EnterpriseId: string }) {
  const { data: enterprises = [] } = useEnterprisesQuery();

  const enterprise = enterprises.find((e) => e.id === EnterpriseId);
  if (!enterprise) return null;

  return <div>{enterprise.name}</div>;
}
