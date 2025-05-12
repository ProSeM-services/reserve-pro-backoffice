import {
  IUpdateService,
  Provision,
  PROVISION_VALUES,
  UpdateServiceZodSchema,
} from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { useAppSelector } from "@/store/hooks";
import { Paperclip, TrashIcon } from "lucide-react";
import { FilesServices } from "@/services/files.services";
import { getS3Url } from "@/lib/utils/s3-image";

export function EditServicesForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File[]>([]);
  const { asideService } = useAppSelector((s) => s.service);
  const [preview, setPreview] = useState<{ name: string; src: string }[]>([]);

  const originalImages = asideService?.images ? asideService.images : [];

  const { toast } = useToast();
  const { editService } = useCreatingFetch();
  const [loading, setLoading] = useState(false);
  const [selectedProvision, setSelectedProvision] =
    useState<Provision>("Presencial");
  const form = useForm<IUpdateService>({
    resolver: zodResolver(UpdateServiceZodSchema),
    mode: "onChange",
    defaultValues: {
      ...asideService,
      images: asideService?.images ? asideService?.images : [],
    },
  });

  const onSubmit = async (values: IUpdateService) => {
    if (!asideService) return;
    try {
      setLoading(true);
      let data = values;
      if (file.length > 0) {
        const allImagesToAdd = file.map((value) => FilesServices.upload(value));
        const response = await Promise.all(allImagesToAdd);
        setPreview([]);
        data = { ...values, images: response.map((re) => re.fileName) };
      }

      await editService(asideService.id, data);
      toast({
        title: "Servicio Actualizado!",
        description: `El servicio ${values.title} fue actualizado.`,
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

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectProvision = (provision: Provision) => {
    form.clearErrors("provision");
    form.setValue("provision", provision);
    setSelectedProvision(provision);
  };

  const handlePrice = (price: number) => {
    form.clearErrors("price");
    form.setValue("price", price);
  };

  const handleDuration = (duration: number) => {
    form.clearErrors("duration");
    form.setValue("duration", duration);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) return;
    setFile((s) => [...s, selectedFile]);
    const fileReader = new FileReader();
    fileReader.onload = () =>
      setPreview((s) => [
        ...s,
        { src: fileReader.result as string, name: selectedFile.name },
      ]);
    fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
  };

  const handleDeleteImages = (value: string) => {
    console.log({ value, file });
    setFile((s) => s.filter((f) => f.name !== value));
    setPreview((s) => s.filter((f) => f.name !== value));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre/Tiulo del servicio" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormDescription className="text-xs">
                  En minutos
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Duracion del servicio"
                    type="number"
                    value={field.value}
                    onChange={(e) => handleDuration(parseInt(e.target.value))}
                    // {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Precio del servicio"
                    type="number"
                    value={field.value}
                    onChange={(e) => handlePrice(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provision"
            render={() => (
              <FormItem>
                <FormLabel>Tipo de prestación</FormLabel>
                <div className="flex w-max   flex-wrap max-w-full gap-2">
                  {PROVISION_VALUES.map((provision) => (
                    <div
                      key={provision}
                      onClick={() => handleSelectProvision(provision)}
                      className={`${
                        selectedProvision === provision
                          ? "bg-primary text-white"
                          : " bg-accent text-foreground/50"
                      }  p-2 rounded-md px-4  cursor-pointer select-none transition-all duration-200  `}
                    >
                      {provision}
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <hr />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripcion</FormLabel>
                <FormDescription className="text-sm">
                  Agrega una descripción del servicio para que el cliente pueda
                  tener más detalle de qué trata el mismo.
                </FormDescription>
                <FormControl>
                  <Input placeholder="Descrpicion del servicio" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Imágenes</FormLabel>
            <FormDescription className="text-sm">
              Agrega imagenes del servicio ofrecido para que el cliente pueda
              tener una referencia visual sobre el misno.
            </FormDescription>
            <div className="flex">
              {originalImages.length > 0 && (
                <div className="flex gap-2 items-center">
                  {originalImages.map((src) => (
                    <div className="relative">
                      <img
                        src={getS3Url(src)}
                        alt="algo"
                        className="size-32 object-cover"
                      />
                      <Button
                        className="size-6 p-0 aspect-square absolute top-2 right-2"
                        variant={"destructive"}
                        type="button"
                        // onClick={() => handleDeleteImages(src)}
                      >
                        <TrashIcon className="size-4 as" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {preview.length > 0 && (
                <div className="flex gap-2 items-center">
                  {preview.map(({ name, src }) => (
                    <div className="relative">
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
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleButtonClick}
              variant={"ghost"}
              type="button"
              className="space-x-2"
              disabled={originalImages.length + preview.length === 3}
            >
              <span>Agregar Imagen</span>
              <Paperclip className="size-4 text-primary" />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 w-1/3 ml-auto ">
            <Button
              type="submit"
              className="flex-grow text-white"
              isLoading={loading}
              disabled={loading}
            >
              Actualizar
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
