"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import StickyNote from "./sticky-note";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

type EdgePosition =
   | "top-left"
   | "top-right"
   | "bottom-left"
   | "bottom-right"
   | "center-left"
   | "center-right"
   | "top-center"
   | "bottom-center";

interface NoteData {
   id: number;
   date: string;
   timeAgo: string;
   edge: EdgePosition;
   offsetX: number; // Offset từ edge position
   offsetY: number; // Offset từ edge position
   rotation: number;
   zIndex: number;
   text: React.ReactNode;
}

const StickyNotes = () => {
   const router = useRouter();
   const { theme } = useTheme();
   const [screenDimensions, setScreenDimensions] = useState({
      width: 0,
      height: 0,
   });
   const [mounted, setMounted] = useState(false);
   const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
   const avatars = [
      "/graphics/Avatar-1.png",
      "/graphics/Avatar-2.png",
      "/graphics/Avatar-3.png",
   ];

   const [notes, setNotes] = useState<NoteData[]>([
      {
         id: 1,
         date: "My Journey",
         timeAgo: "1 month ago",
         edge: "top-left",
         offsetX: 100,
         offsetY: 200,
         rotation: -5,
         zIndex: 0,
         text: (
            <p className="text-foreground">
               This note is meant to capture my journey - the ups, the downs,
               the surprises, and the lessons along the way. But for now...
               it&apos;s a bit of a blank page. Maybe I&apos;m still figuring
               things out, or maybe the story just hasn&apos;t started yet.
               Either way, stay tuned - future me might have something epic (or
               at least mildly interesting) to say. See you then!
            </p>
         ),
      },
      {
         id: 2,
         date: "Some Tips",
         timeAgo: "you can drag and drop notes around",
         edge: "center-left",
         offsetX: 200,
         offsetY: -40,
         rotation: 3,
         zIndex: 1,
         text: (
            <Image
               src="/graphics/tip.svg"
               alt="Description"
               width={300}
               height={300}
               className="pointer-events-none"
            />
         ),
      },
      {
         id: 3,
         date: "Avatar",
         timeAgo: "2 weeks ago",
         edge: "top-right",
         offsetX: -465,
         offsetY: 200,
         rotation: -2,
         zIndex: 2,
         text: null, // Sẽ được xử lý riêng
      },
      {
         id: 4,
         date: "About Me",
         timeAgo: "1 week ago",
         edge: "center-right",
         offsetX: -335,
         offsetY: -100,
         rotation: 4,
         zIndex: 3,
         text: (
            <div className="flex flex-col h-full">
               <p className="overflow-y-auto text-foreground">
                  I&apos;m on a journey to become a software engineer who builds
                  thoughtful, scalable digital experiences. I&apos;m drawn to
                  both the elegance of user interfaces and the logic behind
                  backend systems and I find joy in connecting the two. Beyond
                  the stack, I&apos;m also exploring how AI and automation can
                  streamline development and enhance the way we build and use
                  software.
               </p>
               <div className="mt-auto">
                  <Button
                     onClick={() => router.push("/resume")}
                     className="w-full mt-4 px-4 py-2 bg-primary transition-colors duration-200"
                     variant="default"
                  >
                     View Resume
                  </Button>
               </div>
            </div>
         ),
      },
   ]);

   const handleExpandChange = (id: number) => (isExpanded: boolean) => {
      setExpandedNotes((prev) => {
         const newSet = new Set(prev);
         if (isExpanded) {
            newSet.add(id);
         } else {
            newSet.delete(id);
         }
         return newSet;
      });
   };

   // Cập nhật kích thước màn hình và mounted state
   useEffect(() => {
      setMounted(true);

      const updateScreenDimensions = () => {
         setScreenDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      updateScreenDimensions();
      window.addEventListener("resize", updateScreenDimensions);

      return () => window.removeEventListener("resize", updateScreenDimensions);
   }, []);

   // Tính toán vị trí dựa trên edge và offset
   const calculatePosition = (
      edge: EdgePosition,
      offsetX: number,
      offsetY: number,
   ) => {
      const { width, height } = screenDimensions;

      if (width === 0 || height === 0) return { x: 0, y: 0 };

      let baseX = 0;
      let baseY = 0;

      switch (edge) {
         case "top-left":
            baseX = 0;
            baseY = 0;
            break;
         case "top-right":
            baseX = width;
            baseY = 0;
            break;
         case "bottom-left":
            baseX = 0;
            baseY = height;
            break;
         case "bottom-right":
            baseX = width;
            baseY = height;
            break;
         case "center-left":
            baseX = 0;
            baseY = height / 2;
            break;
         case "center-right":
            baseX = width;
            baseY = height / 2;
            break;
         case "top-center":
            baseX = width / 2;
            baseY = 0;
            break;
         case "bottom-center":
            baseX = width / 2;
            baseY = height;
            break;
      }

      return {
         x: baseX + offsetX,
         y: baseY + offsetY,
      };
   };

   const handleDragStart = (id: number) => () => {
      const draggedNote = notes.find((note) => note.id === id);
      if (!draggedNote) return;

      const otherNotes = notes.filter((note) => note.id !== id);
      setNotes([...otherNotes, draggedNote]);
   };

   const handleDragEnd = (id: number) => (dragX: number, dragY: number) => {
      // Tính toán edge position mới dựa trên vị trí thực tế của element
      const { width, height } = screenDimensions;
      if (width === 0 || height === 0) return;

      // Sử dụng vị trí thực tế từ motion values
      const actualX = dragX;
      const actualY = dragY;

      let newEdge: EdgePosition = "top-left";
      let newOffsetX = actualX;
      let newOffsetY = actualY;

      // Xác định edge gần nhất dựa trên vị trí thực tế
      const centerX = width / 2;
      const centerY = height / 2;
      const quarterX = width / 4;
      const quarterY = height / 4;

      // Logic chi tiết hơn để xác định edge
      if (actualX < quarterX) {
         if (actualY < quarterY) {
            newEdge = "top-left";
            newOffsetX = actualX;
            newOffsetY = actualY;
         } else if (actualY > height - quarterY) {
            newEdge = "bottom-left";
            newOffsetX = actualX;
            newOffsetY = actualY - height;
         } else {
            newEdge = "center-left";
            newOffsetX = actualX;
            newOffsetY = actualY - centerY;
         }
      } else if (actualX > width - quarterX) {
         if (actualY < quarterY) {
            newEdge = "top-right";
            newOffsetX = actualX - width;
            newOffsetY = actualY;
         } else if (actualY > height - quarterY) {
            newEdge = "bottom-right";
            newOffsetX = actualX - width;
            newOffsetY = actualY - height;
         } else {
            newEdge = "center-right";
            newOffsetX = actualX - width;
            newOffsetY = actualY - centerY;
         }
      } else {
         if (actualY < quarterY) {
            newEdge = "top-center";
            newOffsetX = actualX - centerX;
            newOffsetY = actualY;
         } else if (actualY > height - quarterY) {
            newEdge = "bottom-center";
            newOffsetX = actualX - centerX;
            newOffsetY = actualY - height;
         } else {
            // Trung tâm - chọn edge gần nhất
            if (actualX < centerX) {
               newEdge = "center-left";
               newOffsetX = actualX;
               newOffsetY = actualY - centerY;
            } else {
               newEdge = "center-right";
               newOffsetX = actualX - width;
               newOffsetY = actualY - centerY;
            }
         }
      }

      setNotes(
         notes.map((note) =>
            note.id === id
               ? {
                    ...note,
                    edge: newEdge,
                    offsetX: newOffsetX,
                    offsetY: newOffsetY,
                 }
               : note,
         ),
      );
   };

   const renderAvatarContent = (isExpanded: boolean) => {
      if (isExpanded) {
         return (
            <div className="flex justify-center items-center">
               <Carousel className="h-[240px] w-[240px]">
                  <CarouselContent>
                     {avatars.map((src, index) => (
                        <CarouselItem key={index}>
                           <Card className="p-0 border-none">
                              <CardContent className="flex items-center justify-center p-0">
                                 <Image
                                    src={src}
                                    alt={`Avatar ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="object-cover rounded-xl border-3"
                                    draggable={false}
                                 />
                              </CardContent>
                           </Card>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious className="bg-primary/30" />
                  <CarouselNext className="bg-primary/30" />
               </Carousel>
            </div>
         );
      }

      return (
         <div className="flex">
            <Image
               src="/graphics/Avatar-1.png"
               alt="Description"
               width={100}
               height={100}
               className="rounded-md shadow-lg border-3 -rotate-5 m-3 pointer-events-none"
            />
            <Image
               src="/graphics/Avatar-2.png"
               alt="Description"
               width={100}
               height={100}
               className="rounded-md shadow-lg border-3 rotate-0 mt-5 -ml-20 pointer-events-none"
            />
            <Image
               src="/graphics/Avatar-3.png"
               alt="Description"
               width={100}
               height={100}
               className="rounded-md shadow-lg border-3 rotate-5 m-3 -ml-20 pointer-events-none"
            />
         </div>
      );
   };

   // Không render cho đến khi mounted hoặc trong dark mode
   if (!mounted || theme === "dark") {
      return null;
   }

   return (
      <div className="absolute inset-0 overflow-hidden hidden xl:block pointer-events-none">
         {notes.map((note, index) => {
            const position = calculatePosition(
               note.edge,
               note.offsetX,
               note.offsetY,
            );

            return (
               <motion.div
                  key={note.id}
                  className="pointer-events-auto"
                  initial={{
                     opacity: 0,
                     y: 100,
                     scale: 0.8,
                     rotate: note.rotation,
                  }}
                  animate={{
                     opacity: 1,
                     y: 0,
                     scale: 1,
                     rotate: note.rotation,
                  }}
                  transition={{
                     duration: 0.5,
                     delay: index * 0.1,
                     ease: "easeOut",
                  }}
               >
                  <StickyNote
                     date={note.date}
                     timeAgo={note.timeAgo}
                     text={
                        note.id === 3
                           ? renderAvatarContent(expandedNotes.has(3))
                           : note.text
                     }
                     initialX={position.x}
                     initialY={position.y}
                     rotation={note.rotation}
                     zIndex={note.zIndex}
                     onDragStart={handleDragStart(note.id)}
                     onDragEnd={handleDragEnd(note.id)}
                     onExpandChange={handleExpandChange(note.id)}
                  />
               </motion.div>
            );
         })}
      </div>
   );
};

export default StickyNotes;
