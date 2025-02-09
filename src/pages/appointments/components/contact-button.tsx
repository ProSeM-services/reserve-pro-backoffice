import { WhatsAppIcon } from "@/components/icons/whatsApp-icon";

export function ContactButton({ phoneNumber }: { phoneNumber: string }) {
  const whatsappURL = `https://wa.me/${phoneNumber}`;

  return (
    <a className="flex items-center gap-2  " href={whatsappURL}>
      <div className=" bg-green-700 text-white   size-6 rounded-full flex justify-center items-center ">
        <WhatsAppIcon />
      </div>
      <span>Chatear</span>
    </a>
  );
}
