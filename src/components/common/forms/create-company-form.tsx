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
import { useAppSelector } from "@/store/hooks";
import { MemberAvatar } from "../members/member-avatar";
import { Check } from "lucide-react";

const INITIAL_COMPANY_DATA: ICreateCompany = {
  address: "",
  category: [],
  name: "",
  email: "",
  image: "",
  payment_methods: [],
  apartment: "",
  floor: "",
};
export function CompanyForm() {
  const { inmutableMembers } = useAppSelector((state) => state.member);
  const { inmutableServices } = useAppSelector((state) => state.service);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethos] = useState<string[]>([]);
  const [usersToAdd, setUsersToAdd] = useState<string[]>([]);
  const [servicesToAdd, setServicesToAdd] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    createCompany,
    editMember,
    addMembersToCompany,
    addServicesToCompany,
    editService,
  } = useCreatingFetch();

  const { toast } = useToast();
  const form = useForm<
    ICreateCompany & { usersIds?: string[]; servicesIds?: string[] }
  >({
    resolver: zodResolver(CreateCompanyZodSchema),
    defaultValues: INITIAL_COMPANY_DATA,
  });

  const handleAddService = (serviceId: string) => {
    if (servicesToAdd.includes(serviceId)) {
      const newService = servicesToAdd.filter((user) => user !== serviceId);
      setServicesToAdd(newService);
      return;
    }

    setServicesToAdd((prev) => [...prev, serviceId]);
  };
  const handleAddUsers = (userId: string) => {
    if (usersToAdd.includes(userId)) {
      const newUsers = usersToAdd.filter((user) => user !== userId);
      setUsersToAdd(newUsers);
      return;
    }

    setUsersToAdd((prev) => [...prev, userId]);
  };
  const onSubmit = async (values: ICreateCompany) => {
    try {
      setLoading(true);
      const newCompany = await createCompany(values);
      console.log("res", newCompany);
      if (usersToAdd.length > 0 && newCompany) {
        await addMembersToCompany(usersToAdd, newCompany.id);
        usersToAdd.forEach((memberId) => {
          editMember(memberId, { CompanyId: newCompany.id });
        });
      }
      if (servicesToAdd.length > 0 && newCompany) {
        await addServicesToCompany(servicesToAdd, newCompany.id);
        servicesToAdd.forEach((serviceId) => {
          editService(serviceId, { companyId: newCompany.id });
        });
      }
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
            name="usersIds"
            render={() => (
              <FormItem>
                <FormLabel>Agregar miembros</FormLabel>
                <FormDescription className="text-xs">
                  Seleccionar los miembros que serán parte de esta sucursal
                </FormDescription>
                <div className="flex flex-col gap-2">
                  {inmutableMembers
                    .filter((m) => !m.CompanyId)
                    .map((member) => (
                      <div
                        className="flex items-center gap-2 cursor-pointer pr-4"
                        key={member.id}
                        onClick={() => handleAddUsers(member.id)}
                      >
                        <div
                          className={` rounded transition-all duration-300 ${
                            usersToAdd.includes(member.id)
                              ? "   bg-blue-200 p-2 "
                              : " p-0"
                          }`}
                        >
                          <Check
                            className={`rounded transition-all duration-300 ${
                              usersToAdd.includes(member.id)
                                ? "size-4 text-blue-500"
                                : "size-0"
                            }`}
                          />
                        </div>
                        <div className="flex items-center gap-2 border flex-grow rounded-xl bg-muted">
                          <MemberAvatar member={member} size="sm" />
                          <p>{member.fullName}</p>
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
            name="servicesIds"
            render={() => (
              <FormItem>
                <FormLabel>Agregar servicios</FormLabel>
                <FormDescription className="text-xs">
                  Seleccionar los servicios que serán parte de esta sucursal
                </FormDescription>
                <div className="flex flex-col gap-2">
                  {inmutableServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleAddService(service.id)}
                      className="flex items-center gap-2 cursor-pointer pr-4"
                    >
                      <div
                        className={`rounded transition-all duration-300 ${
                          servicesToAdd.includes(service.id)
                            ? " bg-blue-200 p-2"
                            : "p-0 "
                        }`}
                        onClick={() => handleAddService(service.id)}
                      >
                        <Check
                          className={`rounded transition-all duration-300 ${
                            servicesToAdd.includes(service.id)
                              ? "size-4 text-blue-500"
                              : "size-0"
                          }`}
                        />
                      </div>

                      <div className="flex items-center gap-2 border flex-grow rounded-xl p-2 bg-muted">
                        <p className="">{service.title}</p>
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
              Crear
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
