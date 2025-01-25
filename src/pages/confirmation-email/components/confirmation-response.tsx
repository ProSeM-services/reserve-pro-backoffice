import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router";

interface ConfrimationResponseProps {
  result: "success" | "error";
}
export function ConfrimationResponse({ result }: ConfrimationResponseProps) {
  if (result === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <div className="items-center text-center flex flex-col gap-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h1 className="text-2xl font-semibold text-gray-800">
              ¡Error al confirmar el correo!
            </h1>
            <p className="text-sm text-gray-600">
              No hemos podido confirmar tu dirección de correo electrónico. El
              enlace podría haber expirado o ya ha sido utilizado.
            </p>
            <Link
              className="w-full bg-primary px-4 py-2 text-white rounded"
              to={"/resend-confirmation"}
            >
              Reenviar correo de confirmación
            </Link>
            <Link
              className="w-full bg-gray-200 px-4 py-2 text-gray-800 rounded"
              to={"/"}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className=" items-center text-center flex flex-col gap-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-semibold text-gray-800">
            ¡Correo confirmado!
          </h1>
          <p className="text-sm text-gray-600">
            Tu dirección de correo electrónico ha sido confirmada exitosamente.
            Ahora puedes continuar usando nuestros servicios.
          </p>
          <Link
            className=" w-full bg-primary px-4  py-2 text-white rounded"
            to={"/"}
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
