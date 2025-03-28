import { BackgroundMark } from "@/components/common/BackgroundMark";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ACCOUNT_TYPE_VALUES, AccountType } from "@/lib/constants/accout-type";
import { useNavigate } from "react-router";

export function AccountDefinitionPage() {
  const nav = useNavigate();

  const handleSelectType = (type: AccountType) => {
    if (type === "BUSSINESS") {
      nav("/create-business");
      return;
    }
  };
  return (
    <div className="w-full min-h-screen h-screen     overflow-hidden  flex flex-col gap-4 justify-center items-center  ">
      <Label className="text-2xl">¿Qué tipo de cuenta deseas crear?</Label>
      <div className="flex gap-2 z-10">
        {ACCOUNT_TYPE_VALUES.map((value) => (
          <Button
            className="h-32 text-lg aspect-video"
            variant={"secondary"}
            onClick={() => handleSelectType(value)}
          >
            {value}
          </Button>
        ))}
      </div>
      <div className="    -z-10- absolute left-0 ">
        <BackgroundMark />
      </div>
    </div>
  );
}
