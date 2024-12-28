import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMember } from "@/interfaces/member.iterface";

export function MemberAvatar({ member }: { member: IMember }) {
  return (
    <Avatar className="size-20 rounded-lg">
      <AvatarImage
        src={member.image ? member.image : ""}
        alt={`image ${member.name}'s profile`}
        className="object-cover aspect-square"
      />
      <AvatarFallback className="rounded-lg uppercase">
        {member.name[0]}
        {member.lastName[0]}
      </AvatarFallback>
    </Avatar>
  );
}
