import React, { useState } from "react";
import { Segment } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HOURS_VALUES = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];

const DAYS = [
  { short: "dom", long: "domingo" },
  { short: "lun", long: "lunes" },
  { short: "mar", long: "martes" },
  { short: "mie", long: "miércoles" },
  { short: "jue", long: "jueves" },
  { short: "vie", long: "viernes" },
  { short: "sab", long: "sábado" },
];

export const WorkhoursEditor: React.FC<{ member: IMember }> = ({ member }) => {
  const { toast } = useToast();
  const [week, setWeek] = useState(
    DAYS.map((day, index) => ({
      ...day,
      workhour: member.workhours?.find((e) => e.day === index) || {
        day: index,
        segments: [],
      },
      selected: false, // Add selected property for each day
    }))
  );

  const [updating, setUpdating] = useState(false);

  const handleSegmentChange = (
    day: number,
    segmentIndex: number,
    updatedSegment: Partial<Segment>
  ) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: entry.workhour.segments.map((segment, index) =>
                  index === segmentIndex
                    ? { ...segment, ...updatedSegment }
                    : segment
                ),
              },
            }
          : entry
      )
    );
  };

  const handleAddSegment = (day: number) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: [
                  ...entry.workhour.segments,
                  { startime: "", endTime: "", duration: 0 },
                ],
              },
            }
          : entry
      )
    );
  };

  const handleRemoveSegment = (day: number, segmentIndex: number) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: entry.workhour.segments.filter(
                  (_, index) => index !== segmentIndex
                ),
              },
            }
          : entry
      )
    );
  };

  const handleDaySelection = (day: number) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? { ...entry, selected: !entry.selected }
          : entry
      )
    );
  };

  const handleReplicate = (sourceDay: number) => {
    const sourceWorkhour = week.find(
      (entry) => entry.workhour.day === sourceDay
    )?.workhour;
    if (!sourceWorkhour) return;

    setWeek((prev) =>
      prev.map((entry) =>
        entry.selected && entry.workhour.day !== sourceDay
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: [...sourceWorkhour.segments],
              },
            }
          : entry
      )
    );
  };

  const { editMember } = useCreatingFetch();
  const handleSave = async () => {
    try {
      setUpdating(true);
      const updatedWorkhours = week.map((entry) => entry.workhour);
      await editMember(member.id, { ...member, workhours: updatedWorkhours });
      toast({
        title: "Horarios actualizados",
        variant: "success",
      });
    } catch (error) {
      console.log("Error actualizando workhours:", error);
      alert("Hubo un error al actualizar los workhours.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full h-full justify-between">
      <section className="grid grid-cols-4 max-lg:grid-cols-2 max-md:flex  max-md:flex-col w-full gap-4 overflow-x-auto ">
        {week.map((entry) => (
          <Card className="flex flex-col w-full   flex-grow items-center justify-between  gap-1 p-2">
            <div className="flex items-center  gap-2">
              <input
                type="checkbox"
                checked={entry.selected}
                onChange={() => handleDaySelection(entry.workhour.day)}
              />
              <label>seleccionar</label>
            </div>
            <p className="font-medium uppercase">{entry.short}</p>
            <div key={entry.short} className=" w-full flex flex-col gap-2  ">
              <div className="flex flex-col items-start gap-4 w-full ">
                {entry.workhour.segments.map((segment, segmentIndex) => (
                  <div
                    key={segmentIndex}
                    className="flex items-center w-full gap-4"
                  >
                    <div className="flex  flex-col w-full gap-2">
                      <Select
                        value={segment.startime}
                        onValueChange={(startime) =>
                          handleSegmentChange(
                            entry.workhour.day,
                            segmentIndex,
                            {
                              startime,
                            }
                          )
                        }
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Inicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS_VALUES.map((hour) => (
                            <SelectItem value={hour} key={hour}>
                              <div className="flex gap-1 items-center">
                                {hour} hs
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={segment.endTime}
                        onValueChange={(endTime) =>
                          handleSegmentChange(
                            entry.workhour.day,
                            segmentIndex,
                            {
                              endTime,
                            }
                          )
                        }
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Fin" />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS_VALUES.map((hour) => (
                            <SelectItem value={hour} key={hour}>
                              <div className="flex gap-1 items-center">
                                {hour} hs
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() =>
                        handleRemoveSegment(entry.workhour.day, segmentIndex)
                      }
                      variant="secondary"
                      size="icon"
                      className="size-6"
                    >
                      <Minus className="  size-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => handleAddSegment(entry.workhour.day)}
                  variant="secondary"
                >
                  <PlusIcon className="  size-4" />
                </Button>

                <Button onClick={() => handleReplicate(entry.workhour.day)}>
                  Replicar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="flex flex-col items-start gap-4">
        <p>
          <span>REPLICAR* </span>
          Replica los horarios sobre los dias seleccionados
        </p>
        <Button variant={"outline"} onClick={handleSave} isLoading={updating}>
          Actualizar Horarios
        </Button>
      </div>
    </div>
  );
};
