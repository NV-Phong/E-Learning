"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface LinkItem {
   href: string;
   label: string;
   className: string;
   children?: LinkItem[];
}

const NAVIGATION_LINKS: LinkItem[] = [
   { href: "/", label: "Home", className: "-rotate-20 -ml-10" },
   { href: "/", label: "Contact", className: "-rotate-10 -ml-5" },
   {
      href: "/ui-engineer",
      label: "UI Engineer",
      className: "rotate-0 -ml-3",
      children: [
         {
            href: "/ui-engineer/cpu-architecture",
            label: "Upgrade Banner",
            className: "-rotate-10 -ml-5",
         },
         {
            href: "/ui-engineer/hooks-test-zone",
            label: "Hooks Test Zone",
            className: "rotate-0 -ml-3",
         },
         {
            href: "/ui-engineer/tailwind-card",
            label: "Tailwind Card",
            className: "rotate-10 -ml-5",
         },
      ],
   },
   { href: "/resume", label: "Resume", className: "rotate-10 -ml-5" },
   { href: "/my-work", label: "My Work", className: "rotate-20 -ml-10" },
];

function MenuItem({
   item,
   clearCloseTimer,
   startCloseTimer,
   depth,
   closeMenu, // 👈 thêm prop mới
}: {
   item: LinkItem;
   clearCloseTimer: () => void;
   startCloseTimer: () => void;
   depth: number;
   closeMenu: () => void; // 👈 khai báo type
}) {
   const [isOpen, setIsOpen] = useState(false);
   const submenuTimer = useRef<NodeJS.Timeout | null>(null);

   const clearSubmenuTimer = () => {
      if (submenuTimer.current) {
         clearTimeout(submenuTimer.current);
         submenuTimer.current = null;
      }
   };

   const startSubmenuTimer = () => {
      clearSubmenuTimer();
      submenuTimer.current = setTimeout(() => setIsOpen(false), 300);
   };

   return (
      <div
         className="relative flex items-center"
         onMouseEnter={clearCloseTimer}
         onMouseLeave={startCloseTimer}
      >
         <Link
            href={item.href}
            className={`text-primary hover:text-primary-foreground-1 font-medium whitespace-nowrap transition-colors duration-200 block ${item.className}`}
            onClick={() => {
               closeMenu(); // 👈 khi click thì đóng menu
            }}
            onMouseEnter={() => {
               clearCloseTimer();
               clearSubmenuTimer();
               if (item.children) setIsOpen(true);
            }}
            onMouseLeave={() => {
               if (item.children) startSubmenuTimer();
            }}
         >
            {item.label}
         </Link>

         {item.children && (
            <AnimatePresence>
               {isOpen && (
                  <motion.div
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute left-full ml-10 flex items-center z-50 pointer-events-auto"
                     onMouseEnter={() => {
                        clearCloseTimer();
                        clearSubmenuTimer();
                     }}
                     onMouseLeave={() => {
                        startCloseTimer();
                        startSubmenuTimer();
                     }}
                  >
                     <div className="flex flex-col gap-11">
                        {item.children.map((child, childIndex) => (
                           <MenuItem
                              key={childIndex}
                              item={child}
                              clearCloseTimer={clearCloseTimer}
                              startCloseTimer={startCloseTimer}
                              depth={depth + 1}
                              closeMenu={closeMenu}
                           />
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         )}
      </div>
   );
}

export default function QuickAction() {
   const [isVisible, setIsVisible] = useState(false);
   const closeTimer = useRef<NodeJS.Timeout | null>(null);

   const clearCloseTimer = () => {
      if (closeTimer.current) {
         clearTimeout(closeTimer.current);
         closeTimer.current = null;
      }
   };

   const startCloseTimer = () => {
      clearCloseTimer();
      closeTimer.current = setTimeout(() => setIsVisible(false), 300);
   };

   const closeMenu = () => {
      clearCloseTimer();
      setIsVisible(false);
   };

   return (
      <div className="flex justify-center items-center">
         {isVisible &&
            createPortal(
               <div
                  className="fixed inset-0 backdrop-blur-[10px] z-[999]"
                  onClick={closeMenu}
               />,
               document.body,
            )}
         <div
            className="fixed left-8 top-1/2 -translate-y-1/2 flex items-center z-[1000]"
            onMouseEnter={() => {
               clearCloseTimer();
               setIsVisible(true);
            }}
            onMouseLeave={startCloseTimer}
         >
            <Button
               className="rounded-full w-10 h-10 p-0 flex-shrink-0"
               size="icon"
            >
               {isVisible ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {isVisible && (
               <AnimatePresence>
                  <motion.div
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     transition={{ duration: 0.2 }}
                     className="flex items-center ml-6"
                  >
                     <div className="flex flex-col gap-5">
                        {NAVIGATION_LINKS.map((link, index) => (
                           <MenuItem
                              key={index}
                              item={link}
                              clearCloseTimer={clearCloseTimer}
                              startCloseTimer={startCloseTimer}
                              depth={0}
                              closeMenu={closeMenu}
                           />
                        ))}
                     </div>
                  </motion.div>
               </AnimatePresence>
            )}
         </div>
      </div>
   );
}
