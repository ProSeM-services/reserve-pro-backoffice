import useSession from "@/hooks/useSession";
import { useAppSelector } from "@/store/hooks";
import { Notifications } from "./notifications-aside";
import { checkTrialStatus } from "@/lib/utils/checkTrialStatus";
import { CompanySwitcher } from "@/components/common/company-switcher";

export default function Hero() {
  const { member } = useSession();
  const { enterprise } = useAppSelector((s) => s.enterprise);
  const { notifications } = useAppSelector((s) => s.notifications);
  const { currentSubscription } = useAppSelector((s) => s.subscription);

  const { daysLeft, isInTrial } = checkTrialStatus(enterprise.createdAt);

  return (
    <header className="flex  justify-between h-full  items-center  w-full ">
      <h2 className="font-medium text-xl max-md:text-sm ">
        Hola, {member?.fullName}!
      </h2>

      <div className="flex items-center gap-2">
        {isInTrial && !currentSubscription && (
          <div className="rounded-md p-2 bg-green-200 text-green-600">
            Quedan {daysLeft} días de prueba
          </div>
        )}
        {notifications.length ? <Notifications /> : null}
      </div>
      <div className=" bg-muted px-2 rounded-xl max-md:hidden ">
        <CompanySwitcher />
      </div>
    </header>
  );
}
