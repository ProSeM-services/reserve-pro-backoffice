import { UpdateUserSchema, IUser } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { BackgroundMark } from "@/components/common/BackgroundMark";
import { LoaderMain } from "@/components/common/loader-main";
import { setAuthInterceptor } from "@/config/axios.config";
import { Paperclip, UserCircle } from "lucide-react";
import { FilesServices } from "@/services/files.services";
import { MemberServices } from "@/services/member.services";
import { Label } from "@/components/ui/label";

interface CreateProfessionalFormProps {
  user: IUser;
}

export function CreateProfessionalForm({ user }: CreateProfessionalFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<IUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      ...user,
      account_type: "PROFESSIONAL",
      image: "",
    },
  });

  const { toast } = useToast();
  const nav = useNavigate();

  const onSubmit = async (values: IUser) => {
    const accessToken = localStorage.getItem("accessToken");
    let data = values;
    try {
      setLoading(true);
      await setAuthInterceptor(accessToken);
      if (file) {
        const imageData = await FilesServices.upload(file);
        data = { ...values, image: imageData.fileName };
      }

      await MemberServices.update(user.id, data);
      toast({
        title: "Perfil profesional creado",
        description: `Cambios realizados exitosamente! Es necesario que inicies sesión nuevamente para ver los cambios.`,
      });

      localStorage.clear();
      nav("/login");
    } catch (error) {
      console.log("error Creating Enterprise : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => setImagePreview(fileReader.result as string);
      fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
    } else {
      setImagePreview(null);
    }
  };

  if (loading) {
    return (
      <div className="">
        <BackgroundMark />
        <LoaderMain />
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Perfil Profesional</h1>
        <p className="text-gray-600">
          Completa el formulario para completar tu perfil profesional.
          <br /> Recuerda que es necesario que inicies sesión nuevamente para
          ver los cambios.
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Label>Imagen de Perfil</Label>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-full border"
                />
              ) : (
                <UserCircle className="size-32" />
              )}
              <Button
                onClick={handleButtonClick}
                variant={"ghost"}
                type="button"
                className="space-x-2"
              >
                <span>{imagePreview ? "Actualizar" : "Cargar"} Imagen</span>
                <Paperclip className="size-4 text-primary" />
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Crear Perfil Profesional</Button>
        </form>
      </Form>
    </div>
  );
}
