"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
   ChevronLeft,
   ChevronRight,
   Flame,
   GitCommit,
   Info,
} from "lucide-react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "./Icon";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface DayContribution {
   date: string;
   level: ContributionLevel;
   count: number;
   formattedDate?: string;
}

export default function ContributionGraph() {
   const [year, setYear] = useState(new Date().getFullYear());
   const [contributions, setContributions] = useState<DayContribution[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [stats, setStats] = useState({
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      bestDay: { date: "", count: 0 },
   });

   // Generate random contribution data for demonstration
   useEffect(() => {
      setIsLoading(true);

      // Generate data for the entire year
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const days: DayContribution[] = [];

      const currentDate = new Date(startDate);

      // Create patterns for more realistic data - pre-calculate
      const activeWeeks = new Set(
         Array.from({ length: 30 }, () => Math.floor(Math.random() * 52)),
      );

      let totalContributions = 0;
      let bestDay = { date: "", count: 0 };
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      // Pre-calculate dates and formats
      const dateFormatOptions: Intl.DateTimeFormatOptions = {
         weekday: "long",
         month: "long",
         day: "numeric",
         year: "numeric",
      };

      while (currentDate <= endDate) {
         const weekOfYear = Math.floor(
            (currentDate.getTime() - startDate.getTime()) /
               (7 * 24 * 60 * 60 * 1000),
         );
         const isWeekend =
            currentDate.getDay() === 0 || currentDate.getDay() === 6;
         const isActiveWeek = activeWeeks.has(weekOfYear);
         const dateString = currentDate.toISOString().split("T")[0];
         const formattedDate = currentDate.toLocaleDateString(
            "en-US",
            dateFormatOptions,
         );

         let level: ContributionLevel = 0;
         let count = 0;

         // Simplified random calculation
         if (isActiveWeek && !isWeekend) {
            const rand = Math.random();
            if (rand > 0.92) {
               level = 4;
               count = Math.floor(Math.random() * 10) + 10;
            } else if (rand > 0.8) {
               level = 3;
               count = Math.floor(Math.random() * 5) + 6;
            } else if (rand > 0.6) {
               level = 2;
               count = Math.floor(Math.random() * 3) + 3;
            } else if (rand > 0.3) {
               level = 1;
               count = Math.floor(Math.random() * 2) + 1;
            }
         } else if (Math.random() > 0.85) {
            level = 1;
            count = 1;
         }

         // Update stats
         totalContributions += count;
         if (count > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
         } else {
            tempStreak = 0;
         }

         if (count > bestDay.count) {
            bestDay = { date: dateString, count };
         }

         days.push({
            date: dateString,
            level,
            count,
            formattedDate, // Store pre-formatted date
         });

         currentDate.setDate(currentDate.getDate() + 1);
      }

      // Calculate current streak more efficiently
      const today = new Date().toISOString().split("T")[0];
      if (year === new Date().getFullYear()) {
         const todayIndex = days.findIndex((d) => d.date === today);
         if (todayIndex !== -1) {
            currentStreak = 0;
            for (let i = todayIndex; i >= 0 && days[i].count > 0; i--) {
               currentStreak++;
            }
         }
      } else {
         currentStreak = 0;
         for (let i = days.length - 1; i >= 0 && days[i].count > 0; i--) {
            currentStreak++;
         }
      }

      setContributions(days);
      setStats({
         totalContributions,
         currentStreak,
         longestStreak,
         bestDay,
      });
      setIsLoading(false);
   }, [year]);

   // Group contributions by week for display
   const weeks = [];
   let currentWeek: DayContribution[] = [];

   for (let i = 0; i < contributions.length; i++) {
      const date = new Date(contributions[i].date);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
         weeks.push(currentWeek);
         currentWeek = [];
      }

      currentWeek.push(contributions[i]);

      if (i === contributions.length - 1) {
         weeks.push(currentWeek);
      }
   }

   // Get month labels for the graph
   const getMonthLabels = () => {
      const months = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ];
      const labels = [];

      for (let i = 0; i < 12; i++) {
         const firstDayOfMonth = new Date(year, i, 1);
         const weekIndex = Math.floor(
            (firstDayOfMonth.getTime() - new Date(year, 0, 1).getTime()) /
               (7 * 24 * 60 * 60 * 1000),
         );

         labels.push({
            month: months[i],
            position: weekIndex,
         });
      }

      return labels;
   };

   const getLevelColor = (level: ContributionLevel) => {
      switch (level) {
         case 0:
            return "bg-muted hover:bg-muted-foreground dark:bg-muted dark:hover:bg-muted-foreground";
         case 1:
            return "bg-primary/40 hover:bg-primary-foreground-darker/40 dark:primary/40 dark:hover:bg-muted-foreground/40";
         case 2:
            return "bg-primary/60 hover:bg-primary-foreground-darker/60 dark:bg-primary/60 dark:hover:bg-muted-foreground/60";
         case 3:
            return "bg-primary/80 hover:bg-primary-foreground-darker/80 dark:bg-primary/80 dark:hover:bg-muted-foreground/80";
         case 4:
            return "bg-primary hover:bg-primary-foreground-darker dark:bg-primary dark:hover:bg-primary-foreground";
      }
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
         weekday: "long",
         month: "long",
         day: "numeric",
         year: "numeric",
      });
   };

   return (
      <div className="w-full max-w-4xl mx-auto">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
               <Icon
                  color="var(--primary)"
                  size={24}
                  styles="solid"
                  name="calendar-03-solid-rounded"
               />
               <h3 className="text-lg font-medium">Contribution Graph</h3>
               <Badge className="text-primary bg-primary/10 h-6 border border-primary/20">
                  Comming Soon
               </Badge>
            </div>
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setYear(year - 1)}
                  className="h-8"
               >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {year - 1}
               </Button>
               <span className="text-sm font-medium px-2 py-1 bg-primary/15 rounded-md">
                  {year}
               </span>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setYear(year + 1)}
                  className="h-8"
                  disabled={year >= new Date().getFullYear()}
               >
                  {year + 1}
                  <ChevronRight className="w-4 h-4 ml-1" />
               </Button>
            </div>
         </div>

         {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <Card className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-3">
                     <div className="bg-primary/15 p-2 rounded-full">
                        <GitCommit className="w-5 h-5 text-primary-foreground-darker" />
                     </div>
                     <div>
                        <p className="text-sm text-neutral-500">
                           Total Contributions
                        </p>
                        <p className="text-2xl font-bold">
                           {stats.totalContributions.toLocaleString()}
                        </p>
                     </div>
                  </CardContent>
               </Card>
               <Card className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-3">
                     <div className="bg-primary/15 p-2 rounded-full">
                        <Flame className="w-5 h-5 text-primary-foreground-darker" />
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <p className="text-sm text-neutral-500">
                              Current Streak
                           </p>
                           {stats.currentStreak > 5 && (
                              <Badge
                                 variant="outline"
                                 className="text-xs border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
                              >
                                 🔥 On Fire
                              </Badge>
                           )}
                        </div>
                        <div className="flex items-baseline gap-2">
                           <p className="text-2xl font-bold">
                              {stats.currentStreak}
                           </p>
                           <p className="text-sm text-neutral-500">days</p>
                           <span className="text-xs text-neutral-400">|</span>
                           <p className="text-sm text-neutral-500">
                              Longest: {stats.longestStreak} days
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         )}

         <div className="relative">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center h-40 gap-3">
                  <div className="w-8 h-8 border-4 border-neutral-200 border-t-primary-ftext-primary-foreground-darker rounded-full animate-spin"></div>
                  <p className="text-sm text-neutral-500">
                     Loading contribution data...
                  </p>
               </div>
            ) : (
               <Card className="overflow-hidden p-0">
                  <div className="flex justify-center items-center">
                     <CardContent id="hehe" className="p-5 w-fit h-fit">
                        <div className="relative">
                           {/* Month labels */}
                           <div className="flex mb-2">
                              {getMonthLabels().map((label, i) => (
                                 <div
                                    key={i}
                                    className="text-xs text-neutral-500 pl-12"
                                 >
                                    {label.month}
                                 </div>
                              ))}
                           </div>

                           <div className="flex">
                              {/* Day labels */}
                              <div className="flex flex-col h-[112px] mr-2 justify-between">
                                 <span className="text-xs text-neutral-500 h-4">
                                    Mon
                                 </span>
                                 <span className="text-xs text-neutral-500 h-4">
                                    Wed
                                 </span>
                                 <span className="text-xs text-neutral-500 h-4">
                                    Fri
                                 </span>
                              </div>

                              {/* Contribution squares */}
                              <div className="flex gap-1">
                                 {weeks.map((week, weekIndex) => (
                                    <div
                                       key={weekIndex}
                                       className="flex flex-col gap-1"
                                    >
                                       {Array.from({ length: 7 }).map(
                                          (_, dayIndex) => {
                                             const day = week.find(
                                                (d) =>
                                                   new Date(d.date).getDay() ===
                                                   dayIndex,
                                             );

                                             if (!day) {
                                                return (
                                                   <div
                                                      key={dayIndex}
                                                      className="w-[12px] h-[12px]"
                                                   ></div>
                                                );
                                             }

                                             return (
                                                <TooltipProvider key={dayIndex}>
                                                   <Tooltip delayDuration={0}>
                                                      <TooltipTrigger asChild>
                                                         <motion.div
                                                            initial={{
                                                               scale: 0.8,
                                                               opacity: 0,
                                                            }}
                                                            animate={{
                                                               scale: 1,
                                                               opacity: 1,
                                                            }}
                                                            transition={{
                                                               delay:
                                                                  weekIndex *
                                                                  0.01,
                                                            }}
                                                            className={cn(
                                                               "w-[12px] h-[12px] rounded-sm cursor-pointer transition-colors",
                                                               getLevelColor(
                                                                  day.level,
                                                               ),
                                                               day.date ===
                                                                  stats.bestDay
                                                                     .date &&
                                                                  "ring-1 ring-offset-1 ring-primary-foreground-darker",
                                                            )}
                                                         />
                                                      </TooltipTrigger>
                                                      <TooltipContent
                                                         side="top"
                                                         className="text-xs p-0 overflow-hidden"
                                                         sideOffset={5}
                                                      >
                                                         <div className="bg-neutral-900 text-white px-3 py-1.5">
                                                            <div className="font-medium">
                                                               {day.count === 0
                                                                  ? "No contributions"
                                                                  : `${
                                                                       day.count
                                                                    } contribution${
                                                                       day.count >
                                                                       1
                                                                          ? "s"
                                                                          : ""
                                                                    }`}
                                                            </div>
                                                            <div className="text-neutral-300">
                                                               {
                                                                  day.formattedDate
                                                               }
                                                            </div>
                                                         </div>
                                                         {day.date ===
                                                            stats.bestDay
                                                               .date && (
                                                            <div className="bg-primary text-white px-3 py-1 text-[10px] font-medium">
                                                               🏆 Most active
                                                               day of the year
                                                            </div>
                                                         )}
                                                      </TooltipContent>
                                                   </Tooltip>
                                                </TooltipProvider>
                                             );
                                          },
                                       )}
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Legend */}
                           <div className="flex items-center justify-end mt-8 gap-2">
                              <span className="text-xs text-neutral-500">
                                 Less
                              </span>
                              {[0, 1, 2, 3, 4].map((level) => (
                                 <div
                                    key={level}
                                    className={cn(
                                       "w-[12px] h-[12px] rounded-sm",
                                       getLevelColor(
                                          level as ContributionLevel,
                                       ),
                                    )}
                                 />
                              ))}
                              <span className="text-xs text-neutral-500">
                                 More
                              </span>
                              <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                       >
                                          <Info className="h-3 w-3" />
                                       </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                       <p className="text-xs">
                                          Contribution activity over time
                                       </p>
                                    </TooltipContent>
                                 </Tooltip>
                              </TooltipProvider>
                           </div>
                        </div>
                     </CardContent>
                  </div>
               </Card>
            )}
         </div>

         {!isLoading && stats.bestDay.count > 0 && (
            <div className="text-center p-5">
               <p className="text-sm text-neutral-500">
                  Your best day was{" "}
                  <span className="font-medium text-primary-foreground-darker">
                     {formatDate(stats.bestDay.date)}
                  </span>{" "}
                  with{" "}
                  <span className="font-medium text-primary-foreground-darker">
                     {stats.bestDay.count} contributions
                  </span>
               </p>
            </div>
         )}
      </div>
   );
}
