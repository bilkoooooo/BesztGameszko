import { Label } from "@/components/utilities/label";
import { Textarea } from "@/components/utilities/textarea";

export default function Textarea17() {
  return (
    <div className="space-y-2">
      <Label htmlFor="textarea-17">Textarea with no resize</Label>
      <Textarea id="textarea-17" className="[resize:none]" placeholder="Leave a comment" />
    </div>
  );
}
