"use client";

import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Timeline() {
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState("not-found");

   return (
      <div className="relative min-h-screen overflow-hidden">
         {/* Central Timeline */}
         <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full z-10"></div>

         {/* Timeline Items */}
         <div className="flex flex-col relative py-20">
            {/* Left Side - Card 1 */}
            <div className="w-1/2 px-12 relative">
               {/* Timeline Checkpoint 1 */}
               <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-30">
                  <Badge className="bg-primary-foreground-darker h-6.5 border-primary/20">
                     Aug • 2025
                  </Badge>
               </div>

               <div className="relative grid grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[auto_1px_auto_1px_auto] py-16 [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
                  <Tabs
                     defaultValue={currentTab}
                     onValueChange={setCurrentTab}
                     className="col-start-3 row-start-3 flex flex-col items-center z-1"
                  >
                     <div className="flex w-full max-w-md flex-col bg-primary/20 p-2 dark:bg-white/10">
                        <TabsContent
                           value="not-found"
                           className="flex justify-center"
                        >
                           <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none w-full">
                              <CardHeader className="p-0">
                                 <CardTitle className=" flex flex-col">
                                    <code className="text-primary-foreground-1 -mb-2">
                                       404
                                    </code>
                                    <p className="text-2xl">NOT FOUND</p>
                                 </CardTitle>
                                 <CardDescription className="text-foreground">
                                    You&apos;re lost but hey, at least you found
                                    this cute message 👉🏻👈🏻
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
                     </div>
                  </Tabs>
                  <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
                  <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
               </div>
            </div>

            {/* Right Side - Card 2 */}
            <div className="w-1/2 px-12 ml-auto relative">
               {/* Timeline Checkpoint 2 */}
               <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <Badge className="bg-primary-foreground-darker h-6.5 border-primary/20">
                     Aug • 2025
                  </Badge>
               </div>

               <div className="relative grid grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[auto_1px_auto_1px_auto] py-16 [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
                  <Tabs
                     defaultValue={currentTab}
                     onValueChange={setCurrentTab}
                     className="col-start-3 row-start-3 flex flex-col items-center z-1"
                  >
                     <div className="flex w-full max-w-md flex-col bg-primary/20 p-2 dark:bg-white/10">
                        <TabsContent
                           value="not-found"
                           className="flex justify-center"
                        >
                           <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none w-full border-2 border-primary">
                              <CardHeader className="p-0">
                                 <CardTitle className=" flex flex-col">
                                    <code className="text-primary-foreground-1 -mb-2">
                                       404
                                    </code>
                                    <p className="text-2xl">NOT FOUND</p>
                                 </CardTitle>
                                 <CardDescription className="text-foreground">
                                    You&apos;re lost but hey, at least you found
                                    this cute message 👉🏻👈🏻
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
                     </div>
                  </Tabs>
                  <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
                  <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
               </div>
            </div>

            {/* Left Side - Card 3 */}
            <div className="w-1/2 px-12 relative">
               {/* Timeline Checkpoint 3 */}
               <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-30">
                  <Badge className="bg-primary-foreground-darker h-6.5 border-primary/20">
                     Aug • 2025
                  </Badge>
               </div>

               <div className="relative grid grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[auto_1px_auto_1px_auto] py-16 [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
                  <Tabs
                     defaultValue={currentTab}
                     onValueChange={setCurrentTab}
                     className="col-start-3 row-start-3 flex flex-col items-center z-1"
                  >
                     <div className="flex w-full max-w-md flex-col bg-primary/20 p-2 dark:bg-white/10">
                        <TabsContent
                           value="not-found"
                           className="flex justify-center"
                        >
                           <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none w-full">
                              <CardHeader className="p-0">
                                 <CardTitle className=" flex flex-col">
                                    <code className="text-primary-foreground-1 -mb-2">
                                       404
                                    </code>
                                    <p className="text-2xl">NOT FOUND</p>
                                 </CardTitle>
                                 <CardDescription className="text-foreground">
                                    You&apos;re lost but hey, at least you found
                                    this cute message 👉🏻👈🏻
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
                     </div>
                  </Tabs>
                  <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
                  <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
               </div>
            </div>

            {/* Right Side - Card 4 */}
            <div className="w-1/2 px-12 ml-auto relative">
               {/* Timeline Checkpoint 4 */}
               <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <Badge className="bg-primary-foreground-darker h-6.5 border-primary/20">
                     Aug • 2025
                  </Badge>
               </div>

               <div className="relative grid grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[auto_1px_auto_1px_auto] py-16 [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
                  <Tabs
                     defaultValue={currentTab}
                     onValueChange={setCurrentTab}
                     className="col-start-3 row-start-3 flex flex-col items-center z-1"
                  >
                     <div className="flex w-full max-w-md flex-col bg-primary/20 p-2 dark:bg-white/10">
                        <TabsContent
                           value="not-found"
                           className="flex justify-center"
                        >
                           <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none w-full border-2 border-primary">
                              <CardHeader className="p-0">
                                 <CardTitle className=" flex flex-col">
                                    <code className="text-primary-foreground-1 -mb-2">
                                       404
                                    </code>
                                    <p className="text-2xl">NOT FOUND</p>
                                 </CardTitle>
                                 <CardDescription className="text-foreground">
                                    You&apos;re lost but hey, at least you found
                                    this cute message 👉🏻👈🏻
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
                     </div>
                  </Tabs>
                  <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
                  <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
                  <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
               </div>
            </div>
         </div>
      </div>
   );
}
