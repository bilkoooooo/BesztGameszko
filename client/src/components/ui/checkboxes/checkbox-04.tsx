import { Checkbox } from "@/components/utilities/checkbox";
import { Label } from "@/components/utilities/label";

export default function Checkbox04() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-04" disabled />
      <Label htmlFor="checkbox-04">Disabled checkbox</Label>
    </div>
  );
}
