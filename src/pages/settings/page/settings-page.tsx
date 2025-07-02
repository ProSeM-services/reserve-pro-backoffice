import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdatePasswordForm } from "../components/forms/update-password";
import { UpdateUser } from "../components/forms/update-user";

export function SettingsPage() {
  return (
    <Card className=" size-full border-none">
      <CardHeader>
        <CardTitle>Configuración de cuenta</CardTitle>
        <CardDescription>
          Aquí puedes modificar la configuración de tu cuenta y preferencias.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <section className="flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-semibold mb-2">Perfil</h2>
            <UpdateUser />
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Contraseña</h2>
            <UpdatePasswordForm />
          </section>
        </section>
      </CardContent>
    </Card>
  );
}
