export function LoaderMain() {
  return (
    <div className=" size-full overflow-hidden">
      <div className=" h-full max-h-full max-md:max-h-[92%]     overflow-hidden rounded-md p-4">
        <div className="flex items-center justify-center h-screen  ">
          <div className="relative">
            {/* Fondo de la animación */}
            <div className="absolute  inset-10  bg-gradient-to-r from-primary via-green-600  blur-3xl size-[170px] rounded-full animate-pulse outline"></div>
            {/* Círculo animado:  border-4 border-t-4 border-t-primary border-primary/25 rounded-full animate-spin */}
            <div className=" h-full w-full flex items-center justify-center">
              <img
                src="/images/reserve-pro-high-resolution-logo-transparent.png"
                className="w-[250px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
