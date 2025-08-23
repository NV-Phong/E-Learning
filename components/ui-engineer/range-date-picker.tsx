"use client";

import * as React from "react";
import { subDays, format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "./Icon";
import { DateSelectionList } from "./date-selection-list";
import { useContributionGraphContext } from "@/context/cg-context";

type DateSelection = Date | DateRange | undefined;

const DATE_FORMAT = "LLL dd, y";
const INITIAL_DATE = {
   from: subDays(new Date(), 7),
   to: new Date(),
};

export function DatePicker({
   className,
}: React.HTMLAttributes<HTMLDivElement>) {
   const { setTotalDays, dateSelections, setDateSelections } =
      useContributionGraphContext();
   const [date, setDate] = React.useState<DateSelection>(INITIAL_DATE);
   const [open, setOpen] = React.useState(false);

   const formatDate = (date: Date | undefined) =>
      date ? format(date, DATE_FORMAT) : "";

   const formatDateDisplay = React.useCallback(
      (selection: DateSelection): string => {
         if (!selection) return "";
         if (selection instanceof Date) return formatDate(selection);
         return selection.from && selection.to
            ? `${formatDate(selection.from)} - ${formatDate(selection.to)}`
            : formatDate(selection.from);
      },
      []
   );

   const calculateTotalDays = React.useCallback(
      (dateSelections: DateSelection[]): number => {
         return dateSelections.reduce((total, selection) => {
            if (!selection) return total;
            if (selection instanceof Date) return total + 1;
            if ("from" in selection && selection.from) {
               if (!selection.to) return total + 1;
               return format(selection.from, "yyyy-MM-dd") ===
                  format(selection.to, "yyyy-MM-dd")
                  ? total + 1
                  : total +
                       Math.abs(
                          differenceInDays(selection.to, selection.from)
                       ) +
                       1;
            }
            return total;
         }, 0);
      },
      []
   );

   const handleAddToStack = React.useCallback(() => {
      if (!date) return;
      const dateRange = date instanceof Date ? { from: date, to: date } : date;
      setDateSelections([...dateSelections, dateRange]);
      setDate(undefined);
   }, [date, dateSelections, setDateSelections]);

   const handleClear = React.useCallback(() => {
      setDate(undefined);
      setDateSelections([]);
   }, [setDateSelections]);

   const handleRemoveSelection = React.useCallback(
      (index: number) => {
         setDateSelections(dateSelections.filter((_, i) => i !== index));
      },
      [dateSelections, setDateSelections]
   );

   const totalDays = React.useMemo(
      () => calculateTotalDays(dateSelections),
      [dateSelections, calculateTotalDays]
   );

   React.useEffect(() => {
      setTotalDays(totalDays);
   }, [totalDays, setTotalDays]);

   const triggerDisplayText = React.useMemo(() => {
      if (dateSelections.length === 0) {
         return date ? formatDateDisplay(date) : <span>Pick a Date</span>;
      }
      const firstSelection = formatDateDisplay(dateSelections[0]);
      return dateSelections.length > 1 ? (
         <span>{firstSelection} ...</span>
      ) : (
         <span>{firstSelection}</span>
      );
   }, [date, dateSelections, formatDateDisplay]);

   const calendarComponent = React.useMemo(
      () => (
         <Calendar
            initialFocus
            mode="range"
            defaultMonth={date instanceof Date ? date : date?.from}
            selected={
               date instanceof Date
                  ? { from: date, to: date }
                  : (date as DateRange)
            }
            onSelect={setDate}
            numberOfMonths={2}
         />
      ),
      [date]
   );

   return (
      <div className={cn("grid gap-2 w-fit", className)}>
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
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  id="date"
                  variant="outline"
                  className={cn(
                     "justify-start text-left p-2 font-normal bg-card border-primary/30",
                     !date && !dateSelections.length && "text-muted-foreground"
                  )}
               >
                  <Icon styles="two-tone" name="calendar-02-twotone-rounded" />
                  {triggerDisplayText}
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className="w-auto p-3 z-[51] relative rounded-xl shadow-sm"
               align="center"
            >
               {calendarComponent}
               <div className="flex gap-4 pt-2">
                  <div className="flex-1 min-w-[260px]">
                     <DateSelectionList
                        dateSelections={dateSelections}
                        onRemove={handleRemoveSelection}
                     />
                  </div>
                  <div className="flex flex-col gap-2 min-w-[200px]">
                     <div className="text-center p-2 rounded-md text-sm font-medium bg-muted border">
                        Total Days • {totalDays}
                     </div>
                     <div className="flex items-center justify-end gap-3">
                        <Button
                           variant="outline"
                           onClick={handleClear}
                           className="w-20 bg-transparent"
                        >
                           Clear
                        </Button>
                        <Button onClick={handleAddToStack}>Add to Stack</Button>
                     </div>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </div>
   );
}
