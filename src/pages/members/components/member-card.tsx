import { Card } from "@/components/ui/card";
import { IMember } from "@/interfaces/member.iterface";
import { OpenMemberDetails } from "./open-member-details";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { SendInviteUser } from "./send-invite-user";

interface MemberCardProps {
  member: IMember;
  type?: "details" | "invite" | "read";
}
export function MemberCard({ member, type = "details" }: MemberCardProps) {
  return (
    <Card
      className={`flex flex-col gap-4 p-2  min-w-[300px]   hover:shadow-md transition-all duration-200 `}
    >
      <div className="flex gap-4 ">
        <div className=" flex justify-center items-center  ">
          <MemberAvatar member={member} />
        </div>
        <div className="flex flex-col w-full justify-start text-md ">
          <header className="flex w-full  justify-between items-center  ">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1 text-lg max-md:text-[15px] font-semibold ">
                {member.name}, {member.lastName}
              </div>
              <div className="flex items-center gap-1 text-[10px]  text-gray-500">
                {member.role}
              </div>
            </div>
            {type === "read" ? null : (
              <>
                {type === "details" && <OpenMemberDetails member={member} />}
                {type === "invite" && <SendInviteUser member={member} />}
              </>
            )}
          </header>

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
