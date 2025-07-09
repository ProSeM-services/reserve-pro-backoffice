import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { IUpdateUser, UpdateUserSchema } from "@/interfaces";
import { MemberServices } from "@/services/member.services";
import { UserCog } from "lucide-react";

export function UpdateUser() {
  const { session } = useAppSelector((s) => s.session);
  const form = useForm<IUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: session?.name,
      lastName: session?.lastName,
      email: session?.email,
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onSubmit = async (values: IUpdateUser) => {
    const userId = session?.id;
    if (!userId) return;

    try {
      setLoading(true);

      await MemberServices.update(session.id, values);
      toast({
        title: "Acutailización de usuario",
        description: "Datos actualizados del usuario!",
      });
    } catch (error) {
      console.log("Error updating password", error);
      toast({
        title: "Error al actualizar usario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} />
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
                <Input placeholder="apellido" {...field} />
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
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={loading}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <UserCog className="size-4" /> <span>Actualizar usuario</span>
        </Button>
      </form>
    </Form>
  );
}
