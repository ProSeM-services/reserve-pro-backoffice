import useFetchData from "@/hooks/useFetchData";
import { AuthServices } from "@/services/auth.services";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const { fetchMemberLogged } = useFetchData();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const validateSession = async () => {
      try {
        setLoading(true);
        const res = await AuthServices.me();
        fetchMemberLogged(res);
        console.log("USUARIO == ", res);
        if (!res.account_type) {
          nav("/account-definition");
          return;
        }
        if (res.account_type === "BUSSINESS" && !res.EnterpriseId) {
          nav("/create-business");
          return;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        localStorage.clear();
        nav("/login");
      }
    };

    validateSession();
  }, []);

  if (loading) return null;

  return <Fragment>{children}</Fragment>;
}
