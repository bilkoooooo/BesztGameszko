import { Input } from "@/components/utilities/input";
import { Label } from "@/components/utilities/label";

export default function Input05() {
  return (
    <div
      className="space-y-2"
      // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
      style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
    >
      <Label htmlFor="input-05">Input with colored border and ring</Label>
      <Input id="input-05" placeholder="Email" type="email" />
    </div>
  );
}
