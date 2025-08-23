"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import Separator from "@/components/ui-engineer/separator";

export default function Resume() {
   const [currentTab, setCurrentTab] = useState("preview");
   const [selectedThemes, setSelectedThemes] = useState(new Set<string>());

   const handleCheckboxChange = (theme: string, checked: boolean) => {
      setSelectedThemes((prev) => {
         const newSet = new Set(prev);
         if (checked) {
            newSet.add(theme);
         } else {
            newSet.delete(theme);
         }
         return newSet;
      });
   };

   const handleDownload = () => {
      const themeToFileMap: { [key: string]: string } = {
         light: "Nguyen Van Phong • Minimalist • Light.pdf",
         dark: "Nguyen Van Phong • Minimalist • Dark.pdf",
      };

      selectedThemes.forEach((theme) => {
         const fileName = themeToFileMap[theme];
         if (fileName) {
            const link = document.createElement("a");
            link.href = `/resume/${fileName}`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }
      });
   };

   const handleClear = () => {
      setSelectedThemes(new Set());
   };

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger
                  value="preview"
                  className="text-primary-foreground-1"
               >
                  Preview
               </TabsTrigger>
               <TabsTrigger
                  value="download"
                  className="text-primary-foreground-1"
               >
                  Download
               </TabsTrigger>
            </TabsList>

            <div className="flex flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent
                  forceMount={true}
                  value="preview"
                  className="flex justify-center data-[state=inactive]:hidden"
               >
                  <Card className="rounded-xl bg-card p-0 text-sm/7 text-foreground shadow-none border-none">
                     <iframe
                        className="rounded-xl border border-primary/30"
                        width="1000"
                        height="562"
                        src="https://embed.figma.com/design/rkiZnUdOKwzcGShxZHzAWs/CV-%E2%80%A2-Resume?node-id=0-1&embed-host=share"
                        allowFullScreen
                     ></iframe>
                  </Card>
               </TabsContent>

               <TabsContent value="download" className="flex justify-center">
                  <Card className="w-xl rounded-xl bg-card border-none shadow-none">
                     <CardHeader>
                        <CardTitle className="text-xl text-primary-foreground-darker">
                           DOWNLOAD RESUME
                        </CardTitle>
                        <CardDescription className="text-primary-foreground-darker/60">
                           Choose your preferred style and theme
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <div className="space-y-2">
                              <Separator>Minimalist Style</Separator>
                              <div className="flex gap-5 justify-center">
                                 <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/10 dark:has-[[aria-checked=true]]:border-border dark:has-[[aria-checked=true]]:bg-primary/5">
                                    <Checkbox
                                       id="light-theme"
                                       checked={selectedThemes.has("light")}
                                       onCheckedChange={(checked) =>
                                          handleCheckboxChange(
                                             "light",
                                             !!checked,
                                          )
                                       }
                                       className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary/10 dark:data-[state=checked]:bg-primary/30"
                                    />
                                    <div className="grid gap-1.5 font-normal">
                                       <p className="text-sm leading-none font-medium text-primary-foreground-darker dark:text-primary-foreground-darker/70">
                                          Light Theme
                                       </p>
                                       <div className="flex gap-1">
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.9702_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0.9702 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.9219_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0.9219 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.4604_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0.4604 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                       </div>
                                    </div>
                                 </Label>
                                 <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/10 dark:has-[[aria-checked=true]]:border-border dark:has-[[aria-checked=true]]:bg-primary/5">
                                    <Checkbox
                                       id="dark-theme"
                                       checked={selectedThemes.has("dark")}
                                       onCheckedChange={(checked) =>
                                          handleCheckboxChange(
                                             "dark",
                                             !!checked,
                                          )
                                       }
                                       className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary/10 dark:data-[state=checked]:bg-primary/30"
                                    />
                                    <div className="grid gap-1.5 font-normal">
                                       <p className="text-sm leading-none font-medium text-primary-foreground-darker dark:text-primary-foreground-darker/70">
                                          Dark Theme
                                       </p>
                                       <div className="flex gap-1">
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.738_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0.738 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.9581_0_0)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>oklch(0.9581 0 0)</code>
                                             </TooltipContent>
                                          </Tooltip>
                                       </div>
                                    </div>
                                 </Label>
                                 <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/10 dark:has-[[aria-checked=true]]:border-border dark:has-[[aria-checked=true]]:bg-primary/5 opacity-50 cursor-not-allowed">
                                    <Checkbox
                                       id="pastel-theme"
                                       disabled={true}
                                       className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary/10 dark:data-[state=checked]:bg-primary/30"
                                    />
                                    <div className="grid gap-1.5 font-normal">
                                       <p className="text-sm leading-none font-medium text-primary-foreground-darker dark:text-primary-foreground-darker/70">
                                          Pastel Pink Theme
                                       </p>
                                       <div className="flex gap-1">
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.9747_0.0192_72.58)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>
                                                   oklch(0.9747 0.0192 72.58)
                                                </code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.79_0.1226_20.19)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>
                                                   oklch(0.79 0.1226 20.19)
                                                </code>
                                             </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                             <TooltipTrigger asChild>
                                                <Badge className="bg-[oklch(0.66_0.1226_20.19)] rounded-sm h-5 w-5 border-primary/20" />
                                             </TooltipTrigger>
                                             <TooltipContent>
                                                <code>
                                                   oklch(0.66 0.1226 20.19)
                                                </code>
                                             </TooltipContent>
                                          </Tooltip>
                                       </div>
                                    </div>
                                 </Label>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter className="align justify-between">
                        <Button
                           variant="outline"
                           className="w-2/5 bg-transparent text-primary-foreground-darker"
                           type="button"
                           onClick={handleClear}
                        >
                           Clear
                        </Button>
                        <Button
                           className="w-2/5"
                           onClick={handleDownload}
                           disabled={selectedThemes.size === 0}
                        >
                           {selectedThemes.size <= 1
                              ? "Download PDF"
                              : "Download PDFs"}
                        </Button>
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
