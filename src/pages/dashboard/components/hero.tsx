import useSession from "@/hooks/useSession";

export default function Hero() {
  const { member } = useSession();
  return (
    <header className="flex justify-between h-full  items-center ">
      <h2 className="font-medium text-xl ">Hola, {member?.fullName}!</h2>
    </header>
  );
}
