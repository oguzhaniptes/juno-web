import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Bu fonksiyonu kullanabilmek için genellikle bir 'utils' dosyanız olur.

// 1. Badge Stillerini Tanımlama (CVA Kullanarak)
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      // 1.1. Rozet Tipleri (Variants) - Renk ve Arka Plan
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        success: "border-transparent bg-green-500 text-white dark:bg-green-600 hover:bg-green-500/80 dark:hover:bg-green-600/80",
        warning: "border-transparent bg-yellow-500 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-900 hover:bg-yellow-500/80 dark:hover:bg-yellow-600/80",
        error: "border-transparent bg-red-500 text-white dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80",
        outline: "text-foreground", // Sadece çerçeveli
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        custom: "border-transparent bg-purple-500 text-white dark:bg-purple-600 hover:bg-purple-500/80 dark:hover:bg-purple-600/80", // Ekstra bir özel renk
      },
      // 1.2. Boyutlar (Sizes)
      size: {
        sm: "text-xs px-2 py-0.5", // Small: Küçük metin, az padding
        md: "text-sm px-3 py-1", // Medium: Varsayılan
        lg: "text-base px-3.5 py-1.5", // Large: Biraz daha büyük
        xl: "text-lg px-4 py-2", // Extra Large: Büyük metin, çok padding
      },
    },
    defaultVariants: {
      variant: "default", // Varsayılan tip
      size: "md", // Varsayılan boyut
    },
  }
);

// 2. Props Tiplerini Tanımlama
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// 3. Badge Bileşeni
function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };

// NOT: Bu kodun çalışması için aşağıdaki paketlerin ve cn yardımcı fonksiyonunun projenizde kurulu olması gerekir:
// - tailwind-merge (cn'de kullanılır)
// - class-variance-authority (cva için)
// - cn yardımcı fonksiyonu: (Bu, genellikle sizin 'utils' dosyanızda bulunur.)
//   import { clsx } from "clsx"
//   import { twMerge } from "tailwind-merge"
//   export function cn(...inputs) { return twMerge(clsx(inputs)) }
