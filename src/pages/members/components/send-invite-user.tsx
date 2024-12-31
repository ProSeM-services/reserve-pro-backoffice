import { Button } from "@/components/ui/button";
import { MemberServices } from "@/services/member.services";
import { MailCheck, Send } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMember } from "@/interfaces/member.iterface";
import { Label } from "@/components/ui/label";

export function SendInviteUser({ member }: { member: IMember }) {
  const [isInvited, setIsInvited] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const handleInvite = async () => {
    setIsLoading(true);
    try {
      await MemberServices.sendInvite(member.id);

      setIsInvited(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Send className="size-4" />
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>
            {isInvited ? (
              <div className="flex flex-col items-center">
                <Label className="text-lg"> Inivtación Enviada! </Label>
                <MailCheck className=" text-green-600" />
              </div>
            ) : (
              <>
                Enviar invitación a {member.name}, {member.lastName}?
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {!isInvited && (
              <>
                Se enviará un correo electrónico a <b>{member.email}</b>{" "}
                invitándolo a unirse a tu equipo!
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        {!isInvited && (
          <div className="flex justify-end gap-4">
            <DialogTrigger>
              <Button variant={"secondary"}>Cancelar</Button>
            </DialogTrigger>
            <Button
              isLoading={loading}
              onClick={handleInvite}
              className="text-sm flex gap-2 items-center"
              // variant={"ghost"}
            >
              {isInvited ? (
                <MailCheck className="size-5 text-green-600" />
              ) : (
                <>
                  <p>Evniar</p>
                  <Send className="size-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
