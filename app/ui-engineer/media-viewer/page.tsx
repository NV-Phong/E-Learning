import React from "react";
import Image from "next/image";

export default function page() {
   return (
      <div className="flex items-center justify-center h-screen bg-[#EAD7B9]">
         <Image
            src="/graphics/404-not-found.svg"
            alt="Description"
            width={1000}
            height={412}
         />
      </div>
   );
}
