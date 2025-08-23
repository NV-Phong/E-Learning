import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import Icon from "./Icon";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

type DateSelection = Date | DateRange | undefined;

interface DateSelectionListProps {
   dateSelections: DateSelection[];
   onRemove?: (index: number) => void;
}

export function DateSelectionList({
   dateSelections,
   onRemove,
}: DateSelectionListProps) {
   const formatDate = (date: Date | undefined) => {
      return date ? format(date, "LLL dd, y") : "";
   };

   const formatDateDisplay = (selection: DateSelection) => {
      if (!selection) return "";
      if (selection instanceof Date) return formatDate(selection);
      return selection.from && selection.to
         ? `${formatDate(selection.from)} - ${formatDate(selection.to)}`
         : formatDate(selection.from);
   };

   return (
      <ScrollArea className="h-20 w-65 rounded-md border p-2">
         <div className="h-full flex flex-wrap gap-1 justify-center items-center">
            {dateSelections.length === 0 ? (
               <div className="w-full h-15 flex items-center justify-center text-sm text-muted-foreground">
                  No dates selected
               </div>
            ) : (
               dateSelections.map((selection, index) => (
                  <div
                     key={index}
                     className="bg-secondary text-sm py-1 px-2 rounded-md flex items-center gap-1"
                  >
                     <span>{formatDateDisplay(selection)}</span>
                     {onRemove && (
                        <Button
                           onClick={() => onRemove(index)}
                           variant={"ghost"}
                           className="text-muted-foreground hover:text-foreground p-0 h-0"
                        >
                           <Icon
                              styles="stroke"
                              size={15}
                              name="cancel-01-stroke-standard"
                           />
                        </Button>
                     )}
                  </div>
               ))
            )}
         </div>
      </ScrollArea>
   );
}
