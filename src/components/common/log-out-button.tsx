import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export function LogOutButton() {
  const nav = useNavigate();
  const handleLogOut = () => {
    nav("/login");
    localStorage.clear();
  };

  return (
    <Button variant={"ghost"} onClick={handleLogOut}>
      {" "}
      <LogOut />
      Log out
    </Button>
  );
}
