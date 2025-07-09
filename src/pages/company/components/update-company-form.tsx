import { CompanyZodSchema, ICompany } from "@/interfaces";
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

import { useToast } from "@/components/ui/use-toast";
import { Location } from "@/interfaces/location.interface";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import { EditAddressInput } from "./edit-address-input";
import { CategoryCard } from "@/components/common/category-card";
import { PAYMENTS_VALUES } from "@/lib/constants/payments";
import { PaymentCard } from "@/components/common/payment-card";
import { Check } from "lucide-react";
interface UpdateCompanyFormProps {
  company: ICompany;
}
export function UpdateCompanyForm({ company }: UpdateCompanyFormProps) {
  const [categoryList, setCategoryList] = useState<Category[]>(
    company.category
  );
  const [paymentMethods, setPaymentMethos] = useState<string[]>(
    company.payment_methods ? company.payment_methods : []
  );
  const [loading, setLoading] = useState(false);
  const { editCompany } = useCreatingFetch();
  const { toast } = useToast();

  const form = useForm<Partial<ICompany>>({
    resolver: zodResolver(CompanyZodSchema),
    mode: "onChange",
    defaultValues: company,
  });

  const onSubmit = async (values: Partial<ICompany>) => {
    console.log("VALUES TO UPDATE: ", values);
    try {
      setLoading(true);
      await editCompany(company.id, values);
      toast({
        title: "Sucursal actualizada correctamente!",
        description: `Se actualiazron los datos de ${values.name}, recargar la pagina para ver los cambios.`,
        variant: "default",
      });
      form.reset();
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

  const handleAddressChange = (newLocation: Location) => {
    form.setValue("address", newLocation);
  };

  console.log("form.formState.errors", form.formState.errors);
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  {field.value && (
                    <EditAddressInput
                      location={field.value.value}
                      placeholder="exapmple@email.com"
                      handleAddressChange={handleAddressChange}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full gap-2 ">
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Piso</FormLabel>
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Departamento</FormLabel>
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <FormDescription className="text-xs">
                  Min 1 - Max 3
                </FormDescription>

                <div className="flex flex-col gap-2">
                  {CATEGORY_VALUES.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategories(category)}
                      className={`flex items-center  gap-2 cursor-pointer transition-all duration-300`}
                    >
                      <div
                        className={`rounded transition-all duration-300 ${
                          categoryList.includes(category)
                            ? " bg-blue-200 p-2"
                            : "p-0 "
                        }`}
                      >
                        <Check
                          className={`rounded transition-all duration-300 ${
                            categoryList.includes(category)
                              ? "size-4 text-blue-500"
                              : "size-0"
                          }`}
                        />
                      </div>
                      <div className="text-black flex-grow">
                        <CategoryCard category={category} selected={false} />
                      </div>
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
                <div className="flex flex-col gap-4">
                  {PAYMENTS_VALUES.map((method) => (
                    <div
                      key={method}
                      onClick={() => handlePaymentMethods(method)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`rounded transition-all duration-300 ${
                          paymentMethods.includes(method)
                            ? " bg-blue-200 p-2"
                            : "p-0 "
                        }`}
                      >
                        <Check
                          className={`rounded transition-all duration-300 ${
                            paymentMethods.includes(method)
                              ? "size-4 text-blue-500"
                              : "size-0"
                          }`}
                        />
                      </div>
                      <div className="flex-grow">
                        <PaymentCard paymentMethod={method} />
                      </div>
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
              Editar
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
