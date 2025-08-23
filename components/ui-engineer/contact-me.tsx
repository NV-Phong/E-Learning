"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AlertCircleIcon, Check, Copy } from "lucide-react";
import Icon from "./Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Separator from "./separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function ContactMe() {
   const [open, setOpen] = React.useState(false);
   const [currentTab, setCurrentTab] = useState("email-1");
   const [copied, setCopied] = useState(false);

   const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
   };

   useEffect(() => {
      setCopied(false);
   }, [currentTab]);

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
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button className="w-2/5" type="submit">
                  Contact Me
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl shadow-sm bg-card z-[51] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <DialogHeader className="gap-1">
                  <DialogTitle>LET&apos;S CONNECT</DialogTitle>
                  <DialogDescription>
                     I&apos;m just one hi away - don&apos;t be shy!
                  </DialogDescription>
               </DialogHeader>
               <div className="space-y-3">
                  <div className="space-y-1">
                     <Label htmlFor="description" className="pb-1">
                        Social Network
                     </Label>
                     <div className="text-center text-sm flex justify-between items-center">
                        <Button
                           variant={"outline"}
                           onClick={() =>
                              window.open(
                                 "https://www.facebook.com/nv.phong.03032003",
                                 "_blank",
                              )
                           }
                           className="bg-transparent w-5/11 border-primary/20 hover:text-primary-foreground-1 group"
                        >
                           <Icon
                              styles="solid"
                              name="facebook-02-solid-rounded"
                              className="group-hover:!bg-primary-foreground-1"
                           />
                           Facebook
                        </Button>
                        <Button
                           variant={"outline"}
                           onClick={() =>
                              window.open(
                                 "https://www.pinterest.com/nvphonggg",
                                 "_blank",
                              )
                           }
                           className="bg-transparent w-5/11 border-primary/20 hover:text-primary-foreground-1 group"
                        >
                           <Icon
                              styles="solid"
                              name="pinterest-solid-rounded"
                              className="group-hover:!bg-primary-foreground-1"
                           />
                           Pinterest
                        </Button>
                     </div>
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="description" className="pb-1">
                        Developer Profile
                     </Label>
                     <div className="text-center text-sm flex justify-between items-center">
                        <Button
                           variant={"outline"}
                           onClick={() =>
                              window.open(
                                 "https://github.com/NV-Phong",
                                 "_blank",
                              )
                           }
                           className="bg-transparent w-full border-primary/20 hover:text-primary-foreground-1 group"
                        >
                           <Icon
                              styles="solid"
                              name="github"
                              className="group-hover:!bg-primary-foreground-1"
                           />
                           GitHub
                        </Button>
                     </div>
                  </div>
                  <div className="space-y-1">
                     <Tabs
                        defaultValue={currentTab}
                        onValueChange={setCurrentTab}
                     >
                        <TabsList className="bg-primary/15 border dark:bg-primary/2 border-primary/20 dark:border-primary/10">
                           <TabsTrigger
                              value="email-1"
                              className="text-primary-foreground-darker"
                           >
                              Email • 1
                           </TabsTrigger>
                           <TabsTrigger
                              value="email-2"
                              className="text-primary-foreground-darker"
                           >
                              Email • 2
                           </TabsTrigger>
                        </TabsList>

                        <TabsContent value="email-1">
                           <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                              <span className="flex gap-2">
                                 <Icon
                                    styles="stroke"
                                    name="ai-mail-02-stroke-rounded"
                                    color="var(--primary-foreground-darker)"
                                    className="mt-[1px]"
                                 />
                                 nv.phong.pro@gmail.com
                              </span>
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() =>
                                          handleCopy("nv.phong.pro@gmail.com")
                                       }
                                       className="h-7 w-7 hover:text-primary-foreground-1"
                                    >
                                       {copied ? (
                                          <Check className="h-4 w-4 text-primary-foreground-1" />
                                       ) : (
                                          <Copy className="h-4 w-4" />
                                       )}
                                       <span className="sr-only">
                                          Copy email
                                       </span>
                                    </Button>
                                 </TooltipTrigger>
                                 <TooltipContent className="z-[52]">
                                    <p>{copied ? "Copied" : "Copy"}</p>
                                 </TooltipContent>
                              </Tooltip>
                           </div>
                        </TabsContent>
                        <TabsContent value="email-2">
                           <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                              <span className="flex gap-2">
                                 <Icon
                                    styles="stroke"
                                    name="ai-mail-02-stroke-rounded"
                                    color="var(--primary-foreground-darker)"
                                    className="mt-[1px]"
                                 />
                                 nv.phong.dev@gmail.com
                              </span>
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() =>
                                          handleCopy("nv.phong.dev@gmail.com")
                                       }
                                       className="h-7 w-7 hover:text-primary-foreground-1"
                                    >
                                       {copied ? (
                                          <Check className="h-4 w-4 text-primary-foreground-1" />
                                       ) : (
                                          <Copy className="h-4 w-4" />
                                       )}
                                       <span className="sr-only">
                                          Copy email
                                       </span>
                                    </Button>
                                 </TooltipTrigger>
                                 <TooltipContent className="z-[52]">
                                    <p>{copied ? "Copied" : "Copy"}</p>
                                 </TooltipContent>
                              </Tooltip>
                           </div>
                        </TabsContent>
                     </Tabs>
                  </div>
               </div>

               <Separator>Or ask me public question</Separator>
               <div className="grid w-full max-w-xl items-start gap-4">
                  <Alert className="text-primary-foreground-darker">
                     <AlertCircleIcon />
                     <AlertTitle>Public Question Coming Soon</AlertTitle>
                     <AlertDescription>
                        <p>
                           New updates are on the way. Your interest and support
                           mean a lot to me!
                        </p>
                     </AlertDescription>
                  </Alert>
               </div>

               <DialogFooter className="!justify-between">
                  <Button
                     type="button"
                     variant="outline"
                     className="w-2/5 bg-transparent dark:border-primary/10"
                     onClick={() => setOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" className="w-2/5" disabled>
                     Ask Now
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
