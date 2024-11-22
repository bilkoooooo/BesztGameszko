import { Button } from "@/components/utilities/button";
import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input22() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-22">Input with button</Label>
      <div className="flex gap-2">
        <Input id="input-22" className="flex-1" placeholder="Email" type="email" />
        <Button variant="outline">Send</Button>
      </div>
    </div>
  );
}
