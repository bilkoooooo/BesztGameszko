import { Label } from "@/components/utilities/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/utilities/select";

export default function Select16() {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-16">Select with placeholder</Label>
      <Select>
        <SelectTrigger id="select-16">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="s1">React</SelectItem>
          <SelectItem value="s2">Next.js</SelectItem>
          <SelectItem value="s3">Astro</SelectItem>
          <SelectItem value="s4">Gatsby</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
