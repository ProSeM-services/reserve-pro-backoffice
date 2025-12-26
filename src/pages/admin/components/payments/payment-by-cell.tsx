import { Badge } from "@/components/ui/badge";
import { useMembersQuery } from "@/queries/members";

export function PaymentByCell({ payment_by }: { payment_by: string }) {
  const { data: members = [] } = useMembersQuery();
  const member = members.find((e) => e.id === payment_by);

  if (!member) return <Badge variant={"secondary"}>No data</Badge>;
  return (
    <Badge variant={"secondary"} className="">
      {member.name} {member.lastName}
    </Badge>
  );
} 
