import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { setAuthInterceptor } from "@/config/axios.config";
import { useQueryClient } from "@tanstack/react-query";
export function LogOutButton() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const handleLogOut = async () => {
    await setAuthInterceptor(null);
    queryClient.clear();
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
