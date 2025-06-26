import { useForm } from "react-hook-form";
import {
  CreatePaymentPlan,
  CreatePaymentPlanSchema,
} from "@/interfaces/payment-plans.interface";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useState } from "react";
import { PaymentPlanServices } from "@/services/payment-plans.service";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { addPaymentPlan } from "@/store/feature/payment-plans/paymentPlanSlice";

export function CreatePaymentPlanForm() {
  const form = useForm<CreatePaymentPlan>({
    resolver: zodResolver(CreatePaymentPlanSchema),
    defaultValues: {
      description: "",
      duration: 1,
      isActive: true,
      name: "",
      price: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const onSubmit = async (data: CreatePaymentPlan) => {
    try {
      setLoading(true);

      const newPlan = await PaymentPlanServices.create(data);
      toast({
        title: "Plan Nuevo creado",
        description: "",
      });

      dispatch(addPaymentPlan(newPlan));
    } catch (error) {
      console.log("Error creating new plan", error);

      toast({
        title: "Error al crear el nuevo plan",
        description: "revisar la consola",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        className="border  flex flex-col items-center gap-4 p-4"
      >
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
          name="duration"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Duracion</FormLabel>
              <FormControl>
                <Input
                  placeholder="Meses"
                  {...field}
                  type="number"
                  onChange={(e) => handleDuration(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Mes/Meses de periodo de uso</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Precio"
                  {...field}
                  type="number"
                  onChange={(e) => handlePrice(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                {form.getValues("price")
                  ? `ARS ${formatCurrency(form.getValues("price"))}`
                  : null}
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Dedscrpcion</FormLabel>
              <FormControl>
                <Input placeholder="Descripcion" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
