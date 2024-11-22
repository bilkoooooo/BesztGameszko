import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input08() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-08">Disabled input</Label>
      <Input id="input-08" placeholder="Email" type="email" disabled />
    </div>
  );
}
