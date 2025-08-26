"use client";
import Particles from "@/components/magicui/particles";
import Icon from "@/components/ui-engineer/Icon";
import Separator from "@/components/ui-engineer/separator";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLogin, useRegister } from "@/hooks/auth/auth-hooks";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Auth() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("login");

   // login input
   const [loginUsername, setLoginUsername] = useState("");
   const [loginPassword, setLoginPassword] = useState("");

   // register input
   const [regUsername, setRegUsername] = useState("");
   const [regPassword, setRegPassword] = useState("");
   const [regEmail, setRegEmail] = useState("");
   const [regDisplay, setRegDisplay] = useState("");

   const { handleLogin, loading: loginLoading } = useLogin();
   const {
      handleRegister,
      loading: regLoading,
   } = useRegister();

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   const onLogin = async () => {
      await handleLogin(loginUsername, loginPassword);
   };

   const onRegister = async () => {
      await handleRegister(regUsername, regPassword, regEmail, regDisplay);
      setCurrentTab("login");
   };

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
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="login" className="text-primary-foreground-1">
                  Login
               </TabsTrigger>
               <TabsTrigger
                  value="register"
                  className="text-primary-foreground-1"
               >
                  Register
               </TabsTrigger>
            </TabsList>

            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               {/* LOGIN */}
               <TabsContent value="login" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl">LOGIN</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Make changes to your account here. Click save when
                           you&apos;re done. 🧩
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="grid grid-cols-2 gap-5">
                           <Button
                              variant={"ghost"}
                              className="border shadow-sm"
                           >
                              <Icon styles="solid" name="github" />
                              Github
                           </Button>
                           <Button
                              variant={"ghost"}
                              className="border shadow-sm"
                           >
                              <Icon styles="solid" name="google-logo-bold" />
                              Google
                           </Button>
                        </div>
                        <Separator />
                        <div className="space-y-1">
                           <Label htmlFor="username">Email or Username</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={loginUsername}
                              onChange={(e) => setLoginUsername(e.target.value)}
                              placeholder="Enter Your UserName"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="password">Password</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Enter Your Password"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Link
                              href={"/"}
                              className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              Back To Home &rarr;
                           </Link>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={onLogin}
                              disabled={loginLoading}
                           >
                              {loginLoading ? "Loading..." : "Login Now"}
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>

               {/* REGISTER */}
               <TabsContent value="register" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-8 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 -mt-2.5">
                        <CardTitle className=" flex flex-col">
                           <p className="text-2xl">REGISTER</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Create Your Account to Unleash Your Dreams
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="w-85 p-0 flex flex-col justify-center space-y-3">
                        <div className="space-y-1">
                           <Label htmlFor="reg-username">Username</Label>
                           <Input
                              className=" text-sm border-primary/30 dark:border-input"
                              value={regUsername}
                              onChange={(e) => setRegUsername(e.target.value)}
                              placeholder="Enter Your UserName"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="reg-password">Password</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              type="password"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="Enter Your Password"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="reg-email">Email</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              type="email"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              placeholder="Enter Your Email"
                           />
                        </div>
                        <div className="space-y-1">
                           <Label htmlFor="reg-display">Display Name</Label>
                           <Input
                              className="text-sm border-primary/30 dark:border-input"
                              value={regDisplay}
                              onChange={(e) => setRegDisplay(e.target.value)}
                              placeholder="Enter Your Display Name"
                           />
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-3">
                           <Link
                              href={"/"}
                              className="text-gray-950 underline decoration-primary dark:decoration-primary-foreground-1 underline-offset-3 hover:decoration-2 dark:text-white"
                           >
                              Back To Home &rarr;
                           </Link>
                           <Button
                              className="w-2/5"
                              type="button"
                              onClick={onRegister}
                              disabled={regLoading}
                           >
                              {regLoading ? "Loading..." : "Register"}
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
         {/* giữ nguyên border patterns */}
         <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
         <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
      </div>
   );
}
