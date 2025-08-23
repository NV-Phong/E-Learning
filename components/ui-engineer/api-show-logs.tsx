"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

export function APIShowLogs() {
   const [open, setOpen] = React.useState(false);

   return (
      <>
         {open &&
            createPortal(
               <div
                  className="fixed inset-0 backdrop-blur-[10px] z-[49]"
                  onClick={() => setOpen(false)}
                  style={{
                     position: "fixed",
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                  }}
               />,
               document.body
            )}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button variant={"ghost"} className="w-2/5 border">
                  Show Logs
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl shadow-sm bg-card z-[51] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <DialogHeader className="gap-1">
                  <DialogTitle>LOGs</DialogTitle>
                  <DialogDescription>Enjoy your bugs 🐛</DialogDescription>
               </DialogHeader>
               <div className="flex items-center gap-5 p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm text-primary-foreground-darker">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     STATUS
                  </Badge>
               </div>
               <div className="flex items-center gap-5 p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm text-primary-foreground-darker">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     RESPONSE
                  </Badge>
               </div>
               <div className="flex items-center gap-5 p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm text-primary-foreground-darker">
                  <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                     ERROR
                  </Badge>
               </div>

               <DialogFooter className="!justify-between">
                  <Button
                     type="button"
                     variant="outline"
                     className="w-2/5 bg-transparent dark:border-primary/10"
                     onClick={() => setOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" className="w-2/5">
                     Copy Logs
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
