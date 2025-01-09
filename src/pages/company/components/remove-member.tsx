import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ICompany } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { MemberServices } from "@/services/member.services";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

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
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="p-0 size-7"
      onClick={handleDeleteFromCompany}
      isLoading={deleting}
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
