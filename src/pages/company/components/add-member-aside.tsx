import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { BarLoader } from "@/components/common/bar-loader";
import { MemberCard } from "@/pages/members/components/member-card";
import { EmptyList } from "@/components/common/emty-list";
import {
  useAddMemberToCompanyMutation,
  useFreeMembersQuery,
} from "@/queries/members";

export function AddMemberAside({ company }: { company: ICompany }) {
  const [isAdding, setIsAdding] = useState(false);
  const [selecetedMembers, setSelectedMembers] = useState<string[]>([]);
  const { data: members = [], isLoading: membersLoading } = useFreeMembersQuery({
    enabled: !isAdding,
  });
  const addMemberToCompanyMutation = useAddMemberToCompanyMutation();
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
  const handleAddMembers = async () => {
    setIsAdding(true);
    try {
      await Promise.all(
        selecetedMembers.map((userId) =>
          addMemberToCompanyMutation.mutateAsync({
            companyId: company.id,
            userId,
          })
        )
      );
      toast({
        title: "Miembros cargados!",
        description: `Los miembros fueron agregados exitosamente a ${company.name}!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${company.name}!`,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  if (!company.id) return null;

  return (
    <div className="space-y-2 h-full max-h-full overflow-auto  ">
      {membersLoading ? <BarLoader /> : null}
      {!membersLoading && members && !members.length ? (
        <EmptyList type="no-members-to-add" />
      ) : (
        members?.map((member) => (
          <div
            className={`cursor-pointer border border-transparent rounded-lg ${
              selecetedMembers.includes(member.id) ? "bg-sky-400  " : ""
            }`}
            key={member.id}
            onClick={() => handleSelectMember(member.id!)}
          >
            <MemberCard member={member} key={member.id} type="read" />
          </div>
        ))
      )}

      <div className="absolute bottom-1 right-1  ">
        <Button
          onClick={handleAddMembers}
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
