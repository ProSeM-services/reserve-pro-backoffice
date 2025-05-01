import { useAppSelector } from "@/store/hooks";

export default function useSession() {
  const { session } = useAppSelector((s) => s.session);
  const { inmutableMembers } = useAppSelector((s) => s.member);
  const member = inmutableMembers.filter((e) => e.id === session?.id)[0];

  return { session, member };
}
