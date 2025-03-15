import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserZod } from "@/interfaces";
import { useNavigate, useSearchParams } from "react-router";
import { AuthServices } from "@/services/auth.services";
import { MemberServices } from "@/services/member.services";
import { useToast } from "@/components/ui/use-toast";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const [validating, setValidating] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<UserZod>();
  const [params] = useSearchParams();
  useEffect(() => {
    const token = params.get("token");
    if (!token) return;
    const getUser = async () => {
      setValidating(true);
      try {
        const res = await AuthServices.getUserByToken({ token });
        setUser(res);
      } catch (error) {
        console.log("Error getting user by token", error);
      } finally {
        setValidating(false);
      }
    };
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValues>();

  const { toast } = useToast();
  const nav = useNavigate();
  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      if (!user) return;
      setUpdating(true);
      await MemberServices.update(user.id, { password: data.password });

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente",
      });
      nav("/login");
    } catch (error) {
      console.log("Error updating password", error);
    } finally {
      setUpdating(false);
    }
  };

  const password = watch("password");

  if (validating)
    return (
      <div className="flex justify-center items-center   max-w-sm mx-auto z-10 h-32">
        Validando datos...
      </div>
    );
  return (
    <div className=" flex justify-center items-center  h-full max-w-sm mx-auto z-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
          <Label htmlFor="password">Nueva Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "La confirmación de la contraseña es requerida",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" isLoading={updating}>
          Redefinir Contraseña
        </Button>
      </form>
    </div>
  );
};
