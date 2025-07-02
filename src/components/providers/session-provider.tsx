import { setAuthInterceptor } from "@/config/axios.config";
import useFetchData from "@/hooks/useFetchData";
import { AuthServices } from "@/services/auth.services";
import { EnterpiseServices } from "@/services/enterprise.services";
import { setEnterprise } from "@/store/feature/enterprise/enterpriseSlice";
import { useAppDispatch } from "@/store/hooks";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const { fetchMemberLogged } = useFetchData();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const validateSession = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        console.log("RES /ME", res);
        fetchMemberLogged(res);
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
        const enterprise = await EnterpiseServices.getById(res.EnterpriseId);

        if (!enterprise) {
          nav("/create-business");
          return;
        }
        dispatch(setEnterprise(enterprise));
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
