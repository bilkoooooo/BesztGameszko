// @ts-ignore
import { Input } from "@components/ui/utilities/input";
import { AtSign } from "lucide-react";

export default function InputWithIcon({Icon= AtSign, inputPlaceholder = '', onChange, value}) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input id="input-09"
               defaultValue={value}
               className="peer ps-9"
               placeholder={inputPlaceholder}
               type="text"
               onChange={onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Icon size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
