import { useEffect, useState } from "react";
import { useMembersQuery } from "@/queries/members";
import { useAppSelector } from "@/store/hooks";

export default function useSession() {
  const { session } = useAppSelector((s) => s.session);
  const { data: members = [] } = useMembersQuery({ enabled: !!session });
  const [member, setMember] = useState(() =>
    members.find((m) => m.id === session?.id)
  );

  useEffect(() => {
    setMember(members.find((m) => m.id === session?.id));
  }, [members, session?.id]);

  return { session, member };
}
