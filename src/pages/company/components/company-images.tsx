import { LoaderSpinner } from "@/components/common/loader-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { ICompany } from "@/interfaces";
import { getS3Url } from "@/lib/utils/s3-image";
import { FilesServices } from "@/services/files.services";
import { PlusCircle, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";

interface CompanyImagesProps {
  company: ICompany;
}

export function CompanyImages({ company }: CompanyImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<{ name: string; src: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const originalImages = company?.images ? company.images : [];
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) return;
    setFiles((s) => [...s, selectedFile]);
    const fileReader = new FileReader();
    fileReader.onload = () =>
      setPreview((s) => [
        ...s,
        { src: fileReader.result as string, name: selectedFile.name },
      ]);
    fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
  };

  const { toast } = useToast();
  const handleDeleteImages = (value: string) => {
    setFiles((s) => s.filter((f) => f.name !== value));
    setPreview((s) => s.filter((f) => f.name !== value));
  };
  const { editCompany } = useCreatingFetch();
  const onSubmit = async () => {
    if (files.length === 0) return;
    try {
      setLoading(true);
      const allImagesToAdd = files.map((value) => FilesServices.upload(value));
      const response = await Promise.all(allImagesToAdd);

      const data = { images: response.map((re) => re.fileName) };

      await editCompany(company.id, data);

      console.log("company data", company);
      setPreview([]);
      toast({
        title: "Sucursal Actualizada!",
        description: `La sucursal ${company.name} fue actualizada correctamente.`,
      });
    } catch (error) {
      console.error("Error creating services ---- > ", error);
      toast({
        title: "Error al crear!",
        description: "Vuelve a intentar en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center justify-between">
        <Label>Imagenes del negocio</Label>
        <Button
          disabled={files.length === 0}
          onClick={onSubmit}
          isLoading={loading}
        >
          Guardar Imagen(es)
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {originalImages &&
          originalImages.length > 0 &&
          originalImages.map((image, index) => (
            <img
              key={index}
              src={getS3Url(image)}
              alt={`Imagen ${index + 1}`}
              className="w-32 h-32 object-cover rounded"
            />
          ))}
        {preview.length > 0 && (
          <div className="flex gap-2 items-center">
            {preview.map(({ name, src }) => (
              <div>
                {!loading ? (
                  <div className="relative">
                    {" "}
                    <img
                      src={src}
                      alt="algo"
                      className="size-32 object-cover"
                    />
                    <Button
                      className="size-6 p-0 aspect-square absolute top-2 right-2"
                      variant={"secondary"}
                      type="button"
                      onClick={() => handleDeleteImages(name)}
                    >
                      <TrashIcon className="size-4 as" />
                    </Button>{" "}
                  </div>
                ) : (
                  <div className="size-32 bg-accent/50 rounded flex items-center justify-center">
                    <LoaderSpinner />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <Button
          variant={"secondary"}
          className="size-32  "
          onClick={handleButtonClick}
        >
          <PlusCircle className=" text-gray-500 " />
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
