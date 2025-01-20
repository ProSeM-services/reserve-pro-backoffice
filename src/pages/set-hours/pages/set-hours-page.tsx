import { WorkhoursEditor } from "@/components/common/forms/wh-editor";
import useSession from "@/hooks/useSession";
import { useAppSelector } from "@/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { MemberCard } from "@/pages/members/components/member-card";
import { hasPermission } from "@/lib/auth/has-permission";
import { Permission } from "@/lib/constants/permissions";
import { useState } from "react";
import { IMember } from "@/interfaces/member.iterface";
export function SetHoursPage() {
  const { members } = useAppSelector((s) => s.member);
  const { session } = useSession();
  const [selectedMember, setSelectedMember] = useState<IMember>(
    members.filter((e) => e.id === session?.id)[0]
  );
  if (!session) return;
  const handleSelectMember = (id: string) => {
    const selectedMember = members.filter((e) => e.id === id)[0];

    setSelectedMember(selectedMember);
  };

  console.log("selcet memvber", selectedMember);
  return (
    <div className="space-y-4 h-full  flex flex-col">
      {/* <MemberCard member={selectedMember} /> */}
      {!hasPermission(session, Permission.UPDATE_WORKHOURS) ? (
        <MemberCard member={selectedMember} />
      ) : (
        <Select
          value={selectedMember.id}
          onValueChange={(value) => handleSelectMember(value)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Inicio" />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem value={member.id} key={member.id} className="">
                <div className="flex items-center gap-4 p-1">
                  <MemberAvatar member={member} size="xs" />
                  <p>{member.fullName}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <section className=" flex-grow">
        <WorkhoursEditor member={selectedMember} />
      </section>
    </div>
  );
}
