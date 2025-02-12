import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 280) + 70; // Low saturation
  const lightness = Math.floor(Math.random() * 30) + 70; // High lightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}