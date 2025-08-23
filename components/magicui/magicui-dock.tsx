"use client";

import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import Icon from "../ui-engineer/Icon";
import { ModeToggle } from "../ui/mode-toggle";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
   navbar: [
      {
         href: "/",
         icon: () => <Icon styles="solid" name="home-03-solid-rounded" />,
         label: "Home",
      },
      {
         href: "/ui-engineer",
         icon: () => (
            <Icon styles="solid" name="software-license-solid-rounded" />
         ),
         label: "UI Engineer",
      },
   ],
   contact: {
      social: {
         GitHub: {
            name: "GitHub",
            url: "https://github.com/NV-Phong",
            icon: () => <Icon styles="solid" name="github-solid-rounded" />,
         },
         Facebook: {
            name: "Facebook",
            url: "https://www.facebook.com/nv.phong.03032003",
            icon: () => (
               <Icon styles="solid" name="facebook-02-solid-rounded" />
            ),
         },
         Pinterest: {
            name: "Pinterest",
            url: "https://www.pinterest.com/nvphonggg",
            icon: () => <Icon styles="solid" name="pinterest-solid-rounded" />,
         },
         Email: {
            name: "Copy Email",
            url: "0h9ng03@gmail.com",
            icon: () => (
               <Icon styles="solid" name="mail-at-sign-02-solid-rounded" />
            ),
         },
      },
   },
};

export function MagicUIDock() {
   return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
         <TooltipProvider>
            <Dock
               direction="bottom"
               iconDistance={0}
               className="bg-background/50"
            >
               {DATA.navbar.map((item) => (
                  <DockIcon key={item.label}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Link
                              href={item.href}
                              aria-label={item.label}
                              className={cn(
                                 buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                 }),
                                 "size-12 rounded-full",
                              )}
                           >
                              <item.icon />
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{item.label}</p>
                        </TooltipContent>
                     </Tooltip>
                  </DockIcon>
               ))}
               <DockIcon className="!w-0">
                  <Separator orientation="vertical" />
               </DockIcon>

               <DockIcon>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="size-12 flex items-center justify-center">
                           <Link href="/resume">
                              <Icon
                                 styles="solid"
                                 name="document-validation-solid-rounded"
                              />
                           </Link>
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Resume</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>

               <DockIcon>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="size-12 flex items-center justify-center">
                           <Link href="/experience">
                              <Icon
                                 styles="solid"
                                 name="perplexity-ai-solid-rounded"
                              />
                           </Link>
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Experience</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>

               {Object.entries(DATA.contact.social).map(([name, social]) => (
                  <DockIcon key={name}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Link
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.name}
                              className={cn(
                                 buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                 }),
                                 "size-12 rounded-full",
                              )}
                           >
                              <social.icon />
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{name}</p>
                        </TooltipContent>
                     </Tooltip>
                  </DockIcon>
               ))}
               <DockIcon className="!w-0">
                  <Separator orientation="vertical" />
               </DockIcon>
               <DockIcon>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="size-12 flex items-center justify-center">
                           <Link href="/themes/color-visualizer">
                              <Icon
                                 styles="solid"
                                 name="paint-board-solid-rounded"
                              />
                           </Link>
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Color Visualizer</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>
               <DockIcon>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div className="size-12 flex items-center justify-center">
                           <ModeToggle buttonStyle="!bg-transparent border-none shadow-none" />
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Theme</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>
            </Dock>
         </TooltipProvider>
      </div>
   );
}
