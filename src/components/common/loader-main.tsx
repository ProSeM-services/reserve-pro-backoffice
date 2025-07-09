export function LoaderMain() {
  return (
    <div className=" size-full overflow-hidden">
      <div className=" h-full max-h-full max-md:max-h-[92%]     overflow-hidden rounded-md p-4">
        <div className="flex items-center justify-center h-screen  ">
          <div className="relative">
            <div className="absolute  inset-10  bg-gradient-to-r from-blue-600 to-indigo-500  blur-[100px] size-[170px] rounded-full animate-pulse outline"></div>

            <div className=" h-full w-full flex items-center justify-center">
              <img
                src="/images/rp-logo.png"
                className="w-[250px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
