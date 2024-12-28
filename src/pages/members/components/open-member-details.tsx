import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IMember } from "@/interfaces/member.iterface";
import { FolderOpenIcon } from "lucide-react";
import { MemberAsideDetails } from "./aside/member-aside-details";

interface OpenMemberDetailsProps {
  member: IMember;
}
export function OpenMemberDetails({ member }: OpenMemberDetailsProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size={"icon"} variant={"ghost"}>
          <FolderOpenIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {member.name}, {member.lastName}
          </SheetTitle>
          <SheetDescription>
            <MemberAsideDetails member={member} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
