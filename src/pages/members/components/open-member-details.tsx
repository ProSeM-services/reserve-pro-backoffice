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
import { EllipsisVertical } from "lucide-react";
import { MemberAsideDetails } from "./aside/member-aside-details";

interface OpenMemberDetailsProps {
  member: IMember;
}
export function OpenMemberDetails({ member }: OpenMemberDetailsProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} className="size-6 p-0">
          <EllipsisVertical className="size-4 " />
        </Button>
      </SheetTrigger>
      <SheetContent className="outline ">
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
