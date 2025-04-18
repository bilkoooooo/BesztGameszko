// Dependencies: pnpm install lucide-react

import { Button } from "@/components/utilities/button";
import { FlipHorizontal, FlipVertical } from "lucide-react";

export default function Button29() {
  return (
    <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Flip Horizontal"
      >
        <FlipHorizontal size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Flip Vertical"
      >
        <FlipVertical size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
    </div>
  );
}
