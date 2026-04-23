import { createContext, useContext } from "react";
import { IService } from "@/interfaces";

export type AsideType = "details" | "add-member" | "edit";

interface ServiceAsideContextValue {
  open: boolean;
  service?: IService;
  type: AsideType;
  openAside: (service: IService, type: AsideType) => void;
  closeAside: () => void;
}

export const ServiceAsideContext = createContext<ServiceAsideContextValue>(
  null!
);

export function useServiceAside() {
  const context = useContext(ServiceAsideContext);
  if (!context) {
    throw new Error("useServiceAside must be used within ServiceAsideProvider");
  }
  return context;
}
