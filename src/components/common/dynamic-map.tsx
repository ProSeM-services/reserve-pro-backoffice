import { useEffect, useState } from "react";
import { MapComponent } from "./map";
import { GeocodeServices } from "@/services/geocode.services";

export default function DynamicMap({ address }: { address: string }) {
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  useEffect(() => {
    if (!address) return;
    const getLoaction = async () => {
      const location = await GeocodeServices.getAdressGeocode(address);
      setLocation(location);
    };
    getLoaction();
  }, [address]);

  return (
    <>
      {location?.lat && location.lng ? (
        <MapComponent lat={location.lat} lng={location.lng} />
      ) : null}
    </>
  );
}
