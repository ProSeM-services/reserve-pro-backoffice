import { useAppSelector } from "@/store/hooks";

export default function useSession() {
  const session = useAppSelector((s) => s.session);
  const { members } = useAppSelector((s) => s.member);
  console.log(session);
  const member = members.filter((e) => e.id === session?.session?.id)[0];
  return { session, member: member ? member : session.session };
}
