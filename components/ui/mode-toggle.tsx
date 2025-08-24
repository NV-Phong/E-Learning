"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "../ui-engineer/Icon";

interface ModeToggleProps {
   buttonStyle?: string;
}

export function ModeToggle({ buttonStyle }: ModeToggleProps) {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={buttonStyle}>
               {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
               {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
               <Icon
                  styles="solid"
                  name="sun-02-solid-rounded"
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
               />
               <Icon
                  styles="solid"
                  name="moon-02-solid-rounded"
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
               />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuItem onClick={() => setTheme("light")}>
               Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("pastel-pink")}>
               Pastel Pink
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
