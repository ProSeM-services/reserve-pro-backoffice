import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/interfaces";
import { getS3Url } from "@/lib/utils/s3-image";

export function MemberAvatar({
  member,
  size = "lg",
  className,
}: {
  member: IUser;
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
      ? "size-6 max-md:size-8 rounded-full"
      : "";

  return (
    <Avatar className={`rounded-lg ${sizeValue}   ${className}`}>
      <AvatarImage
        src={member.image ? getS3Url(member.image) : ""}
        alt={`image ${member.name}'s profile`}
        className="object-cover aspect-square"
      />
      <AvatarFallback className="rounded-lg uppercase bg-primary text-white">
        {member.name[0]}
        {member.lastName[0]}
      </AvatarFallback>
    </Avatar>
  );
}
