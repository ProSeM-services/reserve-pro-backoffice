import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSession from "@/hooks/useSession";

export function MemberSelector() {
  const { member } = useSession();
  return (
    <Select>
      <SelectTrigger className="p-4 h-12 border-none space-x-2">
        <SelectValue>
          <div className="flex gap-2 ">
            <MemberAvatar member={member} size="xs" />
            <div className="flex flex-col">
              <Label>{member.fullName}</Label>
              <span>{member.email}</span>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
