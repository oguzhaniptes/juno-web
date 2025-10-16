import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS sınıflarını koşullu olarak birleştirir ve çakışan sınıfları çözer.
 * @param inputs - Birleştirilecek sınıf dizileri, nesneler veya string'ler.
 * @returns Birleştirilmiş ve optimize edilmiş sınıf string'i.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
