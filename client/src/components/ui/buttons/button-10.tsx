// Dependencies: pnpm install lucide-react

import { Button } from "@/components/utilities/button";
import { ArrowRight, Mail } from "lucide-react";

export default function Button31() {
  return (
    <Button className="group" variant="secondary">
      <Mail className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
      Email
      <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
}
