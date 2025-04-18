// Dependencies: pnpm install lucide-react

import { Button } from "@/components/utilities/button";
import { ChevronRight } from "lucide-react";

export default function Button39() {
  return (
    <Button className="relative pe-12">
      Next
      <span className="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center bg-primary-foreground/15">
        <ChevronRight className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </Button>
  );
}
