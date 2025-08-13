import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { IUser } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import useDeletingFetch from "@/hooks/useDeletingFetch";
export function DeleteMember({ member }: { member: IUser }) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const { deletMember } = useDeletingFetch();
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deletMember(member.id);
      toast({
        title: "Miembro elimnado!",
      });
    } catch (error) {
      console.log("errrer", error);
      toast({
        title: `Error al elimnar surcursal ${member.fullName}`,
        description: "Intentar mas tarde",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"destructive"}
          className="flex items-center gap-2"
          size={"icon"}
        >
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que desea eliminar al miembro {member.fullName} ?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente al
            miembro y eliminará sus datos de nuestros servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 justify-end  ">
          <Button
            size={"sm"}
            variant={"destructive"}
            isLoading={deleting}
            onClick={handleDelete}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
