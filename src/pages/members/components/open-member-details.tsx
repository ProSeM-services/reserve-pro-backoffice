import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, XIcon } from "lucide-react";
import { MemberAsideDetails } from "./aside/member-aside-details";
import { IUser } from "@/interfaces";

interface OpenMemberDetailsProps {
  member: IUser;
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
        <section className=" flex justify-between">
          <SheetTitle>
            {" "}
            {member.name}, {member.lastName}
          </SheetTitle>
          <SheetTrigger>
            <XIcon />
          </SheetTrigger>
        </section>
        <SheetDescription>
          <MemberAsideDetails member={member} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
