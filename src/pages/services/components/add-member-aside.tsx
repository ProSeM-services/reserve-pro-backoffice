import { useState } from "react";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IService } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { ServicesServices } from "@/services/services.services";
import { EmptyList } from "@/components/common/emty-list";
import { MemberAvatar } from "@/components/common/members/member-avatar";

export default function AddMembertoServiceAside({
  service,
  fetchServiceData,
}: {
  service: IService;
  fetchServiceData?: () => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  // const [members, setMembers] = useState<IMember[]>([]);
  const [selecetedMembers, setSelectedMembers] = useState<string[]>([]);
  const { members } = useAppSelector((s) => s.member);

  const { toast } = useToast();
  const handleSelectMember = (memberId: string) => {
    let res = [];
    if (selecetedMembers.includes(memberId)) {
      res = selecetedMembers.filter((e) => e !== memberId);
    } else {
      res = [...selecetedMembers, memberId];
    }

    setSelectedMembers(res);
  };
  const handleAddMembers = async (selecetedMembers: string[]) => {
    try {
      const allMembersToAdd = selecetedMembers.map((userId) =>
        ServicesServices.addMember({ serviceId: service.id!, userId })
      );
      await Promise.all(allMembersToAdd);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddSelectedMembers = async () => {
    setIsAdding(true);
    try {
      await handleAddMembers(selecetedMembers);
      toast({
        title: "Miembros cargados!",
        description: `Los miembros fueron agregados exitosamente a ${service.title}!`,
      });
      if (fetchServiceData) {
        fetchServiceData();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${service.title}!`,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  if (!service.id) return null;

  const membersOutOfServices = members.filter(
    (member) => !service.Users.some((e) => e.id === member.id)
  );

  if (membersOutOfServices.length === 0) {
    return (
      <div className="space-y-2 h-full max-h-full overflow-auto   ">
        <EmptyList type="no-members-to-add" />
      </div>
    );
  }
  return (
    <div className="space-y-2 h-full max-h-full overflow-auto   ">
      {membersOutOfServices?.map((member) => (
        <div
          className={`flex relative items-center gap-2 border rounded-md border-accent  cursor-pointer hover:bg-secondary transition-all duration-150 ${
            selecetedMembers.includes(member.id!)
              ? "border border-sky-300 "
              : ""
          }`}
          key={member.id}
          onClick={() => handleSelectMember(member.id!)}
        >
          <MemberAvatar member={member} size="sm" />
          <div className="flex items-center gap-1 ">
            <p>{member.name}</p>
            <p>{member.lastName}</p>
          </div>

          <span className="text-accent-foreground/50 text-xs">
            {member.email}
          </span>

          {selecetedMembers.includes(member.id!) && (
            <CheckCircleIcon className="text-primary absolute right-2  size-4" />
          )}
        </div>
      ))}

      <div className=" ">
        <Button
          onClick={handleAddSelectedMembers}
          disabled={selecetedMembers.length === 0}
          className="text-white"
          isLoading={isAdding}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
