import { setAuthInterceptor } from "@/config/axios.config";
import { AuthServices } from "@/services/auth.services";
import { useAppDispatch } from "@/store/hooks";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { setSession } from "@/store/feature/session/sessionSlice";

export function SessionProvider({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const validateSession = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        dispatch(setSession(res));
        if (res.role === "MASTER") {
          nav("/admin");
          return;
        }
        if (!res.account_type) {
          nav("/account-definition");
          return;
        }
        if (res.account_type === "BUSSINESS" && !res.EnterpriseId) {
          nav("/create-business");
          return;
        }

        if (res.account_type === "PROFESSIONAL" && !res.EnterpriseId) {
          nav("/pool");
          return;
        }
        if (res.EnterpriseId) {
          localStorage.setItem("enterpriseId", res.EnterpriseId);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        localStorage.clear();
        nav("/login");
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  if (loading) return null;

  return <Fragment>{children}</Fragment>;
}
