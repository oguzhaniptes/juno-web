import * as React from "react";
import { cn } from "@/lib/utils"; // cn fonksiyonunuzun var olduğunu varsayıyoruz.

// Separator Props Tiplerini Tanımlama
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ayırıcının yönü: 'horizontal' (yatay) veya 'vertical' (dikey).
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Ayırıcının stilini ve görünürlüğünü belirler.
   * Eğer 'horizontal' ise, varsayılan olarak tam genişlik alır.
   * Eğer 'vertical' ise, yüksekliğini (h-full) veya verilen bir yüksekliği almalıdır.
   */
  decorative?: boolean;
}

// Separator Bileşeni
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(({ className, orientation = "horizontal", decorative, ...props }, ref) => (
  <div
    ref={ref}
    // role="separator" - Eğer decorative değilse erişilebilirlik için eklenir.
    role={decorative ? "none" : "separator"}
    aria-orientation={orientation === "vertical" ? "vertical" : undefined}
    className={cn(
      "shrink-0 bg-border", // Varsayılan olarak arka plan rengi border (sınır) rengi olsun.

      orientation === "horizontal"
        ? "h-[1px] w-full" // Yatay ise: çok ince yükseklik, tam genişlik
        : "h-full w-[1px]", // Dikey ise: tam yükseklik (parent'a göre), çok ince genişlik

      // Kullanıcının eklediği sınıfları uygula
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
