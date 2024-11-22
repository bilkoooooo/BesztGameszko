import { Checkbox } from "@/components/utilities/checkbox";
import { Label } from "@/components/utilities/label";

export default function Checkbox01() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-01" />
      <Label htmlFor="checkbox-01">Simple checkbox</Label>
    </div>
  );
}
