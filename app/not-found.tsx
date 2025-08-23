"use client";
import Particles from "@/components/magicui/particles";
import { CommitChanges } from "@/components/ui-engineer/commit-changes";
import CommitsPerDay from "@/components/ui-engineer/commits-per-day";
import { DatePicker } from "@/components/ui-engineer/range-date-picker";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { Label } from "@/components/ui/label";
import {
   Tabs,
   TabsContent,
   // , TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NotFound() {
   const router = useRouter();
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("not-found");

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         {showParticles && (
            <Particles
               className="absolute inset-0 z-0"
               quantity={100}
               ease={80}
               color={color}
               refresh
            />
         )}
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            {/* <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="not-found" className="text-primary">
                  Not Found
               </TabsTrigger>
               <TabsTrigger value="report" className="text-primary">
                  Report
               </TabsTrigger>
            </TabsList> */}

            <div className="flex max-w-lg flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="not-found" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <code className="text-primary-foreground-1 -mb-2">
                              404
                           </code>
                           <p className="text-2xl">NOT FOUND</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           You&apos;re lost but hey, at least you found this cute
                           message 👉🏻👈🏻
                           {/* You're not lost - the page is! 🧩 */}
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-2 p-0 flex justify-center">
                        <CpuArchitecture text="404" width="80%" />
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-5">
                           <Link
                              href={"/resume"}
                              className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              Report &rarr;
                           </Link>
                           <Button onClick={() => router.push("/")}>
                              Return Home
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>

               <TabsContent value="report" className="flex justify-center">
                  <Card className="w-xl border-none shadow-none">
                     <CardHeader>
                        <CardTitle className="text-xl text-foreground">
                           CALENDAR
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Double-check to pick the correct commit dates, or
                           you&apos;ll need extra commits to fix the wrong ones.
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
                           className="w-2/5 bg-card border-primary/30"
                           type="button"
                        >
                           Clear
                        </Button>
                        <CommitChanges />
                     </CardFooter>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
         <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
         <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
      </div>
   );
}
