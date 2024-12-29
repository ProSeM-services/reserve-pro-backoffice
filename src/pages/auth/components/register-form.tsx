import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon, Mail, HouseIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTenantZodSchema,
  ICreateTentant,
} from "@/interfaces/member.iterface";
import { AuthServices } from "@/services/auth.services";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";
const EMPTY_TENANT_DATA: ICreateTentant = {
  email: "",
  lastName: "",
  name: "",
  password: "",
  confirmPassword: "",
  role: "ADMIN",
  companyName: "",
  userName: "",
  image: "",
};

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = useNavigate();
  const form = useForm<ICreateTentant>({
    resolver: zodResolver(CreateTenantZodSchema),
    defaultValues: EMPTY_TENANT_DATA,
  });

  const handleCloseDialog = (value: boolean) => {
    if (!value) {
      setOpen(false);
      nav("/login");
    }
  };
  const { toast } = useToast();

  const onSubmit = async (values: ICreateTentant) => {
    setLoading(true);
    try {
      await AuthServices.register(values);

      setOpen(true);
    } catch (error) {
      //@ts-ignore
      if (error.response.data.message) {
        //@ts-ignore
        const message = error.response.data.message;
        toast({
          title: "Error at credentials",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-4 ">
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="email">Nombre</Label>
                      <div className="relative ">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                          {...field}
                          placeholder="Enter your first name"
                        />
                        <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="email">Apellido</Label>
                      <div className="relative">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          {...field}
                          placeholder="Enter your last name"
                        />
                        <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="example@email.com"
                      />
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Nombre de tu Negocio</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="Nombre de tu negocio"
                      />
                      <HouseIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Nombre de Usuario</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="Nombre de Usuario"
                      />
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex  gap-4 w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="password">Confirmar Contraseña</Label>
                      <div className="relative">
                        <FormControl>
                          <Input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            {...field}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
              isLoading={loading}
            >
              Crear Cuenta
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign Up with Google
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={() => handleCloseDialog(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar tu mail</DialogTitle>
            <DialogDescription>
              Hemos enviado un correo electrónico a la dirección proporcionada.
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace de
              confirmación para activar tu cuenta.
            </DialogDescription>
          </DialogHeader>
          {/* Agrega un botón aquí para reenviar el correo si es necesario */}
          <DialogClose onClick={() => setOpen(false)}></DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
