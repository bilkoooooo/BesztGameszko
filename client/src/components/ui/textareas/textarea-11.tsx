import { Button } from "@/components/utilities/button";
import { Label } from "@/components/utilities/label";
import { Textarea } from "@/components/utilities/textarea";

export default function Textarea11() {
  return (
    <div className="space-y-2">
      <Label htmlFor="textarea-11">Textarea with right button</Label>
      <Textarea id="textarea-11" placeholder="Leave a comment" />
      <div className="flex justify-end">
        <Button variant="outline">Send</Button>
      </div>
    </div>
  );
}
