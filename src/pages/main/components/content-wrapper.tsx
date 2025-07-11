import { useSidebar } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export function ContentWrapper({ children }: PropsWithChildren) {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className={`p-4  flex-grow ${isMobile && "w-[98dvw]"}   ${
        open && !isMobile ? "max-w-[85vw]" : "max-w-full "
      } max-h-[90vh] overflow-auto aspect-square`}
    >
      {children}
    </div>
  );
}
