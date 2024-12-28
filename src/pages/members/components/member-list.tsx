import LoaderWrapper from "@/components/common/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { MemberCard } from "./member-card";

export function MemberList() {
  const { members, loading } = useAppSelector((s) => s.member);
  return (
    <LoaderWrapper loading={loading} type="members">
      <div className="grid grid-cols-4 max-md:grid-cols-1">
        {members.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </div>
    </LoaderWrapper>
  );
}
