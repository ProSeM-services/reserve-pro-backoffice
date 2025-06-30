import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function SettingsPage() {
  return (
    <Card className=" size-full bordern">
      <CardHeader>
        <CardTitle>Configuración de cuenta</CardTitle>
        <CardDescription>
          Aquí puedes modificar la configuración de tu cuenta y preferencias.
        </CardDescription>
      </CardHeader>
      {/* <Separator /> */}
      <CardContent className="">
        <section className=" size-1/2 ">
          {/* Perfil */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Perfil</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <Button className="mt-2">Guardar cambios</Button>
            </div>
          </section>
          <Separator />
          {/* Contraseña */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Contraseña</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button className="mt-2" variant="secondary">
                Cambiar contraseña
              </Button>
            </div>
          </section>
          <Separator />
          {/* Preferencias */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Preferencias</h2>
            <div className="grid gap-4">
              {/* Aquí puedes agregar más opciones de preferencias */}
              <div>
                <Label htmlFor="language">Idioma</Label>
                <Input id="language" placeholder="Español" disabled />
              </div>
            </div>
          </section>
        </section>
      </CardContent>
    </Card>
  );
}
