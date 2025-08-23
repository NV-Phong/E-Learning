"use client";
import * as React from "react";
import { DateRange } from "react-day-picker";

type DateSelection = Date | DateRange | undefined;

interface ContributionGraphContextType {
   totalDays: number;
   setTotalDays: (days: number) => void;
   commitsPerDay: number | null;
   setCommitsPerDay: (value: number | null) => void;
   dateSelections: DateSelection[];
   setDateSelections: (selections: DateSelection[]) => void;
}

const ContributionGraphContext = React.createContext<
   ContributionGraphContextType | undefined
>(undefined);

export function ContributionGraphProvider({ children }: { children: React.ReactNode }) {
   const [totalDays, setTotalDays] = React.useState(0);
   const [commitsPerDay, setCommitsPerDay] = React.useState<number | null>(null);
   const [dateSelections, setDateSelections] = React.useState<DateSelection[]>([]);

   return (
      <ContributionGraphContext.Provider
         value={{ 
            totalDays, 
            setTotalDays, 
            commitsPerDay, 
            setCommitsPerDay,
            dateSelections,
            setDateSelections
         }}
      >
         {children}
      </ContributionGraphContext.Provider>
   );
}

export function useContributionGraphContext() {
   const context = React.useContext(ContributionGraphContext);
   if (!context) {
      throw new Error(
         "useContributionGraphContext must be used within a DateProvider"
      );
   }
   return context;
}
