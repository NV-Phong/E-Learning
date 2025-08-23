import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import Next.js Image component

interface IconProps extends HTMLAttributes<HTMLDivElement> {
   name: string;
   styles?: string;
   size?: number;
   color?: string;
   image?: boolean; // Prop để sử dụng thẻ Image của Next.js
}

export const Icon = ({
   name,
   styles,
   size = 20,
   color = "var(--icon)",
   className,
   image = false, // Mặc định là false
   ...props
}: IconProps) => {
   const iconPath = styles
      ? `/icons/${styles}/${name}.svg`
      : `/icons/${name}.svg`;

   if (image) {
      return (
         <Image
            src={iconPath || "/placeholder.svg"} // Sử dụng placeholder nếu iconPath không hợp lệ
            alt={`Icon of ${name}`} // Văn bản thay thế cho khả năng truy cập
            width={size} // Bắt buộc cho next/image
            height={size} // Bắt buộc cho next/image
            className={cn("object-contain", className)}
            {...props}
         />
      );
   }

   return (
      <div
         className={cn("flex items-center justify-center", className)}
         style={{
            width: size,
            height: size,
            maskImage: `url(${iconPath})`,
            WebkitMaskImage: `url(${iconPath})`,
            backgroundColor: color,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
         }}
         {...props}
      />
   );
};

export default Icon;
