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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  CreateMemberZodSchema,
  ICreateMember,
} from "@/interfaces/member.iterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaselineIcon, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { ROLES_VALUES } from "@/lib/constants/role";
const INITIAL_MEMBER_DATA: ICreateMember = {
  email: "",
  lastName: "",
  name: "",
  password: "",
  role: "BASIC",
  companyName: "",
  userName: "",
  image: "",
  phone: "",
  workhours: [],
};
export function MemberForm() {
  const { toast } = useToast();
  const { createMember } = useCreatingFetch();
  const [loading, setLoading] = useState(false);
  const form = useForm<ICreateMember>({
    resolver: zodResolver(CreateMemberZodSchema),
    defaultValues: INITIAL_MEMBER_DATA,
  });
  const onSubmit = async (values: ICreateMember) => {
    try {
      setLoading(true);
      await createMember(values);
      toast({
        title: "Miembro agregado exitosamente!",
        description: `Se agregó ${values.name} a tu lista de miembros`,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error al crear un miembro!",
        // @ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
      console.log("Error creating Member, ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex flex-col text-sm ">
            <p className="font-medium">Informacion personal</p>
            <span className="font-light ">
              {" "}
              Completar con la información personal del nuevo miembro
            </span>
          </div>

          <section className="w-full flex items-center gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="w-full flex items-center gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Núemro de celular</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormField
            control={form.control}
            name="role"
            render={() => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select>
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
        </section>

        <hr className="border-accent" />

        <section className=" space-y-3">
          <div className="flex flex-col  text-sm ">
            <p className="font-medium">Informacion de accesso</p>
            <span className="font-light">
              {" "}
              Definir las claves de accesso para {form.getValues("name")}{" "}
              {form.getValues("lastName")}
            </span>
          </div>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de usuario"
                    autoComplete="off"
                    {...field}
                    name="prevent-auto-complete-1"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    autoComplete="off"
                    {...field}
                    name="prevent-auto-complete"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 ">
            <Button type="button" variant={"outline"} className="w-1/4">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-grow text-white"
              isLoading={loading}
              disabled={loading}
            >
              Crear
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
