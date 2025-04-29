import { SessionProvider } from "@/components/providers/session-provider";

export function PoolPage() {
  return (
    <div className="h-full w-full  flex flex-col  overflow-hidden    text-xs ">
      <SessionProvider>
        <div className=" h-full w-full flex flex-col  items-center justify-center">
          <h1 className="text-2xl font-bold">Reserve Pro | Pool jobs</h1>
          <p>El lugar para encontrar trabajo</p>
        </div>
      </SessionProvider>
    </div>
  );
}
