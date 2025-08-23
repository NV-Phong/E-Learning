"use client";
import { useState } from "react";
import {
   Tabs,
   TabsContent,
   // TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CommitChanges } from "./commit-changes";
import CommitsPerDay from "./commits-per-day";
import PorfolioLogo from "./portfolio-logo";
import { ContactMe } from "./contact-me";
import DatePicker from "./date-picker";
import MyAge from "./my-age";
import { TechnicalSkills } from "./technical-skills";
import { Badge } from "../ui/badge";
import Icon from "./Icon";
import Separator from "./separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type IntroCardProps = {
   onGoToMyWork?: () => void;
};

export default function IntroCard({ onGoToMyWork }: IntroCardProps) {
   const [currentTab, setCurrentTab] = useState("introduce");
   const [isSkillsOpen, setIsSkillsOpen] = useState(false);
   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            {/* <TabsList className="bg-primary/15 border border-primary/20">
              <TabsTrigger value="introduce" className="text-primary">
                Introduce
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-primary">
                Contact
              </TabsTrigger>
            </TabsList> */}
            <div className="flex max-w-lg flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="introduce" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle>
                           <PorfolioLogo />
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           I build digital experiences that don&apos;t just work{" "}
                           <strong className="text-primary-foreground-darker">
                              <i>spark something new.</i>
                           </strong>
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="p-0 space-y-1">
                        <div className="flex justify-between">
                           <div className="space-y-2">
                              <Label>Birthday</Label>
                              <DatePicker />
                           </div>
                           <div className="space-y-2">
                              <Label>My Age</Label>
                              <MyAge />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <Collapsible
                              open={isSkillsOpen}
                              onOpenChange={setIsSkillsOpen}
                              className="w-full"
                           >
                              <div className="flex items-center justify-between">
                                 <Label>Technical Skills</Label>
                                 <CollapsibleTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="size-8"
                                    >
                                       {isSkillsOpen ? (
                                          <Icon
                                             styles="stroke"
                                             size={20}
                                             name="cancel-01-stroke-standard"
                                             className="!bg-primary-foreground-1/75"
                                          />
                                       ) : (
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Icon
                                                   styles="solid"
                                                   size={20}
                                                   name="ai-scan-solid-rounded"
                                                   className="!bg-primary-foreground-1/75"
                                                />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                More Skills
                                             </TooltipContent>
                                          </Tooltip>
                                       )}
                                    </Button>
                                 </CollapsibleTrigger>
                              </div>
                              <div className="space-y-2">
                                 <div className="space-y-2">
                                    <Separator
                                       textPosition={
                                          isSkillsOpen ? "start" : "center"
                                       }
                                    >
                                       Language
                                    </Separator>
                                    <div className="flex items-center gap-2">
                                       <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                          <Icon
                                             size={15}
                                             styles="solid"
                                             className="!bg-[#F9CC6C]"
                                             name="java-script-solid-rounded"
                                          />
                                          JavaScript
                                       </Badge>
                                       <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                          <Icon
                                             size={15}
                                             styles="solid"
                                             className="!bg-[#85DACC]"
                                             name="typescript-01-solid-rounded"
                                          />
                                          TypeScript
                                       </Badge>
                                       <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                          <Icon
                                             size={15}
                                             styles="solid"
                                             name="dart"
                                             image={true}
                                          />
                                          Dart
                                       </Badge>
                                       <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                          <Icon
                                             size={15}
                                             styles="solid"
                                             className="!bg-[#F38D70]"
                                             name="html-5-solid-sharp"
                                          />
                                          HTML
                                       </Badge>
                                       <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                          <Icon
                                             size={15}
                                             styles="solid"
                                             className="!bg-[#7CD5F1]"
                                             name="css-3-solid-rounded"
                                          />
                                          CSS
                                       </Badge>
                                    </div>
                                 </div>
                                 <CollapsibleContent className="flex flex-col gap-2">
                                    <TechnicalSkills />
                                 </CollapsibleContent>
                              </div>
                           </Collapsible>
                           <div className="space-y-1">
                              <Label>My Interests</Label>
                              <div className="flex items-center">
                                 <Icon
                                    size={10}
                                    name={"solid/star"}
                                    className="mt-1"
                                 />
                                 <p className="ml-1 text-foreground">
                                    Making buttons that people actually want to
                                    click
                                 </p>
                              </div>
                              <div className="flex items-center">
                                 <Icon
                                    size={10}
                                    name={"solid/star"}
                                    className="mt-1"
                                 />
                                 <p className="ml-1 text-foreground">
                                    Automating the boring stuff
                                 </p>
                              </div>
                              <div className="flex items-center">
                                 <Icon
                                    size={10}
                                    name={"solid/star"}
                                    className="mt-1"
                                 />
                                 <p className="ml-1 text-foreground">
                                    Writing code so clean you could eat off it
                                 </p>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter className="flex flex-col p-0">
                        <p>
                           I code because it&apos;s fun and nothing beats the
                           joy of seeing your idea come to life.
                        </p>
                        <div className="w-full font-semibold flex justify-between mt-5">
                           <Button
                              variant={"outline"}
                              onClick={onGoToMyWork}
                              className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent border-none text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              View my work &rarr;
                           </Button>
                           <ContactMe />
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>
               <TabsContent value="contact" className="flex justify-center">
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
