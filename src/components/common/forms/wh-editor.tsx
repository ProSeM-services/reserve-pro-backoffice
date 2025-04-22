import React, { useEffect, useState } from "react";
import { IWorkhour, Segment } from "@/interfaces";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  CircleDot,
  Copy,
  Edit,
  Minus,
  PlusIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/hooks/useCreatingFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthorizationWrapper from "@/components/auth/authorization-wrapper";
import { Permission } from "@/lib/constants/permissions";
import { Label } from "@/components/ui/label";
import { hasPermission } from "@/lib/auth/has-permission";
import useSession from "@/hooks/useSession";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface IDay {
  short: string;
  long: string;
}
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

const DAYS: IDay[] = [
  { short: "dom", long: "domingo" },
  { short: "lun", long: "lunes" },
  { short: "mar", long: "martes" },
  { short: "mie", long: "miércoles" },
  { short: "jue", long: "jueves" },
  { short: "vie", long: "viernes" },
  { short: "sab", long: "sábado" },
];

export const WorkhoursEditor: React.FC<{
  id: string;
  workhours?: IWorkhour[];
  type: "member" | "company";
}> = ({ id, workhours, type }) => {
  // console.log("WorkhoursEditor", member.workhours);
  const { toast } = useToast();

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
  }, [id]);

  const [updating, setUpdating] = useState(false);

  const handleSegmentChange = (
    day: number,
    segmentIndex: number,
    updatedSegment: Partial<Segment>
  ) => {
    const updatedWeek = week.map((entry) =>
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
    );
    setWeek(updatedWeek);
    // setSelectedDay(updatedWeek.find((e) => e.workhour.day === day));
  };

  const handleAddSegment = (day: number) => {
    const updatedWeek = week.map((entry) =>
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
    );
    setWeek(updatedWeek);

    // setSelectedDay(updatedWeek.find((e) => e.workhour.day === day));
  };

  const handleRemoveSegment = (day: number, segmentIndex: number) => {
    const updatedWeek = week.map((entry) =>
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
    );
    setWeek(updatedWeek);
    // setSelectedDay(updatedWeek.find((e) => e.workhour.day === day));
  };

  const handleDaySelection = (long: string) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.long === long ? { ...entry, selected: !entry.selected } : entry
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

    const replicatedDays = week.filter((w) => w.selected).map((e) => e.long);
    toast({
      title: "Horarios Replicados",
      description: `Horarios replicados en ${replicatedDays}`,
    });
  };

  const { editMember, editCompany } = useCreatingFetch();
  const handleSave = async () => {
    try {
      setUpdating(true);
      const updatedWorkhours = week.map((entry) => entry.workhour);
      if (type === "member") {
        await editMember(id, { workhours: updatedWorkhours });
      } else {
        await editCompany(id, { workhours: updatedWorkhours });
      }
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

  const { member } = useSession();
  const selectIsDisabled = !hasPermission(member, Permission.UPDATE_WORKHOURS);

  return (
    <div className="flex flex-col items-start  w-full h-full justify-between gap-2  ">
      <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 text-[14px]  font-medium bg-accent rounded px-4 p-2">
            <p>Editar</p>
            <Edit className="size-4" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Modificar Horarios</SheetTitle>
              <SheetDescription>
                Puedes definir un bloque de horarios para cada dia de la semana.
                Si deseas replicar un bloque de horarios en varios dias,
                selecciona los dias y luego presiona "Replicar".
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </AuthorizationWrapper>
      <div className="grid grid-cols-7  w-full h-full">
        {week.map((weekItem) => (
          <div key={weekItem.long}>
            <div
              className={`flex gap-2 items-center  justify-center p-2 border text-center ${
                weekItem.selected && "bg-primary text-white"
              }`}
            >
              <Label className="uppercase">{weekItem.long}</Label>
              <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
                <Button
                  variant={weekItem.selected ? "default" : "ghost"}
                  onClick={() => handleDaySelection(weekItem.long)}
                >
                  {weekItem.selected ? (
                    <CircleCheck className="  size-4" />
                  ) : (
                    <CircleDot className="  size-4" />
                  )}
                </Button>
              </AuthorizationWrapper>
            </div>
            <div className="border flex flex-col gap-2 p-2">
              {weekItem.workhour.segments.map((segment, segmentIndex) => (
                <div
                  key={segmentIndex}
                  className="flex items-center w-full gap-4"
                >
                  <div className="flex  flex-col w-full gap-2">
                    <Select
                      disabled={selectIsDisabled}
                      value={segment.startime}
                      onValueChange={(startime) =>
                        handleSegmentChange(
                          weekItem.workhour.day,
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
                      disabled={selectIsDisabled}
                      value={segment.endTime}
                      onValueChange={(endTime) =>
                        handleSegmentChange(
                          weekItem.workhour.day,
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
                  <AuthorizationWrapper
                    permission={Permission.UPDATE_WORKHOURS}
                  >
                    <Button
                      onClick={() =>
                        handleRemoveSegment(weekItem.workhour.day, segmentIndex)
                      }
                      variant="secondary"
                      size="icon"
                      className="size-6"
                    >
                      <Minus className="  size-4" />
                    </Button>
                  </AuthorizationWrapper>
                </div>
              ))}
              {!weekItem.selected && (
                <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
                  <Button
                    onClick={() => handleAddSegment(weekItem.workhour.day)}
                    variant="secondary"
                    className="flex gap-2"
                  >
                    <p>Agregar</p>
                    <PlusIcon className="  size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleReplicate(weekItem.workhour.day)}
                    className="flex gap-2"
                  >
                    <p>Replicar</p>
                    <Copy className="  size-4" />
                  </Button>
                </AuthorizationWrapper>
              )}
            </div>
          </div>
        ))}
      </div>
      <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
        <div className="flex flex-col items-start gap-4  w-full">
          <Button onClick={handleSave} isLoading={updating} className="w-full">
            Actualizar Horarios
          </Button>
        </div>
      </AuthorizationWrapper>
      <header className="text-[12px] flex justify-center bg-muted py-1 rounded max-md:flex-col max-md:text-xs gap-2 text-gray-700 mx-auto w-full">
        <div className="flex items-center gap-1 px-2 ">
          <CircleDot className="  size-4 text-gray-950" />
          <p> Selecciona los dias donde quieras replicar un mismo horario</p>
        </div>
        <div className="flex items-center gap-1 px-2 ">
          <PlusIcon className="  size-4 text-gray-950" />
          <p> Agrega un "slot" de horarios</p>
        </div>
        <div className="flex items-center gap-1 px-2 ">
          <Copy className="  size-4 text-gray-950" />
          <p> Replica los horarios sobre los dias seleccionados</p>
        </div>
      </header>
    </div>
  );
  // return (
  //   <div className="flex flex-col items-start  w-full h-full justify-between gap-2  ">
  //     <div className="flex flex-col gap-4 w-full">
  //       <div className="flex gap-4 ">
  //         <div className="flex flex-col gap-2 w-1/3 ">
  //           <p>Seleccionar un dia</p>
  //           {week.map((day) => (
  //             <div key={day.long} className="flex gap-1">
  //               {selectedDay && (
  //                 <AuthorizationWrapper
  //                   permission={Permission.UPDATE_WORKHOURS}
  //                 >
  //                   <Button
  //                     variant={day.selected ? "default" : "ghost"}
  //                     onClick={() => handleDaySelection(day.long)}
  //                   >
  //                     {day.selected ? (
  //                       <CircleCheck className="  size-4" />
  //                     ) : (
  //                       <CircleDot className="  size-4" />
  //                     )}
  //                   </Button>
  //                 </AuthorizationWrapper>
  //               )}
  //               <div
  //                 key={day.long}
  //                 onClick={() => handleSelectDay(day.long)}
  //                 className={`p-2 flex-grow border cursor-pointer transition-all duration-150 ${
  //                   selectedDay?.long === day.long
  //                     ? "bg-primary text-white"
  //                     : ""
  //                 }`}
  //               >
  //                 <div className="flex gap-1 items-center">{day.long}</div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         <section className="flex-grow flex flex-col items-end gap-2">
  //           {selectedDay && (
  //             <Card className="flex flex-col w-full   flex-grow items-center   gap-4 p-2">
  //               <div className="flex flex-col items-center gap-2">
  //                 <Label className="font-medium uppercase">
  //                   {selectedDay.long}
  //                 </Label>

  //                 <AuthorizationWrapper
  //                   permission={Permission.UPDATE_WORKHOURS}
  //                 >
  //                   <div className="flex items-center  gap-2">
  //                     <Button
  //                       onClick={() =>
  //                         handleAddSegment(selectedDay.workhour.day)
  //                       }
  //                       variant="secondary"
  //                       className="flex gap-2"
  //                     >
  //                       <p>Agregar</p>
  //                       <PlusIcon className="  size-4" />
  //                     </Button>

  //                     <Button
  //                       variant="secondary"
  //                       onClick={() =>
  //                         handleReplicate(selectedDay.workhour.day)
  //                       }
  //                       className="flex gap-2"
  //                     >
  //                       <p>Replicar</p>
  //                       <Copy className="  size-4" />
  //                     </Button>
  //                   </div>
  //                 </AuthorizationWrapper>
  //               </div>
  //               <div
  //                 key={selectedDay.long}
  //                 className=" w-full h-full flex flex-col gap-2  "
  //               >
  //                 {selectedDay.workhour.segments.length === 0 ? (
  //                   <div className=" grid place-items-center h-full">
  //                     Sin horarios definidos
  //                   </div>
  //                 ) : (
  //                   <div className="flex flex-col items-start gap-4 w-full ">
  //                     {selectedDay.workhour.segments.map(
  //                       (segment, segmentIndex) => (
  //                         <div
  //                           key={segmentIndex}
  //                           className="flex items-center w-full gap-4"
  //                         >
  //                           <div className="flex  flex-col w-full gap-2">
  //                             <Select
  //                               disabled={selectIsDisabled}
  //                               value={segment.startime}
  //                               onValueChange={(startime) =>
  //                                 handleSegmentChange(
  //                                   selectedDay.workhour.day,
  //                                   segmentIndex,
  //                                   {
  //                                     startime,
  //                                   }
  //                                 )
  //                               }
  //                             >
  //                               <SelectTrigger className="">
  //                                 <SelectValue placeholder="Inicio" />
  //                               </SelectTrigger>
  //                               <SelectContent>
  //                                 {HOURS_VALUES.map((hour) => (
  //                                   <SelectItem value={hour} key={hour}>
  //                                     <div className="flex gap-1 items-center">
  //                                       {hour} hs
  //                                     </div>
  //                                   </SelectItem>
  //                                 ))}
  //                               </SelectContent>
  //                             </Select>
  //                             <Select
  //                               disabled={selectIsDisabled}
  //                               value={segment.endTime}
  //                               onValueChange={(endTime) =>
  //                                 handleSegmentChange(
  //                                   selectedDay.workhour.day,
  //                                   segmentIndex,
  //                                   {
  //                                     endTime,
  //                                   }
  //                                 )
  //                               }
  //                             >
  //                               <SelectTrigger className="">
  //                                 <SelectValue placeholder="Fin" />
  //                               </SelectTrigger>
  //                               <SelectContent>
  //                                 {HOURS_VALUES.map((hour) => (
  //                                   <SelectItem value={hour} key={hour}>
  //                                     <div className="flex gap-1 items-center">
  //                                       {hour} hs
  //                                     </div>
  //                                   </SelectItem>
  //                                 ))}
  //                               </SelectContent>
  //                             </Select>
  //                           </div>
  //                           <AuthorizationWrapper
  //                             permission={Permission.UPDATE_WORKHOURS}
  //                           >
  //                             <Button
  //                               onClick={() =>
  //                                 handleRemoveSegment(
  //                                   selectedDay.workhour.day,
  //                                   segmentIndex
  //                                 )
  //                               }
  //                               variant="secondary"
  //                               size="icon"
  //                               className="size-6"
  //                             >
  //                               <Minus className="  size-4" />
  //                             </Button>
  //                           </AuthorizationWrapper>
  //                         </div>
  //                       )
  //                     )}
  //                   </div>
  //                 )}
  //               </div>
  //             </Card>
  //           )}

  //           <AuthorizationWrapper permission={Permission.UPDATE_WORKHOURS}>
  //             <div className="flex flex-col items-start gap-4  w-full">
  //               <Button
  //                 onClick={handleSave}
  //                 isLoading={updating}
  //                 className="w-full"
  //               >
  //                 Actualizar Horarios
  //               </Button>
  //             </div>
  //           </AuthorizationWrapper>
  //         </section>
  //       </div>
  //     </div>
  //   </div>
  // );
};
