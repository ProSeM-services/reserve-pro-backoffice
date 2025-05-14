import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import useFetchData from "@/hooks/useFetchData";
import { CompanyEditSchema, ICompany, IEditCompany } from "@/interfaces";
import { getS3Url } from "@/lib/utils/s3-image";
import { FilesServices } from "@/services/files.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeIcon, Paperclip, TrashIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export function AddImageCompany({ company }: { company: ICompany }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    company.image && typeof company.image === "string"
      ? getS3Url(company.image)
      : null
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { editCompany } = useCreatingFetch();
  const { fetchCompanyData } = useFetchData();

  const form = useForm<IEditCompany>({
    resolver: zodResolver(CompanyEditSchema),
    defaultValues: {
      image: company.image,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files?.[0];
    if (!selectedFiles) return;

    if (!selectedFiles.type.startsWith("image/")) {
      toast({
        title: "Formato no válido",
        description: "Por favor selecciona solo imágenes.",
        variant: "destructive",
      });
      return;
    }

    setFiles(selectedFiles);

    // Generar vista previa
    const reader = new FileReader();
    reader.readAsDataURL(selectedFiles);
    reader.onload = () => setPreview(reader.result as string);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: IEditCompany) => {
    try {
      setLoading(true);
      let data = { ...values };

      if (files) {
        const imageData = await FilesServices.upload(files);
        data.image = imageData.fileName;
      }

      await editCompany(company.id, data);
      await fetchCompanyData(company.id);
      toast({
        title: "Imagen(es) actualizada(s)!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error!",
        variant: "destructive",
      });
      console.log("Error creating Member, ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetImages = () => {
    setPreview(company.image ? getS3Url(company.image) : null);
    setFiles(null);
  };

  const handleDeleteImage = async () => {
    try {
      setDeletingImage(true);
      if (company.image) {
        await FilesServices.detele(company.image);
        await editCompany(company.id, { image: "" });
      }
      setPreview(null);
      setFiles(null);
    } catch (error) {
      console.log("Error deleting image", error);
    } finally {
      setDeletingImage(false);
      setOpen(false);
    }
  };
  const handleResetImageFile = () => {
    if (company.image) {
      setOpen(true);
      return;
    }
  };
  const isOriginalImage =
    company.image && preview === getS3Url(company.image) ? true : false;

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="size-24 rounded-lg object-cover border"
            />
          ) : (
            <HomeIcon className="size-24" />
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Imagen de la sucursal: {company.name}</DialogTitle>
            <p className="text-gray-600 text-sm">
              Esta será la imágen principal de la sucursal.
            </p>
            <DialogDescription>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2 items-center"
              >
                <div className="size-[450px] ">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="size-full rounded-lg object-cover border"
                    />
                  ) : (
                    <Button
                      onClick={handleButtonClick}
                      variant="ghost"
                      type="button"
                      className="space-x-2 size-full border-dashed border-2"
                    >
                      <p>cargar imgaen</p>
                      <Paperclip className="size-4 text-primary" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />

                  {preview && !isOriginalImage ? (
                    <div className="flex gap-2 ">
                      <Button
                        type="button"
                        variant={"outline"}
                        className="w-1/4"
                        onClick={handleResetImages}
                      >
                        x
                      </Button>
                      <Button
                        type="submit"
                        className="flex-grow text-white"
                        disabled={loading}
                      >
                        {loading ? "Cargando..." : "Guardar"}
                      </Button>
                    </div>
                  ) : preview ? (
                    <>
                      <Button
                        onClick={handleButtonClick}
                        variant="ghost"
                        type="button"
                        className="space-x-2 border"
                      >
                        <p>Cambiar imagen</p>
                        <Paperclip className="size-4 text-primary" />
                      </Button>
                      <Button
                        type="button"
                        size={"sm"}
                        variant={"destructive"}
                        onClick={handleResetImageFile}
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
                                Esta acción no se puede deshacer. ¿Estás seguro
                                de que deseas borrar esta imagen?
                              </p>

                              <Button
                                variant={"destructive"}
                                onClick={handleDeleteImage}
                                isLoading={deletingImage}
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
                  ) : null}
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
