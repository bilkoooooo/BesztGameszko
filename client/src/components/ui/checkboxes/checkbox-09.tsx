import { Checkbox } from "@/components/utilities/checkbox";
import { Label } from "@/components/utilities/label";

export default function Checkbox09() {
  return (
    <div className="flex items-center justify-between gap-2">
      <Checkbox id="checkbox-09" className="order-1" />
      <Label htmlFor="checkbox-09">Right aligned checkbox</Label>
    </div>
  );
}
