import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { MapPinIcon, MapPinOffIcon } from "lucide-react";
import DynamicMap from "./dynamic-map";
import { useSearchParams } from "next/navigation";

interface Prediction {
  place_id: string;
  description: string;
}

interface AddressInputProps {
  handleSelect: (address: string) => void;
  onlyInput?: boolean;
  placeholder?: string;
  value?: string;
}
export function AddressInput({
  handleSelect,
  onlyInput = false,
  placeholder = "Ingresa la dirección",
  value = "",
}: AddressInputProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [query, setQuery] = useState(params.get("city") || "");
  const [mapValue, setMapValue] = useState(value || "");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_APIMAPS}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        autocompleteService.current =
          new google.maps.places.AutocompleteService();
      };
    };

    if (value) {
      setQuery(value);
    }

    loadScript();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
    if (input && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(
              predictions.map((p) => ({
                place_id: p.place_id,
                description: p.description,
              }))
            );
            setSelectedIndex(null); // Reset selected index when the query changes
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === predictions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? predictions.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex !== null && predictions[selectedIndex]) {
        setQuery(predictions[selectedIndex].description);
        setMapValue(predictions[selectedIndex].description);
        handleSelect(predictions[selectedIndex].description);
        setPredictions([]);
        setSelectedIndex(null);
      }
    } else if (e.key === "Escape") {
      setPredictions([]);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setPredictions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", () => handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", () => handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      setQuery(value);
      return;
    }
    setQuery(params.get("city") || "");
  }, [params.get("city")]);

  return (
    <div className="relative w-full space-y-2 " ref={containerRef}>
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="shipping family-name"
        ref={inputRef}
      />

      {predictions.length > 0 && (
        <ul className="absolute bg-white  w-full z-10 max-h-60 overflow-auto">
          {predictions.map((prediction, index) => (
            <li
              key={prediction.place_id}
              className={` p-2 text-sm cursor-pointer flex items-center gap-2  hover:bg-accent ${
                index === selectedIndex ? "bg-accent" : "bg-background"
              }`}
              onMouseDown={() => {
                setQuery(prediction.description);
                setMapValue(prediction.description);
                handleSelect(prediction.description);
                setPredictions([]);
                setSelectedIndex(null);
              }}
            >
              <MapPinIcon className="size-3" />
              {prediction.description}
            </li>
          ))}
        </ul>
      )}

      {!onlyInput ? (
        <div className="size-80 w-full bg-accent rounded-md  ">
          {mapValue.length ? (
            <div className="size-full">
              <DynamicMap address={query} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-sm gap-4 ">
              <MapPinOffIcon />
              <p>Seleccione una dirección para verla en el mapa</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
