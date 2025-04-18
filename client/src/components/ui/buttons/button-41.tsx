// Dependencies: pnpm install lucide-react

import { Button } from "@/components/utilities/button";
import { Star } from "lucide-react";

export default function Button41() {
  return (
    <Button>
      <Star className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
      <span className="flex items-baseline gap-2">
        Star
        <span className="text-xs text-primary-foreground/60">729</span>
      </span>
    </Button>
  );
}
