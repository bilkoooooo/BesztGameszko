import { Checkbox } from "@/components/utilities/checkbox";
import { Label } from "@/components/utilities/label";

export default function Checkbox05() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-05" defaultChecked />
      <Label htmlFor="checkbox-05" className="peer-data-[state=checked]:line-through">
        Simple todo item
      </Label>
    </div>
  );
}
