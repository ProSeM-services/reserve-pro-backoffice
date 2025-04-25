import { UserZod, UserZodSchema } from "@/interfaces";
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
import { useState } from "react";
import { BackgroundMark } from "@/components/common/BackgroundMark";
import { LoaderMain } from "@/components/common/loader-main";
import { setAuthInterceptor } from "@/config/axios.config";
interface CreateProfessionalFormProps {
  user: UserZod;
}
export function CreateProfessionalForm({ user }: CreateProfessionalFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserZod>({
    resolver: zodResolver(UserZodSchema),
    defaultValues: {
      ...user,
    },
  });

  const { toast } = useToast();
  const nav = useNavigate();
  const onSubmit = async (values: UserZod) => {
    console.log("user values, values", values);
    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      await setAuthInterceptor(accessToken);

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

  if (loading) {
    return (
      <div className="mx-auto flex justify-center items-center h-full">
        <BackgroundMark />
        <LoaderMain />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                <Input placeholder="Nombre" {...field} />
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
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Crear Perfil Profesional</Button>
      </form>
    </Form>
  );
}
