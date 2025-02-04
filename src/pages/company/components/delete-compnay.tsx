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
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import useDeletingFetch from "@/hooks/useDeletingFetch";
export function DeleteCompany({ company }: { company: ICompany }) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const router = useNavigate();
  const { deleteCompany } = useDeletingFetch();
  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (company.Users && company.Users?.length > 0) {
        return toast({
          title: `Error al elimnar surcursal ${company.name}`,
          description: "Por favor, eliminar los miembros de esta sucursal,",
          variant: "destructive",
        });
      }
      const res = await deleteCompany(company.id);
      console.log("RES", res);
      toast({
        title: "Sucursal elimnada!",
      });
      router("/company");
    } catch (error) {
      console.log("errrer", error);
      toast({
        title: `Error al elimnar surcursal ${company.name}`,
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
        <Button variant={"destructive"} className="flex items-center gap-2">
          <span className="max-md:hidden">Eliminar</span>
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que desea eliminar la sucursal {company.name} ?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente la
            sucursal y eliminará sus datos de nuestros servidores.
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
