import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rgbToHex = (rgbStr: string) =>  {
  const [r, g, b] = rgbStr.match(/\d+/g).map(Number);

  // Convert each component to hex and pad with zeros if needed
  const toHex = (n) => n.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
