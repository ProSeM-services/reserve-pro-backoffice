import { useAppSelector } from "@/store/hooks";

export default function useSession() {
  const session = useAppSelector((s) => s.session);

  return session;
}
