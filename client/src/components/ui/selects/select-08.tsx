import { Label } from "@/components/utilities/label";
import { SelectNative } from "@/components/utilities/select-native";

export default function Select08() {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-08">Disabled select (native)</Label>
      <SelectNative id="select-08" disabled>
        <option value="s1">React</option>
        <option value="s2">Next.js</option>
        <option value="s3">Astro</option>
        <option value="s4">Gatsby</option>
      </SelectNative>
    </div>
  );
}
