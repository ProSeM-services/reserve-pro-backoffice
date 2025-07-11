import { IService } from "@/interfaces";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDeletingFetch from "@/hooks/useDeletingFetch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function DeleteService({ service }: { service: IService }) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const { deleteService } = useDeletingFetch();

  const handleDelete = async () => {
    setDeleting(true);

    try {
      if (!service.id) {
        return toast({
          title: `Error al eliminar el servicio "${service.title}"`,
          description: "",
          variant: "destructive",
        });
        return;
      } else if (service.Users?.length > 0) {
        toast({
          title: `Error al eliminar el servicio ${service.title}`,
          description: "Debe eliminar a los empleados del servicio",
          variant: "destructive",
        });
        return;
      }
      await deleteService(service.id);

      toast({
        title: "Servicio eliminado!",
        description: `El servicio "${service.title}" ha sido eliminado correctamente.`,
      });
    } catch (error) {
      console.log("errrer", error);
      toast({
        title: `Error al elimnar el servicio ${service.title}`,
        description: "Intentar mas tarde",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 p-2 text-sm">
          <span className="max-md:hidden">Eliminar</span>
          <TrashIcon className="size-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que desea eliminar el servicio {service.title} ?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente el
            servicio y eliminará sus datos de nuestros servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 justify-end  ">
          <Button
            size={"sm"}
            variant={"destructive"}
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Eliminando..." : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
