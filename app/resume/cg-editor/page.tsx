"use client";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { CommitChanges } from "@/components/ui-engineer/commit-changes";
import CommitsPerDay from "@/components/ui-engineer/commits-per-day";
import ContributionGraph from "@/components/ui-engineer/contribution-graph";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui-engineer/range-date-picker";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

export default function Home() {
   const [currentTab, setCurrentTab] = useState("overview");

   return (
      <div className="pt-20">
         <div className="z-10 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
               <div className="mb-9 max-w-7xl mx-auto w-full pt-20 md:pt-0 text-center">
                  <h1 className="h-40 text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900 bg-opacity-50">
                     Hi there! I&apos;m
                     <GradualSpacing
                        className="font-display text-center text-5xl font-bold -tracking-widest text-neutral-900 dark:text-neutral-200 md:text-7xl md:leading-[5rem]"
                        text="Nguyen Van Phong"
                     />
                     <br />
                  </h1>
                  <p className="font-normal text-base text-neutral-700 max-w-5xl mx-auto dark:text-neutral-500">
                     I&apos;m on a journey to become a software engineer who
                     builds thoughtful, scalable digital experiences. I&apos;m
                     drawn to both the elegance of user interfaces and the logic
                     behind backend systems and I find joy in connecting the
                     two. Beyond the stack, I&apos;m also exploring how AI and
                     automation can streamline development and enhance the way
                     we build and use software.
                  </p>
               </div>
               <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
                  <div className="flex justify-center">
                     <TabsList className="bg-primary/15 border border-primary/20">
                        <TabsTrigger value="overview" className="text-primary">
                           Overview
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="text-primary">
                           Calendar
                        </TabsTrigger>
                     </TabsList>
                  </div>

                  <TabsContent value="overview" className="flex justify-center">
                     <ContributionGraph />
                  </TabsContent>

                  <TabsContent value="calendar" className="flex justify-center">
                     <Card className="w-xl">
                        <CardHeader>
                           <CardTitle className="text-xl">CALENDAR</CardTitle>
                           <CardDescription>
                              Double-check to pick the correct commit dates, or
                              you&apos;ll need extra commits to fix the wrong
                              ones.
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2 flex justify-between">
                              <div className="space-y-2">
                                 <Label>Stack Dates</Label>
                                 <DatePicker />
                              </div>
                              <div className="space-y-2">
                                 <Label>Commits Per Day</Label>
                                 <CommitsPerDay />
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="align justify-between">
                           <Button
                              variant="outline"
                              className="w-2/5"
                              type="button"
                           >
                              Clear
                           </Button>
                           <CommitChanges />
                        </CardFooter>
                     </Card>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   );
}
