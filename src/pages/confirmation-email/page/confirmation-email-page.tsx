import { AuthServices } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { ConfrimationResponse } from "../components/confirmation-response";
import { useSearchParams } from "react-router";

export function ConfrimationPage() {
  const [result, setResult] = useState<"success" | "error">("success");
  const [validating, setValidating] = useState(true);

  const [params] = useSearchParams();
  useEffect(() => {
    const token = params.get("token");
    if (!token) return;
    AuthServices.confirmEmail({ token })
      .then(() => {
        setResult("success");
      })
      .catch(() => {
        setResult("error");
      })
      .finally(() => setValidating(false));
    console.log({ token });
  }, []);
  if (validating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Círculo de carga animado */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          {/* Mensaje */}
          <p className="text-gray-700 text-sm">
            Validando datos, por favor espera...
          </p>
        </div>
      </div>
    );
  }
  return <ConfrimationResponse result={result} />;
}
