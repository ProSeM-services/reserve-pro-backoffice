import { PermissionLabel } from "@/components/common/permission-label";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Permission } from "@/lib/constants/permissions";
import { XIcon } from "lucide-react";

interface AddPermissionsProps {
  selectedPermissions: Permission[];
  handleAddPermission: (value: Permission) => void;
  handleRemovePermission: (value: Permission) => void;
}
export const AddPermissions = ({
  handleAddPermission,
  selectedPermissions,
  handleRemovePermission,
}: AddPermissionsProps) => {
  const allPermissions = Object.values(Permission);

  return (
    <div className="space-y-4">
      <h2>Permisos del Usuario</h2>
      {/* Dropdown para seleccionar permisos */}
      <div className="mb-4">
        <Label>Seleccionar Permiso</Label>

        <Select onValueChange={handleAddPermission}>
          <SelectTrigger className="w-full">
            <Label>Ver Permisos</Label>
          </SelectTrigger>
          <SelectContent>
            {allPermissions.map((permission) => (
              <SelectItem key={permission} value={permission}>
                <div className="flex">
                  <PermissionLabel permission={permission} />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Lista de permisos seleccionados */}
      <div className="space-y-2 ">
        <div className="flex flex-wrap gap-2">
          {selectedPermissions.length > 0 ? (
            selectedPermissions.map((permission) => (
              <div
                key={permission}
                className="flex  items-center gap-2 bg-accent p-2 rounded-sm"
              >
                <PermissionLabel permission={permission} />
                <Button
                  type="button"
                  variant={"destructive"}
                  size={"icon"}
                  className="size-4 aspect-square rounded-full "
                  onClick={() => handleRemovePermission(permission)}
                >
                  <XIcon className="size-3" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No se han seleccionado permisos.</p>
          )}
        </div>
      </div>
    </div>
  );
};
