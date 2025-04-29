import { BackgroundMark } from "@/components/common/BackgroundMark";
import { setAuthInterceptor } from "@/config/axios.config";
import { useEffect, useState } from "react";
import { LoaderMain } from "@/components/common/loader-main";
import { UserZod } from "@/interfaces";
import { AuthServices } from "@/services/auth.services";
import { CreateProfessionalForm } from "../components/create-professional-form";

export function CreateProfessionalPage() {
  const [user, setUser] = useState<UserZod>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        await setAuthInterceptor(accessToken);
        const response = await AuthServices.me();
        setUser(response);
      } catch (error) {
        console.log("error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex justify-center items-center h-full">
        <BackgroundMark />
        <LoaderMain />
      </div>
    );
  }

  if (!user) return;
  return (
    <div className="mx-auto flex justify-center items-center h-full">
      <BackgroundMark />
      <div className="w-full max-w-lg bg-white border rounded-lg p-6 z-10">
        <CreateProfessionalForm user={user} />
      </div>
    </div>
  );
}
