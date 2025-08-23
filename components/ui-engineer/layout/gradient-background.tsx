"use client";

import { usePathname } from "next/navigation";

const GradientBackground = () => {
   const pathname = usePathname();
   const excludePaths = ["/themes", "/beta", "/experience"];
   const shouldShowGradient = !excludePaths.some((path) =>
      pathname.startsWith(path),
   );

   if (!shouldShowGradient) {
      return null;
   }

   return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
         {/* Base background */}
         {/* <div className="w-full h-full bg-pastel-1 relative"> */}
         <div className="w-full h-full relative">
            {/* Primary orange gradient - top left */}
            <div className="absolute -left-1/4 -top-1/4 w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] lg:w-[100vw] lg:h-[100vh]">
               <div
                  className="w-full h-full rounded-full bg-pastel-2 opacity-10"
                  style={{
                     filter: "blur(min(25vw, 250px))",
                     transform: "scale(0.8)",
                  }}
               />
            </div>

            {/* Secondary red gradient - top right */}
            <div className="absolute -right-1/4 -top-1/4 w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] lg:w-[100vw] lg:h-[100vh]">
               <div
                  className="w-full h-full rounded-full bg-pastel-3 opacity-10"
                  style={{
                     filter: "blur(min(20vw, 200px))",
                     transform: "scale(0.7)",
                  }}
               />
            </div>

            {/* Additional accent gradient - bottom center */}
            <div className="absolute left-1/2 -bottom-1/4 w-[100vw] h-[100vh] -translate-x-1/2">
               <div
                  className="w-full h-full rounded-full bg-pastel-4 opacity-10"
                  style={{
                     filter: "blur(min(15vw, 150px))",
                     transform: "scale(0.6)",
                  }}
               />
            </div>

            {/* Subtle accent - right side */}
            <div className="absolute -right-1/3 top-1/2 w-[80vw] h-[80vh] -translate-y-1/2">
               <div
                  className="w-full h-full rounded-full bg-pastel-5 opacity-10"
                  style={{
                     filter: "blur(min(12vw, 120px))",
                     transform: "scale(0.5)",
                  }}
               />
            </div>

            {/* Mobile-specific smaller accent */}
            <div className="absolute left-1/4 top-3/4 w-[60vw] h-[60vh] sm:hidden">
               <div
                  className="w-full h-full rounded-full bg-pastel-6 opacity-10"
                  style={{
                     filter: "blur(min(10vw, 100px))",
                     transform: "scale(0.4)",
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default GradientBackground;
