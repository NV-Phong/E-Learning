"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";
import { Input } from "@/components/ui/input";
import { useContributionGraphContext } from "@/context/cg-context";

export default function MyAge() {
   const { commitsPerDay, setCommitsPerDay } = useContributionGraphContext();

   const increment = () => {
      setCommitsPerDay(commitsPerDay === null ? 23 : commitsPerDay + 1);
   };

   const decrement = () => {
      setCommitsPerDay(
         commitsPerDay === null ? 21 : Math.max(0, commitsPerDay - 1),
      );
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === "") {
         setCommitsPerDay(null);
      } else {
         const newValue = Number.parseInt(inputValue);
         if (!isNaN(newValue) && newValue >= 0) {
            setCommitsPerDay(newValue);
         }
      }
   };

   return (
      <div className="flex items-center space-x-2">
         <Button
            variant="outline"
            className="p-2 bg-card border-primary/30"
            onClick={decrement}
            aria-label="Decrease value"
         >
            <Icon
               styles="stroke"
               name="arrow-left-01-stroke-standard"
               className="!bg-primary-foreground-darker"
            />
         </Button>
         <Input
            className="w-20 text-center bg-card border-primary/30 font-semibold text-primary-foreground-darker"
            value={commitsPerDay === null ? "" : commitsPerDay}
            onChange={handleChange}
            type="number"
            min={0}
            placeholder="22"
         />
         <Button
            variant="outline"
            className="p-2 bg-card border-primary/30"
            onClick={increment}
            aria-label="Increase value"
         >
            <Icon
               styles="stroke"
               name="arrow-right-01-stroke-standard"
               className="!bg-primary-foreground-darker"
            />
         </Button>
      </div>
   );
}
