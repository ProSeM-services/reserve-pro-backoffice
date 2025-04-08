import { BackgroundMark } from "@/components/common/BackgroundMark";
import {
  IEnterprise,
  EnterpriseSchema,
} from "@/interfaces/enterprise.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { AddressInput } from "@/components/common/address-input";
import { setAuthInterceptor } from "@/config/axios.config";
import { useState } from "react";
import { EnterpiseServices } from "@/services/enterprise.services";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { AuthServices } from "@/services/auth.services";
import useFetchData from "@/hooks/useFetchData";

export function CreateBusinessPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<IEnterprise>({
    resolver: zodResolver(EnterpriseSchema),
    defaultValues: {
      address: "",
      name: "",
      email: "",
    },
  });

  const { toast } = useToast();
  const nav = useNavigate();
  const { fetchMemberLogged } = useFetchData();
  const onSubmit = async (values: IEnterprise) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      await setAuthInterceptor(accessToken);
      await EnterpiseServices.create(values);
      toast({
        title: "Empresa creada",
        description: `${values.name} fue creado exitosamente!`,
      });

      const res = await AuthServices.me();
      fetchMemberLogged(res);

      nav("/dashboard");
    } catch (error) {
      console.log("error Creating Enterprise : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex justify-center items-center h-full">
      <div className="absolute left-0 ">
        <BackgroundMark />
      </div>
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Crear Negocio</h1>
          <p className="text-gray-600">
            Completa el formulario para registrar tu negocio
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu negocio" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este será el nombre público de tu negocio.
                  </FormDescription>
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
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={() => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <AddressInput
                      value={form.getValues("address")}
                      handleSelect={(value: string) =>
                        form.setValue("address", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={loading}>
              Crear
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>
            ¿Tienes preguntas?{" "}
            <a href="/contact" className="text-blue-500 hover:underline">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
