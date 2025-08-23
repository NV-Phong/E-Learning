"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";
import { Input } from "@/components/ui/input";
import { useContributionGraphContext } from "@/context/cg-context";

export default function CommitsPerDay() {
   const { commitsPerDay, setCommitsPerDay } = useContributionGraphContext();

   const increment = () => {
      setCommitsPerDay(commitsPerDay === null ? 1 : commitsPerDay + 1);
   };

   const decrement = () => {
      setCommitsPerDay(
         commitsPerDay === null ? 0 : Math.max(0, commitsPerDay - 1)
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
            <Icon styles="stroke" name="arrow-left-01-stroke-standard" />
         </Button>
         <Input
            className="w-20 text-center bg-card border-primary/30"
            value={commitsPerDay === null ? "" : commitsPerDay}
            onChange={handleChange}
            type="number"
            min={0}
            placeholder="0"
         />
         <Button
            variant="outline"
            className="p-2 bg-card border-primary/30"
            onClick={increment}
            aria-label="Increase value"
         >
            <Icon styles="stroke" name="arrow-right-01-stroke-standard" />
         </Button>
      </div>
   );
}
