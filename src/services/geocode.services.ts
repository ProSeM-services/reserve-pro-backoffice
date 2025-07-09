import axios from "axios";
const GOOGLE_API_KEY = import.meta.env.VITE_NEXT_PUBLIC_APIMAPS;
export class GeocodeServices {
  static async getAdressGeocode(address: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: GOOGLE_API_KEY,
          },
        }
      );

      if (response.data.status !== "OK") {
        console.log("error", response);
        throw new Error(`Geocodificación fallida: ${response.data.status}`);
      }
      const result = response.data.results[0];
      const location = result.geometry.location;

      // Encontrar el componente de dirección que representa la ciudad
      let city = "";
      for (const component of result.address_components) {
        if (component.types.includes("locality")) {
          city = component.long_name;
          break;
        }
      }

      return {
        lat: location.lat,
        lng: location.lng,
        city,
      };
    } catch (error) {
      console.log("error", error);
      throw new Error("Error en la geocodificación: ");
    }
  }
}
