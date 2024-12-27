import useSession from "@/hooks/useSession";

export default function Hero() {
  const { session } = useSession();
  return (
    <header className="flex justify-between h-full  items-center ">
      <h2 className="font-medium text-xl ">Hola, {session?.name}!</h2>
    </header>
  );
}
