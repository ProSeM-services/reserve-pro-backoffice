import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MemberServices } from "@/services/member.services";
import { MailCheck, Send } from "lucide-react";
import { useState } from "react";

export function SendInviteUser({ userId }: { userId: string }) {
  const [isInvited, setIsInvited] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleInvite = async () => {
    setIsLoading(true);
    try {
      await MemberServices.sendInvite(userId);
      toast({
        title: "Invitación enviada",
      });
      setIsInvited(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={loading}
      onClick={handleInvite}
      className="text-sm size-8"
      variant={"ghost"}
      size={"icon"}
    >
      {isInvited ? (
        <MailCheck className="size-5 text-green-600" />
      ) : (
        <Send className="size-4" />
      )}
    </Button>
  );
}
