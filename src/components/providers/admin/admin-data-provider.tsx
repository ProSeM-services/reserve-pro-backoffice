import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { LoaderMain } from "@/components/common/loader-main";

export default function AdminDataProvider({ children }: PropsWithChildren) {
  const [bootstrapping, setBootstrapping] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (accessToken) {
          await setAuthInterceptor(accessToken);
        }
      } catch (error) {
        console.log("error setting auth interceptor", error);
      } finally {
        setBootstrapping(false);
      }
    };
    bootstrap();
  }, [accessToken]);

  if (bootstrapping) return <LoaderMain />;
  return <Fragment>{children}</Fragment>;
}
