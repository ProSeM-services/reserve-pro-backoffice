import { MemberAvatar } from "@/components/common/members/member-avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useSession from "@/hooks/useSession";
import { IUser } from "@/interfaces";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useMembersQuery } from "@/queries/members";

export function MemberSelector({
  onChange,
}: {
  onChange: (member: IUser | "all") => void;
}) {
  const { member } = useSession();
  const { data: members = [] } = useMembersQuery();
  const [ableToSelect, setAbleToSelect] = useState(false);
  const [selected, setSelected] = useState<IUser | "all" | undefined>();

  useEffect(() => {
    if (!member) return;
    if (member.role === "ADMIN" || member.role === "OWNER") {
      setAbleToSelect(true);
      return;
    }
    onChange(member as IUser);
    setSelected(member as IUser);
    setAbleToSelect(false);
  }, [member]);

  const handleSelectMember = (id: string) => {
    if (id === "all") {
      setSelected("all");
      onChange("all");
      return;
    }

    const selectedMember = members.find((e) => e.id === id);
    if (!selectedMember) return;
    setSelected(selectedMember);
    onChange(selectedMember);
  };
  return (
    <Select
      onValueChange={(value) => handleSelectMember(value)}
      disabled={!ableToSelect}
    >
      <SelectTrigger className="h-12 px-4 space-x-4 w-full">
        {selected === "all" ? (
          <div className="flex gap-2 cursor-pointer">
            <UsersRound />
            <div className="flex flex-col items-start">
              <Label>Todos</Label>
              <span>turnos de todos los miembros</span>
            </div>
          </div>
        ) : selected ? (
          <div className="flex gap-2 ">
            <MemberAvatar member={selected} size="xs" />
            <div className="flex flex-col items-start">
              <Label>{selected.fullName}</Label>
              <span>{selected.email}</span>
            </div>
          </div>
        ) : null}
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
          <SelectItem value={member.id} key={member.id}>
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
