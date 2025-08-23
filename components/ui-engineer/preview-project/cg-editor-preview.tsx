"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function CGEditorPreview() {
   const [open, setOpen] = React.useState(false);
   const avatars = [
      "/graphics/project/cg-editor/377shots_so.png",
      "/graphics/project/cg-editor/Ảnh chụp màn hình (334).png",
      "/graphics/project/cg-editor/Ảnh chụp màn hình (335).png",
      "/graphics/project/cg-editor/Ảnh chụp màn hình (336).png",
      "/graphics/project/cg-editor/Ảnh chụp màn hình (337).png",
   ];

   return (
      <>
         {open &&
            createPortal(
               <div
                  className="fixed inset-0 backdrop-blur-[10px] z-[9998]"
                  onClick={() => setOpen(false)}
                  style={{
                     position: "fixed",
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                  }}
               />,
               document.body,
            )}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button type="submit">Take a Look</Button>
            </DialogTrigger>
            <DialogContent className="p-0 rounded-xl shadow-sm bg-transparent shadow-none border-none z-[9999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <DialogTitle>
                  <Carousel>
                     <CarouselContent>
                        {avatars.map((src, index) => (
                           <CarouselItem
                              key={index}
                              className="flex justify-center items-center"
                           >
                              <Card className="p-0 border-none">
                                 <CardContent className="flex items-center justify-center p-0">
                                    <Image
                                       src={src}
                                       alt={`Avatar ${index + 1}`}
                                       width={1200}
                                       height={1200}
                                       className="object-contain rounded-xl border"
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
               </DialogTitle>
            </DialogContent>
         </Dialog>
      </>
   );
}
