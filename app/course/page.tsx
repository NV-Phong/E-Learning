"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { learningPackages } from "@/lib/data";

export default function PackagesPage() {
   return (
      <div className="min-h-screen py-8">
         <div className="container mx-auto px-4 mt-20">
            <div className="text-center mb-12">
               <h1 className="text-3xl font-bold text-foreground mb-4">
                  Gói học tiếng Anh
               </h1>
               <p className="text-xl text-muted-foreground">
                  Chọn gói học phù hợp với nhu cầu của bạn
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {learningPackages.map((pkg) => (
                  <Card
                     key={pkg.id}
                     className={`bg-card border-border relative flex flex-col h-full ${
                        pkg.popular ? "ring-2 ring-primary" : ""
                     }`}
                  >
                     {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                           <Badge className="bg-primary text-primary-foreground">
                              Phổ biến nhất
                           </Badge>
                        </div>
                     )}

                     <CardHeader className="text-center">
                        <CardTitle className="text-foreground">
                           {pkg.name}
                        </CardTitle>
                        <div className="space-y-2">
                           <div className="text-3xl font-bold text-primary">
                              {pkg.price.toLocaleString("vi-VN")}đ
                           </div>
                           {pkg.originalPrice && (
                              <div className="text-lg text-muted-foreground line-through">
                                 {pkg.originalPrice.toLocaleString("vi-VN")}đ
                              </div>
                           )}
                           <div className="text-sm text-muted-foreground">
                              {pkg.sessions} buổi học
                           </div>
                        </div>
                     </CardHeader>

                     <CardContent className="flex-1 flex flex-col">
                        <ul className="space-y-3 flex-1">
                           {pkg.features.map(
                              (feature: string, index: number) => (
                                 <li
                                    key={index}
                                    className="flex items-center space-x-2"
                                 >
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span className="text-muted-foreground">
                                       {feature}
                                    </span>
                                 </li>
                              )
                           )}
                        </ul>

                        <Button
                           className={`w-full mt-6 ${
                              pkg.popular
                                 ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                 : "bg-transparent text-foreground hover:bg-accent"
                           }`}
                           variant={pkg.popular ? "default" : "outline"}
                           asChild
                        >
                           <Link href={`/payment?package=${pkg.id}`}>
                              Mua gói học
                           </Link>
                        </Button>
                     </CardContent>
                  </Card>
               ))}
            </div>

            <div className="mt-16 text-center">
               <Card className="bg-card border-border max-w-2xl mx-auto">
                  <CardContent className="p-8">
                     <h3 className="text-xl font-semibold text-foreground mb-4">
                        Không chắc chắn gói nào phù hợp?
                     </h3>
                     <p className="text-muted-foreground mb-6">
                        Đặt lịch tư vấn miễn phí với chuyên viên của chúng tôi
                     </p>
                     <Button
                        variant="outline"
                        className="border-border text-foreground hover:bg-accent bg-transparent"
                        asChild
                     >
                        <Link href="/booking">Tư vấn miễn phí</Link>
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
