"use client";
import Particles from "@/components/magicui/particles";
import IntroCard from "@/components/ui-engineer/intro-card";
import StickyNotes from "@/components/ui-engineer/sticky-notes";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import MyWork from "./my-work/page";

export default function Home() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const myWorkRef = useRef<HTMLDivElement | null>(null);

   const [showParticles, setShowParticles] = useState(true);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   const scrollToMyWork = () => {
      if (myWorkRef.current) {
         myWorkRef.current.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div>
         <div className="z-10 flex items-center justify-center min-h-screen">
            <div className="z-49">
               <StickyNotes />
            </div>

            <div className="flex flex-col items-center justify-center">
               <div className="max-w-7xl mx-auto w-full pt-20 md:pt-0">
                  <IntroCard onGoToMyWork={scrollToMyWork} />
               </div>
            </div>

            {showParticles && (
               <Particles
                  className="absolute inset-0 z-0"
                  quantity={100}
                  ease={80}
                  color={color}
                  refresh
               />
            )}
         </div>
         <div ref={myWorkRef}>
            <MyWork />
         </div>
      </div>
   );
}
