import { useForm } from "react-hook-form";
import {
  IUpdatePassword,
  UpdatePasswordSchema,
} from "../../interfaces/update-passowrd.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import useSession from "@/hooks/useSession";
import { useToast } from "@/components/ui/use-toast";
import { AuthServices } from "@/services/auth.services";
import { Shield } from "lucide-react";

export function UpdatePasswordForm() {
  const form = useForm<IUpdatePassword>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      confirmNewPassowrd: "",
      newPassword: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const { toast } = useToast();
  const onSubmit = async (values: IUpdatePassword) => {
    const userId = session?.id;
    if (!userId) return;

    const { password, newPassword } = values;
    try {
      setLoading(true);

      await AuthServices.updatePassword({
        password,
        newPassword,
        userId,
      });
      toast({
        title: "Acutailización de usuario",
        description: "Contreseña actualizada exitósamente!",
      });
    } catch (error) {
      console.log("Error updating password", error);
      toast({
        title: "Error al actualizar la contraseña",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña Actual</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Ingresa el valor de tu contraseña actual, sin este valor no
                podrás actualizar tu contraseña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña Nueva</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassowrd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña Nueva</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} type="password" />
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
          <Shield className="size-4" /> <span>Actualizar contraseña</span>
        </Button>
      </form>
    </Form>
  );
}
