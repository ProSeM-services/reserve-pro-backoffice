import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  EditMemberZodSchema,
  IEditMember,
  IMember,
  Role,
  ROLES_VALUES,
} from "@/interfaces/member.iterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BaselineIcon, Paperclip, ShieldCheck, XIcon } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { useToast } from "@/components/ui/use-toast";
import { FilesServices } from "@/services/files.services";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
export function MemberAsideDetails({ member }: { member: IMember }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { editMember } = useCreatingFetch();
  const { fetchMembers } = useFetchData();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    member.image ? member.image : null
  );
  const form = useForm<IEditMember>({
    resolver: zodResolver(EditMemberZodSchema),
    defaultValues: { ...member },
  });

  const onSubmit = async (values: IEditMember) => {
    console.log("VALUES : ", values);
    try {
      setLoading(true);
      let data = values;
      if (file) {
        const imageData = await FilesServices.upload(file);
        data = { ...values, image: imageData.url };
      }
      await editMember(member.id, data);
      await fetchMembers();
      toast({
        title: "Miembro actualizado!",
        description: `Se actualizaron los datos de ${values.name} ${values.lastName}  `,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error al editar un miembro!",
        variant: "destructive",
      });
      console.log("Error creating Member, ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result as string);
      fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
    } else {
      setPreview(null);
    }
  };
  const handleResetImageFile = () => {
    setPreview(member.image ? member.image : null);
    setFile(null);
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  console.log(form.formState.isDirty);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <header className="flex gap-4 items-start">
          <div className=" space-y-2">
            <div className="">
              <Avatar className="size-40  rounded-lg">
                <AvatarImage
                  src={preview ? preview : ""}
                  className=" aspect-square object-cover"
                  alt={`image ${member.name}'s profile`}
                />
                <AvatarFallback className="rounded-lg uppercase">
                  {member.name[0]}
                  {member.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col">
              <Button
                onClick={handleButtonClick}
                variant={"ghost"}
                type="button"
                className="space-x-2"
              >
                <span>Actualizar Imagen</span>
                <Paperclip className="size-4 text-primary" />
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {preview && preview !== member.image && (
                <Button
                  type="button"
                  size={"sm"}
                  variant={"destructive"}
                  onClick={handleResetImageFile}
                >
                  <span>Borrar Imagen</span>
                  <XIcon className="size-4" />
                </Button>
              )}
            </div>
          </div>
          <section className="space-y-4 flex-grow">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </header>

        <section className="flex gap-4">
          <div className="space-y-2 flex-grow">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="+1 ********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(e) => form.setValue("role", e as Role)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES_VALUES.map((role) => (
                          <SelectItem value={role} key={role}>
                            <div className="flex gap-1 items-center">
                              {role === "ADMIN" ? (
                                <ShieldCheck />
                              ) : (
                                <BaselineIcon />
                              )}
                              {role}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Separator />

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 ">
            <Button type="button" variant={"outline"} className="w-1/4">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-grow text-white"
              isLoading={loading}
              disabled={!form.formState.isDirty || loading}
            >
              Actualizar
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
