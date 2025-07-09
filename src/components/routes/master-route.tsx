import { setAuthInterceptor } from "@/config/axios.config";
import useFetchData from "@/hooks/useFetchData";
import { AuthServices } from "@/services/auth.services";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function MasterRouteProtector({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const { fetchMemberLogged } = useFetchData();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const validateSession = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        fetchMemberLogged(res);
        if (res.role !== "MASTER") {
          setLoading(false);
          localStorage.clear();
          nav("/login");
          return;
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
