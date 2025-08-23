"use client";

import type React from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import Icon from "./Icon";

interface StickyNoteProps {
   text?: ReactNode;
   date?: string;
   timeAgo?: string;
   initialX: number;
   initialY: number;
   rotation: number;
   zIndex: number;
   onDragStart?: () => void;
   onDragEnd?: (x: number, y: number) => void;
   onExpandChange?: (isExpanded: boolean) => void;
   animation?: "flyIn" | "flyOut" | "none";
}

const StickyNote = ({
   text,
   date,
   timeAgo,
   initialX,
   initialY,
   rotation,
   zIndex,
   onDragStart,
   onDragEnd,
   onExpandChange,
   animation = "none",
}: StickyNoteProps) => {
   const [isDragging, setIsDragging] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);
   const noteRef = useRef<HTMLDivElement>(null);

   const x = useMotionValue(initialX);
   const y = useMotionValue(initialY);

   // Cập nhật vị trí khi initialX, initialY thay đổi
   useEffect(() => {
      x.set(initialX);
      y.set(initialY);
   }, [initialX, initialY, x, y]);

   // Tăng stiffness và damping để giảm hiệu ứng đàn hồi
   const springConfig = { damping: 50, stiffness: 800 };
   const scaleMotion = useSpring(1, springConfig);

   useEffect(() => {
      scaleMotion.set(isDragging ? 1.02 : 1);
   }, [isDragging, scaleMotion]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            isExpanded &&
            noteRef.current &&
            !noteRef.current.contains(event.target as Node)
         ) {
            setIsExpanded(false);
            onExpandChange?.(false);
         }
      };

      if (isExpanded) {
         document.addEventListener("mousedown", handleClickOutside);
         return () =>
            document.removeEventListener("mousedown", handleClickOutside);
      }
   }, [isExpanded, onExpandChange]);

   const handleExpandClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState);
      onExpandChange?.(newExpandedState);
   };

   const getAnimationVariants = () => {
      const baseVariants = {
         initial: { opacity: 0 },
         animate: {
            opacity: 1,
            rotate: isExpanded ? 0 : rotation,
            scale: isExpanded ? 1.2 : 1,
            transition: {
               type: "spring",
               stiffness: 200,
               damping: 25,
               mass: 1,
               ease: [0.23, 1, 0.32, 1],
               duration: 0.3,
            },
         },
         exit: { opacity: 0 },
      };

      switch (animation) {
         case "flyIn":
            return {
               initial: {
                  opacity: 0,
                  x: initialX + 100,
                  y: initialY + 100,
                  scale: 0.5,
               },
               animate: {
                  ...baseVariants.animate,
                  x: initialX,
                  y: initialY,
                  scale: 1,
                  transition: {
                     type: "spring",
                     stiffness: 200,
                     damping: 20,
                     mass: 1,
                  },
               },
               exit: {
                  opacity: 0,
                  x: initialX - 100,
                  y: initialY - 100,
                  scale: 0.5,
                  transition: {
                     type: "spring",
                     stiffness: 200,
                     damping: 20,
                     mass: 1,
                  },
               },
            };
         case "flyOut":
            return {
               initial: {
                  opacity: 0,
                  x: initialX - 100,
                  y: initialY - 100,
                  scale: 0.5,
               },
               animate: {
                  ...baseVariants.animate,
                  x: initialX,
                  y: initialY,
                  scale: 1,
                  transition: {
                     type: "spring",
                     stiffness: 200,
                     damping: 20,
                     mass: 1,
                  },
               },
               exit: {
                  opacity: 0,
                  x: initialX + 100,
                  y: initialY + 100,
                  scale: 0.5,
                  transition: {
                     type: "spring",
                     stiffness: 200,
                     damping: 20,
                     mass: 1,
                  },
               },
            };
         default:
            return baseVariants;
      }
   };

   return (
      <motion.div
         ref={noteRef}
         className={`absolute p-6 cursor-grab bg-card rounded-2xl shadow-lg touch-none flex flex-col ${
            isExpanded ? "w-96 h-96" : "w-64 h-64"
         }`}
         style={{
            x,
            y,
            scale: scaleMotion,
            zIndex: isExpanded ? 999 : zIndex,
         }}
         variants={getAnimationVariants()}
         initial="initial"
         animate="animate"
         exit="exit"
         drag
         dragMomentum={false}
         dragElastic={0.01}
         dragTransition={{
            bounceStiffness: 800,
            bounceDamping: 50,
            power: 0.5,
         }}
         onDragStart={() => {
            setIsDragging(true);
            onDragStart?.();
         }}
         onDragEnd={() => {
            setIsDragging(false);
            // Sử dụng motion values thực tế thay vì info.point
            onDragEnd?.(x.get(), y.get());
         }}
         whileHover={{
            scale: isDragging ? 1.02 : isExpanded ? 1.2 : 1.01,
            rotate: isExpanded ? 0 : rotation + (Math.random() - 0.5) * 3,
            transition: {
               type: "spring",
               stiffness: 400,
               damping: 25,
            },
         }}
         layout
      >
         {date && (
            <div className="text-primary text-2xl font-medium mb-2 select-none">
               {date}
            </div>
         )}

         {text && (
            <div className="text-foreground text-sm leading-relaxed select-none flex-1 overflow-y-auto">
               {text}
            </div>
         )}

         <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center gap-2 text-foreground/75 text-xs select-none">
               <Icon
                  size={15}
                  styles="stroke"
                  name="task-01-stroke-rounded"
                  className="!bg-foreground/75"
               />
               Note • {timeAgo}
            </div>

            <div
               className="select-none cursor-pointer"
               onClick={handleExpandClick}
            >
               <Icon
                  styles="bulk"
                  name="link-circle-bulk-rounded"
                  className="!bg-foreground/50"
               />
            </div>
         </div>
      </motion.div>
   );
};

export default StickyNote;
