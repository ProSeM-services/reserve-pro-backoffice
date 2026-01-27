import LoaderWrapper from "@/components/common/loader-wrapper";
import { MemberCard } from "./member-card";
import { useMembersQuery } from "@/queries/members";

export function MemberList() {
  const { data: members = [], isLoading } = useMembersQuery();
  return (
    <LoaderWrapper loading={isLoading} type="members">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2">
        {members.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </div>
    </LoaderWrapper>
  );
}
