import { BackgroundMark } from "@/components/common/BackgroundMark";
import {
  ICreateEnterprise,
  CreateEnterpriseSchema,
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
import { LoaderMain } from "@/components/common/loader-main";

export function CreateBusinessPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ICreateEnterprise>({
    resolver: zodResolver(CreateEnterpriseSchema),
    defaultValues: {
      address: "",
      name: "",
      email: "",
      company_count: 1,
    },
  });

  const { toast } = useToast();
  const nav = useNavigate();
  const onSubmit = async (values: ICreateEnterprise) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      await setAuthInterceptor(accessToken);
      await EnterpiseServices.create({
        ...values,
        company_count: Number(values.company_count),
      });

      toast({
        title: "Empresa creada",
        description: `${values.name} fue creado exitosamente! Es necesario que inicies sesión nuevamente para ver los cambios.`,
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
    <div className="mx-auto flex justify-center items-center h-full">
      <BackgroundMark />
      <div className="w-full max-w-lg bg-white border rounded-lg p-6 z-10">
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
