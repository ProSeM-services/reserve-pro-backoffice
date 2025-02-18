import { useAppSelector } from "@/store/hooks";
import { CalendarAppointments } from "../components/calendar/calendar-appointmnets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";

export function CalendarPage() {
  const { appointments } = useAppSelector((s) => s.appointments);
  const { members } = useAppSelector((s) => s.member);

  return (
    <div className="size-full">
      <Select>
        <SelectTrigger className="w-1/3 ">
          <SelectValue placeholder="Profesionales" />
        </SelectTrigger>
        <SelectContent>
          <div>
            {members.map((member) => (
              <SelectItem value={member.name}>
                <div className="flex items-center gap-2">
                  <MemberAvatar member={member} size="xs" />
                  <Label>{member.fullName}</Label>
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      <CalendarAppointments appointments={appointments} />
    </div>
  );
}
