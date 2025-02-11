import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useSession from "@/hooks/useSession";
import { IMember } from "@/interfaces/member.iterface";
import { setSelectedMemberForAppointments } from "@/store/feature/appointnments/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

export function MemberSelector() {
  const { member } = useSession();
  const { members } = useAppSelector((s) => s.member);
  const { selectedMemberForAppointments } = useAppSelector(
    (s) => s.appointments
  );
  const [ableToSelect, setAbleToSelect] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!member) return;
    if (member.role === "ADMIN" || member.role === "OWNER") {
      setAbleToSelect(true);

      return;
    }
    if (!member) return;
    dispatch(setSelectedMemberForAppointments(member as IMember));
    setAbleToSelect(false);
  }, []);

  const handleSelectMember = (id: string) => {
    if (id === "all") {
      dispatch(setSelectedMemberForAppointments(id));
      return;
    }

    const member = members.find((e) => e.id === id);
    if (!member) return;
    dispatch(setSelectedMemberForAppointments(member));
  };
  return (
    <Select
      onValueChange={(value) => handleSelectMember(value)}
      disabled={!ableToSelect}
    >
      <SelectTrigger className="h-12 px-4 space-x-4 w-full">
        {selectedMemberForAppointments === "all" ? (
          <div className="flex gap-2 cursor-pointer">
            <UsersRound />
            <div className="flex flex-col items-start">
              <Label>Todos</Label>
              <span>turnos de todos los miembros</span>
            </div>
          </div>
        ) : (
          selectedMemberForAppointments && (
            <div className="flex gap-2 ">
              <MemberAvatar member={selectedMemberForAppointments} size="xs" />
              <div className="flex flex-col items-start">
                <Label>{selectedMemberForAppointments.fullName}</Label>
                <span>{selectedMemberForAppointments.email}</span>
              </div>
            </div>
          )
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>
          <div className="flex gap-2 cursor-pointer">
            <UsersRound />
            <div className="flex flex-col">
              <Label>Todos</Label>
              <span>turnos de todos los miembros</span>
            </div>
          </div>
        </SelectItem>
        {members.map((member) => (
          <SelectItem value={member.id}>
            <div className="flex items-center gap-2 cursor-pointer">
              <MemberAvatar member={member} size="xs" />
              <Label>{member.fullName}</Label>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
