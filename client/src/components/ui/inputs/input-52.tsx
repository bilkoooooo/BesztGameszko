import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input52() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-52">Read-only input</Label>
      <Input
        id="input-52"
        className="read-only:bg-muted"
        defaultValue="This is a read-only input"
        readOnly
        placeholder="Email"
        type="email"
      />
    </div>
  );
}
