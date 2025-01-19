import { WorkhoursEditor } from "@/components/common/forms/wh-editor";
import useSession from "@/hooks/useSession";
import { IMember } from "@/interfaces/member.iterface";
import { MemberCard } from "@/pages/members/components/member-card";
import { useAppSelector } from "@/store/hooks";

export function SetHoursPage() {
  const { members } = useAppSelector((s) => s.member);
  const { session } = useSession();

  if (!session) return;
  const selectedMember = members.filter((e) => e.id === session?.id)[0];
  return (
    <div className="space-y-4 h-full  flex flex-col">
      <MemberCard member={session as IMember} type="read" />
      <section className=" flex-grow">
        <WorkhoursEditor member={selectedMember} />
      </section>
    </div>
  );
}
