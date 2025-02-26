import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import useFetchData from "@/hooks/useFetchData";
import { CompanyEditSchema, ICompany, IEditCompany } from "@/interfaces";
import { FilesServices } from "@/services/files.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function AddImageCompany({ company }: { company: ICompany }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(
        typeof company.image === "string" ? company.image : null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { editCompany } = useCreatingFetch();
    const { fetchCompanyData } = useFetchData();

    const form = useForm<IEditCompany>({
        resolver: zodResolver(CompanyEditSchema),
        defaultValues: {
            image: company.image
        }
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

    // const handleDeleteImage = async (index: number) => {

    //     const imageToDelete = preview[index]; //? Para eliminar imagen

    //     // Realizar la eliminación en AWS (asegúrate de implementar esta función en tu servicio)
    //     try {
    // // await FilesServices.upload(imageToDelete);   //?Aca esta la solucion para eliminar la imagen!!!!!!
    //         toast({
    //             title: "Imagen eliminada!",
    //             variant: "success",
    //         });
    //     } catch (error) {
    //         toast({
    //             title: "Error al eliminar la imagen del servidor",
    //             variant: "destructive",
    //         });
    //         return; // Opcional: podrías decidir no eliminar la imagen del estado local si falla la eliminación remota
    //     }

    //     setPreview((prev) => prev.filter((_, i) => i !== index));  //? Para eliminar la foto
    //     Si la imagen a eliminar proviene de los archivos recién seleccionados, también la removemos del estado files.
    //     setFiles((prev) => prev.filter((_, i) => i !== index));  //? Para eliminar la foto
    // };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (values: IEditCompany) => {
        console.log("VALUES : ", values);
        try {
            setLoading(true);
            let data = { ...values };

            if (files) {
                const imageData = await FilesServices.upload(files);
                data.image = imageData.url
            }

            await editCompany(company.id, data);
            await fetchCompanyData(company.id);
            toast({
                title: "Imagen(es) actualizada(s)!",
                variant: "success",
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

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4  overflow-auto max-h-[80vh]   "
        >

            {/* <div className="flex flex-wrap gap-2">
                {preview.map((img, index) => (
                    img && (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute bg-red-600 rounded-md p-1"
                            >
                                <Trash className="w-4 h-4 text-white" />
                            </button>
                            <img src={img} alt={`${index + 1}`} className="w-32 h-32 rounded-lg object-cover border" />
                        </div>
                    )))}
            </div> */}
            {preview && (
                <div className="relative">
                    <button
                        type="button"
                        className="absolute bg-red-600 rounded-md p-1"
                    >
                        <Trash className="w-4 h-4 text-white" />
                    </button>
                    <img src={preview} alt="Preview" className="w-32 h-32 rounded-lg object-cover border" />
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <Button onClick={handleButtonClick} variant="ghost" type="button" className="space-x-2 border">
                    <span>Agregar Imagenes</span>
                    <Paperclip className="size-4 text-primary" />
                </Button>
                <Input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />

                <div className="flex gap-2 ">
                    <Button type="button" variant={"outline"} className="w-1/4">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="flex-grow text-white"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Actualizar"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
