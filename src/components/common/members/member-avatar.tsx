import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMember } from "@/interfaces/member.iterface";

export function MemberAvatar({
  member,
  size = "lg",
  className,
}: {
  member: IMember;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const sizeValue =
    size === "lg"
      ? "size-20 max-md:size-16"
      : size === "md"
      ? "size-14 max-md:size-12"
      : size === "sm"
      ? "size-10 max-md:size-10"
      : size === "xs"
      ? "size-8 max-md:size-8 rounded-full"
      : "";
  return (
    <Avatar className={`rounded-lg ${sizeValue}   ${className}`}>
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
