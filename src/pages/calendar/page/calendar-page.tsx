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
import { useState } from "react";
import { IUser } from "@/interfaces";
import { useAppointmentsQuery } from "@/queries/appointments";
import { useMembersQuery } from "@/queries/members";

export function CalendarPage() {
  const { data } = useAppointmentsQuery();
  const { data: members = [] } = useMembersQuery();
  const appointments = data?.appointments || [];

  const [selectedMember, setSelectedMember] = useState<IUser>();

  const handleSelectMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    setSelectedMember(member);
  };

  const list = selectedMember
    ? appointments.filter((app) => app.UserId === selectedMember.id)
    : appointments;
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="flex-shrink-0">
        <Select onValueChange={handleSelectMember}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Profesionales" />
          </SelectTrigger>
          <SelectContent>
            <div>
              {members.map((member) => (
                <SelectItem value={member.id} key={member.id}>
                  <div className="flex items-center gap-2">
                    <MemberAvatar member={member} size="xs" />
                    <Label>{member.fullName}</Label>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-h-0">
        <CalendarAppointments appointments={list} />
      </div>
    </div>
  );
}
