import { PropsWithChildren } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
export default function MapProvider({ children }: PropsWithChildren) {
  return (
    <APIProvider
      apiKey={import.meta.env.NEXT_PUBLIC_APIMAPS || ""}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
}
