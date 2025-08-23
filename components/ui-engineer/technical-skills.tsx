"use client";
import { Badge } from "@/components/ui/badge";
import Icon from "./Icon";
import Separator from "./separator";

export function TechnicalSkills() {
   return (
      <div className="flex flex-col gap-2">
         <div className="space-y-2">
            <Separator textPosition="start">Framework & Library</Separator>
            <div className="flex items-center gap-2">
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="stroke"
                     className="!bg-[#7CD5F1]"
                     name="react-stroke-rounded"
                  />
                  React
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon size={15} styles="solid" name="nextjs" image={true} />
                  NextJS
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     className="!bg-[#E64F71]"
                     name="nestjs"
                  />
                  NestJS
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     className="!bg-[#72B0F6]"
                     name="flutter"
                  />
                  Flutter
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     className="!bg-[#7CD5F1]"
                     name="tailwindcss-solid-standard"
                  />
                  Taildwind
               </Badge>
            </div>
         </div>
         <div className="space-y-2">
            <Separator textPosition="start">Database & Tools</Separator>
            <div className="flex items-center gap-2">
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     className="!bg-[#4D9580]"
                     name="mongodb"
                  />
                  MongoDB
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon size={15} styles="solid" name="figma" image={true} />
                  Figma
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     className="!bg-[#72B0F6]"
                     name="docker"
                  />
                  Docker
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon size={15} styles="solid" name="jira" image={true} />
                  Jira
               </Badge>
               <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                  <Icon
                     size={15}
                     styles="solid"
                     name="postman-logo-icon-orange"
                     image={true}
                  />
                  Postman
               </Badge>
            </div>
         </div>
      </div>
   );
}
