import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import useFetchData from "@/hooks/useFetchData";
import { setAuthInterceptor } from "@/config/axios.config";
export function LogOutButton() {
  const nav = useNavigate();
  const { clearStore } = useFetchData();
  const handleLogOut = async () => {
    await setAuthInterceptor(null);
    clearStore();
    nav("/login");
    localStorage.clear();
  };

  return (
    <Button
      variant={"ghost"}
      onClick={handleLogOut}
      className="size-full flex justify-start"
    >
      {" "}
      <LogOut />
      Log out
    </Button>
  );
}
