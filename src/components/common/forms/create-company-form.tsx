import { CreateCompanyZodSchema, ICreateCompany } from "@/interfaces";
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
import { Category, CATEGORY_VALUES } from "@/interfaces/categeory.interface";
import { CategoryCard } from "../category-card";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { AddressInput } from "../address-input";
import { PAYMENTS_VALUES } from "@/lib/constants/payments";
import { PaymentCard } from "../payment-card";

const INITIAL_COMPANY_DATA: ICreateCompany = {
  address: "",
  category: [],
  name: "",
  email: "",
  image: "",
  payment_methods: [],
};
export function CompanyForm() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { createCompany } = useCreatingFetch();
  const { toast } = useToast();
  const form = useForm<ICreateCompany>({
    resolver: zodResolver(CreateCompanyZodSchema),
    defaultValues: INITIAL_COMPANY_DATA,
  });

  const onSubmit = async (values: ICreateCompany) => {
    try {
      setLoading(true);
      await createCompany(values);
      toast({
        title: "Sucursal creada exitosamente!",
        description: `Se agregó ${values.name} a tu lista de sucursales`,
        variant: "default",
      });
      form.reset();
      setCategoryList([]);
      setPaymentMethos([]);
    } catch (error) {
      console.log("Hubo un error al crear la sucursal", error);
      toast({
        title: "Hubo un error al crear la sucursal!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategories = (newCategory: Category) => {
    let res = [];

    if (categoryList.includes(newCategory)) {
      res = categoryList.filter((cat) => cat !== newCategory);
    } else {
      if (categoryList.length === 3) {
        return form.setError("category", {
          message: "Sólo puedas seleccionar hasta 3 categorías.",
        });
      }
      res = [...categoryList, newCategory];
    }

    form.clearErrors("category");
    form.setValue("category", res);
    setCategoryList(res);
  };
  const handlePaymentMethods = (newMethod: string) => {
    let res = [];

    if (paymentMethods.includes(newMethod)) {
      res = paymentMethods.filter((cat) => cat !== newMethod);
    } else {
      res = [...paymentMethods, newMethod];
    }

    form.clearErrors("payment_methods");
    form.setValue("payment_methods", res);
    setPaymentMethos(res);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex gap-3 items-center w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exapmple@email.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={() => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <AddressInput
                    value={form.getValues("address")}
                    handleSelect={(value: string) =>
                      form.setValue("address", value)
                    }
                  />
                </FormControl>
                \
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <FormDescription className="text-xs">
                  Min 1 - Max 3
                </FormDescription>

                <div className="flex w-max space-x-4 py-3 flex-wrap max-w-full gap-2">
                  {CATEGORY_VALUES.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategories(category)}
                    >
                      <CategoryCard
                        category={category}
                        selected={categoryList.includes(category)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payment_methods"
            render={() => (
              <FormItem>
                <FormLabel>Métodos de pago</FormLabel>
                <FormDescription className="text-xs">
                  Métodos de pago aceptados por esta sucursal
                </FormDescription>
                <div className="flex w-max  py-3 flex-wrap max-w-full gap-2">
                  {PAYMENTS_VALUES.map((method) => (
                    <div
                      key={method}
                      onClick={() => handlePaymentMethods(method)}
                    >
                      <PaymentCard
                        paymentMethod={method}
                        selected={paymentMethods.includes(method)}
                      />
                    </div>
                  ))}
                </div>

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
