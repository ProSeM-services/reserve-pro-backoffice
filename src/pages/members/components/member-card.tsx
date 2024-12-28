import { Card } from "@/components/ui/card";
import { IMember } from "@/interfaces/member.iterface";
import { OpenMemberDetails } from "./open-member-details";
import { MemberAvatar } from "@/components/common/members/member-avatar";

export function MemberCard({ member }: { member: IMember }) {
  return (
    <Card
      className={`flex flex-col gap-4 p-2  hover:shadow-md transition-all duration-200 `}
    >
      <div className="flex gap-4 ">
        <div className=" flex justify-center items-center  ">
          <MemberAvatar member={member} />
        </div>
        <div className="flex flex-col w-full justify-start text-md ">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-1">{member.role}</div>
            <OpenMemberDetails member={member} />
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-1 text-lg">
              {member.name}, {member.lastName}
            </div>
          </div>
          <span className="font-normal">{member.email || ""}</span>

          {member.createdAt && (
            <div className="flex items-center gap-2 ">
              <span className="font-medium">Joining Date: </span>
              <span>{new Date(member.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
