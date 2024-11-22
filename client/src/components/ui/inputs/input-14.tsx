import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input14() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-14">Input with start add-on</Label>
      <div className="flex rounded-lg shadow-sm shadow-black/5">
        <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
          https://
        </span>
        <Input
          id="input-14"
          className="-ms-px rounded-s-none shadow-none"
          placeholder="google.com"
          type="text"
        />
      </div>
    </div>
  );
}
