import useSession from "@/hooks/useSession";
import { CompanySwitcher } from "@/components/common/company-switcher";

export default function Hero() {
  const { member } = useSession();
  return (
    <header className="flex  justify-between h-full  items-center  w-full ">
      <h2 className="font-medium text-xl max-md:text-sm ">
        Hola, {member?.fullName}!
      </h2>

      <div className=" bg-muted px-2 rounded-xl max-md:hidden ">
        <CompanySwitcher />
      </div>
    </header>
  );
}
