"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, User, LogOut } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const router = useRouter();

   useEffect(() => {
      // Check if user is authenticated by looking for access token
      const token = document.cookie.includes("access_token=");
      setIsAuthenticated(token);
   }, []);

   const handleLogout = () => {
      document.cookie =
         "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setIsAuthenticated(false);
      router.push("/");
   };

   return (
      <header className="bg-background/0 backdrop-blur-sm border-b border-border fixed top-0 left-0 right-0 z-50">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
               href="/"
               className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
               </div>
               <span className="text-xl font-bold text-foreground">
                  E-Learning
               </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
               <Button variant="ghost" asChild>
                  <Link
                     href="/teacher"
                     className="text-foreground hover:text-primary"
                  >
                     Tìm giáo viên
                  </Link>
               </Button>
               <Button variant="ghost" asChild>
                  <Link
                     href="/booking"
                     className="text-foreground hover:text-primary"
                  >
                     Đặt lịch học thử
                  </Link>
               </Button>
               <Button variant="ghost" asChild>
                  <Link
                     href="/course"
                     className="text-foreground hover:text-primary"
                  >
                     Gói học
                  </Link>
               </Button>

               {isAuthenticated ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="outline"
                           className="border-border text-foreground hover:bg-accent bg-transparent"
                        >
                           <User className="w-4 h-4 mr-2" />
                           Tài khoản
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                           <Link href="/dashboard">
                              <User className="w-4 h-4 mr-2" />
                              Dashboard
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           <LogOut className="w-4 h-4 mr-2" />
                           Đăng xuất
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <>
                     <ModeToggle />
                     <Button
                        variant="outline"
                        asChild
                        className="border-border text-foreground hover:bg-accent bg-transparent"
                     >
                        <Link href="/auth">Đăng nhập</Link>
                     </Button>
                     <Button
                        asChild
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                     >
                        <Link href="/auth">Đăng ký</Link>
                     </Button>
                  </>
               )}
            </nav>

            <Button variant="ghost" size="icon" className="md:hidden">
               <Menu className="w-5 h-5" />
            </Button>
         </div>
      </header>
   );
}
