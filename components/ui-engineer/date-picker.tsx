"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { createPortal } from "react-dom";

export default function DatePicker() {
   const [open, setOpen] = React.useState(false);
   const [date, setDate] = React.useState<Date | undefined>(
      new Date(2003, 2, 3),
   );

   const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   return (
      <div className="flex flex-col gap-3">
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
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between bg-transparent text-primary-foreground-darker hover:text-primary-foreground-1"
               >
                  {date ? formatDate(date) : "03/03/2003"}
                  <ChevronsUpDown className="text-primary-foreground-darker" />
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className="w-auto overflow-hidden p-0 z-[51] relative rounded-xl shadow-sm"
               align="start"
            >
               <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                     setDate(selectedDate);
                     setOpen(false);
                  }}
                  defaultMonth={date}
                  className="text-primary-foreground-darker"
               />
            </PopoverContent>
         </Popover>
      </div>
   );
}
