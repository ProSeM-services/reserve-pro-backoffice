import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getS3Url } from "@/lib/utils/s3-image";
import { Button } from "../ui/button";
import { TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface ImageDialogViewerProps {
  image: string;
  handleDelete: (img: string) => Promise<void>;
}
export function ImageDialogViewer({
  image,
  handleDelete,
}: ImageDialogViewerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteImage = async () => {
    try {
      setLoading(true);
      await handleDelete(image);
    } catch (error) {
      console.log("Error al borrrar imagen");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div>
            <img
              src={getS3Url(image)}
              alt="Preview"
              className="size-32 rounded-lg object-cover border"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Imagen</DialogTitle>

            <DialogDescription>
              <div className="flex flex-col gap-2 items-center">
                <div className="size-[450px] ">
                  <img
                    src={getS3Url(image)}
                    alt="Preview"
                    className="size-full rounded-lg object-cover border"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <>
                    <Button
                      type="button"
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => setOpen(!open)}
                    >
                      <span>Borrar Imagen</span>
                      <XIcon className="size-4" />
                    </Button>
                    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                      <DialogContent>
                        <div className="w-full max-w-md rounded-lg bg-white p-6 ">
                          <div className=" flex flex-col gap-4  items-center text-center ">
                            <TrashIcon className="h-16 w-16 text-destructive" />
                            <h1 className="text-2xl font-semibold text-gray-800">
                              Borrar Imagen
                            </h1>
                            <p className="text-sm text-gray-600">
                              Esta acción no se puede deshacer. ¿Estás seguro de
                              que deseas borrar esta imagen?
                            </p>

                            <Button
                              variant={"destructive"}
                              onClick={handleDeleteImage}
                              isLoading={loading}
                            >
                              {" "}
                              Eliminar
                            </Button>
                          </div>
                        </div>
                        <DialogClose
                          onClick={() => setOpen(false)}
                        ></DialogClose>
                      </DialogContent>
                    </Dialog>
                  </>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
