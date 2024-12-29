import { Input } from "@/components/ui/input";
import { IMember } from "@/interfaces/member.iterface";
import { MemberServices } from "@/services/member.services";
import { useState } from "react";
import { MemberCard } from "./member-card";
import LoaderWrapper from "@/components/common/loader-wrapper";
import { UserRoundX, UserSearch } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
export function SearchMembers() {
  const [members, setMembers] = useState<IMember[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [isResponseEmpty, setIsResponseEmpty] = useState(false);

  const debounceSearch = useDebouncedCallback(async (value: string) => {
    setSearching(true);
    setSearchValue(value);
    const res = await MemberServices.searchMembers(value);
    setMembers(res);
    setIsResponseEmpty(res.length === 0 && value !== "");
    setSearching(false);
  }, 300);
  const handleInputChange = (value: string) => {
    setSearchValue(value);
    debounceSearch(value);
  };
  return (
    <section className="size-full p-4 border border-border rounded-sm flex flex-col max-h-full">
      <div>
        <Input
          placeholder="Buscar miembros en Reserve Pro"
          value={searchValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 flex-grow py-4 overflow-auto max-h-full  ">
        <LoaderWrapper type="members" loading={searching}>
          {members.length === 0 && !isResponseEmpty ? (
            <div className=" flex-grow h-64 w-full rounded-lg flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ">
              <UserSearch className="size-16 mb-4 text-primary " />
              <h3 className="text-xl font-semibold mb-2">
                Resultados de Búsqueda
              </h3>
              <p className="text-sm text-muted-foreground">
                Por favor ingresa un valor para buscar un miembro en el sistema
                de ReservePro
              </p>
            </div>
          ) : isResponseEmpty ? (
            <div className=" flex-grow h-64 w-full rounded-lg flex  flex-col items-center justify-center text-center p-6 transition-all duration-300 ">
              <UserRoundX className="size-16 mb-4 text-primary " />
              <h3 className="text-xl font-semibold mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-sm text-muted-foreground">
                No se encuetran resultados para <b>{searchValue}</b> en Reserve
                Pro
              </p>
            </div>
          ) : (
            <>
              {members.map((member) => (
                <MemberCard member={member} key={member.id} type="invite" />
              ))}
            </>
          )}
        </LoaderWrapper>
      </div>
    </section>
  );
}
