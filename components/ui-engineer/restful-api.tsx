"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { createPortal } from "react-dom";

const frameworks = [
   {
      value: "GET",
      label: "GET",
   },
   {
      value: "POST",
      label: "POST",
   },
   {
      value: "PUT",
      label: "PUT",
   },
   {
      value: "DELETE",
      label: "DELETE",
   },
];

export function RESTfulAPI() {
   const [open, setOpen] = React.useState(false);
   const [value, setValue] = React.useState("GET");

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
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between bg-transparent border-primary/30 text-primary-foreground-darker hover:text-primary-foreground-1"
               >
                  {value
                     ? frameworks.find((framework) => framework.value === value)
                          ?.label
                     : "Select menthod..."}
                  <ChevronsUpDown className="opacity-75" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
               <Command>
                  <CommandInput
                     placeholder="Search menthod..."
                     className="h-9"
                  />
                  <CommandList>
                     <CommandEmpty>No framework found.</CommandEmpty>
                     <CommandGroup>
                        {frameworks.map((framework) => (
                           <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                 setValue(
                                    currentValue === value ? "" : currentValue,
                                 );
                                 setOpen(false);
                              }}
                           >
                              {framework.label}
                              <Check
                                 className={cn(
                                    "ml-auto",
                                    value === framework.value
                                       ? "opacity-100"
                                       : "opacity-0",
                                 )}
                              />
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </>
   );
}
