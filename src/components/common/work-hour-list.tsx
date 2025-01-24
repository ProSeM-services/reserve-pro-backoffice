import { IWorkhour } from "@/interfaces";
import { ArrowRight } from "lucide-react";
export default function WorkhourList({
  worhHours,
}: {
  worhHours: IWorkhour[];
}) {
  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "mié rcoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];
  return (
    <div
      className={`grid grid-cols-4 max-md:grid-cols-2 rounded-md  gap-2  py-2`}
    >
      {worhHours.map(({ day, segments }) => (
        <div
          key={day}
          className="flex flex-col justify-center rounded-md  items-start  shadow-md bg-accent text-secondary-foreground  p-2 "
        >
          <p className=" font-bold uppercase ">{DAYS[day].short}</p>
          <div className="flex flex-col font-light ">
            {segments.map((seg) => (
              <div className="flex items-center" key={seg.duration}>
                <div>{seg.startime} hs</div>
                <ArrowRight className="size-4" strokeWidth={1} />
                <div>{seg.endTime} hs</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
