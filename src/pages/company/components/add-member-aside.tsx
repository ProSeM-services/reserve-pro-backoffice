import { useEffect, useState } from "react";
import { IMember } from "@/interfaces/member.iterface";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { BarLoader } from "@/components/common/bar-loader";
import { MemberServices } from "@/services/member.services";
import { MemberCard } from "@/pages/members/components/member-card";
import { EmptyList } from "@/components/common/emty-list";
import useCreatingFetch from "@/hooks/useCreatingFetch";

export function AddMemberAside({ company }: { company: ICompany }) {
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [selecetedMembers, setSelectedMembers] = useState<string[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await MemberServices.getFree();
        console.log({ ADD_MEMBERS: response });
        setMembers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isAdding) fetchMembers();
  }, [isAdding]);
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
  const { addMembersToCompany } = useCreatingFetch();
  const handleAddMembers = async () => {
    setIsAdding(true);
    try {
      await addMembersToCompany(selecetedMembers, company.id);
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
      {loading ? <BarLoader /> : null}
      {!loading && members && !members.length ? (
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
