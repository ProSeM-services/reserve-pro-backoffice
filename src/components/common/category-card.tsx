import { Category } from "@/interfaces/categeory.interface";
import {
  Check,
  CupSoda,
  HandMetalIcon,
  LucideProps,
  MoonIcon,
  Scissors,
  SpadeIcon,
  WashingMachine,
} from "lucide-react";
interface CategoryCardProps {
  category: Category;
  selected: boolean;
}

const IconConfig: Record<
  Category,
  {
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }
> = {
  "Cejas y Pestañas": {
    icon: MoonIcon,
  },
  Asesorías: {
    icon: MoonIcon,
  },
  Barbería: {
    icon: MoonIcon,
  },
  "Centro de estética": {
    icon: MoonIcon,
  },
  "Clases particulares": {
    icon: MoonIcon,
  },
  Consultorio: {
    icon: MoonIcon,
  },
  Depilación: {
    icon: MoonIcon,
  },
  Fotografía: {
    icon: MoonIcon,
  },
  Maquillaje: {
    icon: MoonIcon,
  },
  Masajes: {
    icon: MoonIcon,
  },
  Otro: {
    icon: MoonIcon,
  },
  Peluquería: {
    icon: Scissors,
  },
  "Peluquería Mascotas": {
    icon: CupSoda,
  },
  Spa: {
    icon: SpadeIcon,
  },
  Tatuajes: {
    icon: WashingMachine,
  },
  Uñas: {
    icon: HandMetalIcon,
  },
};
export function CategoryCard({ category, selected }: CategoryCardProps) {
  const { icon: Icon } = IconConfig[category];
  return (
    <div className="relative">
      <div
        className={`${
          selected ? "bg-primary text-white" : "bg-muted"
        } text-foreground p-2 rounded-md transition-all duration-200 cursor-pointer  flex  items-center gap-2 text-nowrap `}
      >
        <Icon className="size-4" strokeWidth={1} />
        {category}
      </div>
      {selected && (
        <div className="bg-background border border-primary text-primary absolute size-4 rounded-full flex items-center justify-center -top-0 -right-0">
          <Check className="size-2" />
        </div>
      )}
    </div>
  );
}
