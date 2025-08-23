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
import { Label } from "@/components/ui/label";
import { useContributionGraphContext } from "@/context/cg-context";

export function CommitChanges() {
   const [open, setOpen] = React.useState(false);
   const { totalDays, commitsPerDay } = useContributionGraphContext();

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
               document.body,
            )}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button className="w-2/5" type="submit">
                  Commit Changes
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl shadow-sm bg-card z-[51] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <DialogHeader>
                  <DialogTitle>COMMIT CHANGES</DialogTitle>
                  <DialogDescription>
                     Auto save recent changes to the repository.
                  </DialogDescription>
               </DialogHeader>
               <div className="space-y-3">
                  <div className="space-y-1">
                     <div className="text-center p-2 bg-primary/5 border border-primary/20 rounded-md text-sm font-medium text-primary-foreground-darker">
                        Total Commit • {totalDays * (commitsPerDay ?? 0)}
                     </div>
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="description" className="pb-1">
                        Process
                     </Label>
                     <div className=" h-30 text-center p-2 bg-primary/5 border border-primary/20 rounded-md text-sm flex justify-center items-center text-primary-foreground-darker">
                        <p>The process will be running here.</p>
                     </div>
                  </div>
               </div>
               <DialogFooter className="!justify-between">
                  <Button
                     type="button"
                     variant="outline"
                     className="w-2/5 bg-transparent"
                     onClick={() => setOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" className="w-2/5">
                     Start Process
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
