import { DAYS, HOURS_VALUES } from "@/constants/work-hours/hour-values";
import { IWorkhour } from "@/interfaces";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

interface WorkHourCalendarProps {
  workhours: IWorkhour[];
}
export function WorkHourCalendar({ workhours }: WorkHourCalendarProps) {
  const [week, setWeek] = useState(
    DAYS.map((day, index) => ({
      ...day,
      workhour: workhours?.find((e) => e.day === index) || {
        day: index,
        segments: [],
      },
      selected: false, // Add selected property for each day
    }))
  );

  useEffect(() => {
    const initialWeek = DAYS.map((day, index) => ({
      ...day,
      workhour: workhours?.find((e) => e.day === index) || {
        day: index,
        segments: [],
      },
      selected: false, // Add selected property for each day
    }));
    setWeek(initialWeek);
  }, [workhours]);
  return (
    <section className="flex gap-1 size-full">
      <div className="flex flex-col mt-10">
        {HOURS_VALUES.map((time) => (
          <div className=" flex items-center h-10">{time}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 bg-white  w-full h-full gap-1 mx-1">
        {week.map((weekItem) => (
          <div key={weekItem.long}>
            <div
              className={`flex gap-2 items-center  justify-center p-2 border text-center h-10 ${
                weekItem.selected && "bg-primary text-white"
              }`}
            >
              <Label className="uppercase">{weekItem.long}</Label>
            </div>

            <div className="flex  flex-col w-full border   ">
              {HOURS_VALUES.map((time, i) => (
                <div className="h-10  ">
                  {weekItem.workhour.segments.map((segment) => {
                    const isActive =
                      i >= HOURS_VALUES.indexOf(segment.startime) &&
                      i <= HOURS_VALUES.indexOf(segment.endTime);
                    return (
                      <div
                        className={`${
                          isActive
                            ? `bg-indigo-500 h-10 text-white flex items-center px-2  ${
                                i === HOURS_VALUES.indexOf(segment.startime)
                                  ? "rounded-t"
                                  : i === HOURS_VALUES.indexOf(segment.endTime)
                                  ? "rounded-b"
                                  : ""
                              }`
                            : "hidden "
                        }`}
                      >
                        {time === segment.startime || time === segment.endTime
                          ? time
                          : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
