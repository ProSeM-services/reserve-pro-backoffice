import {
  CreateServiceZodSchema,
  ICreateService,
  Provision,
  PROVISION_VALUES,
} from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

export function EditServicesForm() {
  const { asideService } = useAppSelector((s) => s.service);
  const { toast } = useToast();
  const { editService } = useCreatingFetch();
  const [loading, setLoading] = useState(false);
  const [selectedProvision, setSelectedProvision] =
    useState<Provision>("Presencial");
  const form = useForm<ICreateService>({
    resolver: zodResolver(CreateServiceZodSchema),
    mode: "onChange",
    defaultValues: asideService,
  });
  const onSubmit = async (values: ICreateService) => {
    if (!asideService) return;
    try {
      setLoading(true);
      await editService(asideService.id, values);
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
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 w-1/3 ml-auto ">
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
