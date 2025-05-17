import { useAppSelector } from "@/store/hooks";

export function EnterpriseCell({ EnterpriseId }: { EnterpriseId: string }) {
  const { enterprises } = useAppSelector((s) => s.enterprise);

  const enterprise = enterprises.find((e) => e.id === EnterpriseId);
  if (!enterprise) return;

  return <div>{enterprise.name}</div>;
}
