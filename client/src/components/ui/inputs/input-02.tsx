import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input02() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">
        Required input <span className="text-destructive">*</span>
      </Label>
      <Input id="input-02" placeholder="Email" type="email" required />
    </div>
  );
}
