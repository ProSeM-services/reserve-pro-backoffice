import useFetchData from "@/hooks/useFetchData";
import { AuthServices } from "@/services/auth.services";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const { fetchMemberLogged } = useFetchData();
  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await AuthServices.me();
        fetchMemberLogged(res);
      } catch (error) {
        localStorage.clear();
        nav("/login");
      }
    };

    validateSession();
  }, []);
  return <Fragment>{children}</Fragment>;
}
