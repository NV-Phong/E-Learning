"use client";
import { APIShowLogs } from "@/components/ui-engineer/api-show-logs";
import Icon from "@/components/ui-engineer/Icon";
import { RESTfulAPI } from "@/components/ui-engineer/restful-api";
import Separator from "@/components/ui-engineer/separator";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAPI } from "@/hooks/use-api";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

export default function APITestZone() {
   const [currentTab, setCurrentTab] = useState("api");
   const [enpointValue, setEnpointValue] = useState("/me");
   const [endpoint, setEndpoint] = useState("/me");
   const { data, loading, error } = useAPI<string>(endpoint);
   const [copied, setCopied] = useState(false);
   const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
   };

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="api" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className="flex flex-col -mb-2">
                           <code className="text-primary-foreground-1 -mb-1">
                              API
                           </code>
                           <p className="text-2xl">HOOKS TEST ZONE</p>
                        </CardTitle>
                        <CardDescription>
                           A simple playground to test and explore API-calling
                           hooks. 🧩
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-2 p-0 flex flex-col justify-center">
                        <Separator>Server Configuration</Separator>
                        <div className="flex items-center gap-7 p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                           <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                              <Icon
                                 size={15}
                                 styles="solid"
                                 className="!bg-primary-foreground-darker"
                                 name="ai-browser-solid-rounded"
                              />
                              ENV
                           </Badge>
                           {process.env.NODE_ENV}
                        </div>
                        <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                           <div className="flex items-center gap-2">
                              <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                 <Icon
                                    size={15}
                                    styles="solid"
                                    className="!bg-primary-foreground-darker"
                                    name="server"
                                 />
                                 SERVER
                              </Badge>
                              {process.env.NEXT_PUBLIC_API_SERVER}
                           </div>
                           <a
                              href={process.env.NEXT_PUBLIC_API_SERVER}
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              <Button variant={"ghost"} className="w-7.5 h-7.5">
                                 <Icon
                                    styles="bulk"
                                    size={16}
                                    className="!bg-primary-foreground-darker absolute"
                                    name="link-circle-bulk-rounded"
                                 />
                              </Button>
                           </a>
                        </div>
                        <Separator>HTTP Methods</Separator>
                        <div className="flex items-center gap-2 p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm text-primary-foreground-darker">
                           <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                              ENDPOINT
                           </Badge>
                           <Input
                              value={enpointValue}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    setEndpoint(enpointValue);
                                    setCopied(false);
                                 }
                              }}
                              onChange={(e) => setEnpointValue(e.target.value)}
                              className="border-primary/30"
                           />
                           <RESTfulAPI />
                        </div>
                        <div className="relative flex flex-col p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm text-primary-foreground-darker">
                           <Badge className="text-primary-foreground-darker bg-transparent h-6.5 border-none mb-2 self-center">
                              RESPONSE
                           </Badge>

                           <ScrollArea
                              className="h-30 overflow-auto"
                              scrollbarClassName="w-1.75"
                           >
                              {loading ? (
                                 <p>Waiting for the server to wake up...</p>
                              ) : error ? (
                                 <p>Error: {error.message}</p>
                              ) : (
                                 <div className="p-2">
                                    <pre className="whitespace-pre-wrap break-words">
                                       {JSON.stringify(data, null, 2)}
                                    </pre>
                                 </div>
                              )}
                           </ScrollArea>

                           <div className="absolute bottom-1 right-1">
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       onClick={() =>
                                          handleCopy(
                                             JSON.stringify(data, null, 2),
                                          )
                                       }
                                       className="hover:text-primary-foreground-1"
                                    >
                                       {copied ? (
                                          <Check className="h-4 w-4 text-primary-foreground-1" />
                                       ) : (
                                          <Copy className="h-4 w-4" />
                                       )}
                                       <span className="sr-only">Copy</span>
                                    </Button>
                                 </TooltipTrigger>
                                 <TooltipContent className="z-[52]">
                                    <p>{copied ? "Copied" : "Copy"}</p>
                                 </TooltipContent>
                              </Tooltip>
                           </div>
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-5">
                           <APIShowLogs />
                           <Button
                              onClick={() => {
                                 setEndpoint(enpointValue);
                                 setCopied(false);
                              }}
                              className="border w-2/5"
                           >
                              Send
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
   );
}
