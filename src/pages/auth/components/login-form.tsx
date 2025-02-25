import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { AuthServices } from "@/services/auth.services";
import { useAppDispatch } from "@/store/hooks";
import {
  setAccesToken,
  setSession,
} from "@/store/feature/session/sessionSlice";
import { setAuthInterceptor } from "@/config/axios.config";
export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await AuthServices.login({
        user: values.user,
        password: values.password,
      });
      if (res.user && !res.user.membership_status) {
        toast({
          title: "Cuenta inactiva",
          variant: "destructive",
        });
        return;
      }
      await setAuthInterceptor(res.backendTokens.accessToken);

      dispatch(setSession(res.user));
      dispatch(setAccesToken(res.backendTokens.accessToken));

      localStorage.setItem("accessToken", res.backendTokens.accessToken);
      localStorage.setItem("userLogged", JSON.stringify(res.user));

      location.replace("/dashboard"); // This is forcing a reload at the navigatin page!
    } catch (error) {
      return toast({
        title: "Invalid credentials",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const formSchema = z.object({
    user: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full w-full  ">
        <div className=" flex flex-col justify-center gap-4 h-full ">
          <div className="w-full flex flex-col   justify-center    gap-4">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter your email address"
                    />
                    <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter password"
                      type="password"
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <section className=" flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
              isLoading={loading}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Login with Google
            </Button>
          </section>
        </div>
      </form>
    </Form>
  );
}
