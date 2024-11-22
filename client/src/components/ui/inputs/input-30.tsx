import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input30() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-30">File input</Label>
      <Input id="input-30" className="p-0 pe-3 file:me-3 file:border-0 file:border-e" type="file" />
    </div>
  );
}
