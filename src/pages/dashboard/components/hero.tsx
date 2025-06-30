import useSession from "@/hooks/useSession";
import { useAppSelector } from "@/store/hooks";
import { Notifications } from "./notifications-aside";
import { checkTrialStatus } from "@/lib/utils/checkTrialStatus";

export default function Hero() {
  const { member } = useSession();
  const { enterprise } = useAppSelector((s) => s.enterprise);
  const { notifications } = useAppSelector((s) => s.notifications);

  const { daysLeft, isInTrial } = checkTrialStatus(enterprise.createdAt);
  return (
    <header className="flex justify-between h-full  items-center  w-full ">
      <h2 className="font-medium text-xl ">Hola, {member?.fullName}!</h2>

      <div className="flex items-center gap-2">
        {isInTrial && !enterprise.payment_plan && (
          <div className="rounded-md p-2 bg-green-200 text-green-600">
            Quedan {daysLeft} días de prueba
          </div>
        )}
        {notifications.length ? <Notifications /> : null}
      </div>
    </header>
  );
}
