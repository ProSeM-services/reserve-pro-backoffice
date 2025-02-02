import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ICompany } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { MemberServices } from "@/services/member.services";
import { CircleMinus } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memberAdpater } from "@/adapters/members.adapter";
/* Component to handle the action to remove one member from company */
export function RemoveMember({
  member,
  company,
}: {
  member: IMember;
  company: ICompany;
}) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const handleDeleteFromCompany = async () => {
    setDeleting(true);
    try {
      await MemberServices.removeFromCompany({
        companyId: company.id,
        userId: member.id,
      });
      toast({
        title: `${member.name}, ${member.lastName} elminado de ${company.name}`,
      });
    } catch (error) {
      toast({
        title: `Hubo un error al eilinar a ${member.name} de ${company.name}`,
      });
    } finally {
      setDeleting(false);
    }
  };

  const adaptedMember = memberAdpater(member);

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="p-0 size-7"
      onClick={handleDeleteFromCompany}
      isLoading={deleting}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleMinus className="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Remover a {adaptedMember.fullName} de {company.name}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Button>
  );
}
