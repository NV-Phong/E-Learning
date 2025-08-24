"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
   const searchParams = useSearchParams();
   const type = searchParams.get("type");
   const teacherName = searchParams.get("teacher");
   const date = searchParams.get("date");
   const time = searchParams.get("time");
   const packageName = searchParams.get("package");

   const isTrialBooking = type === "trial";
   const isPayment = type === "payment";

   return (
      <div className="min-h-screen py-8 flex justify-center items-center">
         <div className="container mx-auto px-4 max-w-2xl mt-15">
            <Card className="bg-card border-border text-center">
               <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                     <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>

                  <h1 className="text-3xl font-bold text-foreground mb-4">
                     {isTrialBooking && "Đặt lịch học thử thành công!"}
                     {isPayment && "Thanh toán thành công!"}
                     {!isTrialBooking && !isPayment && "Thành công!"}
                  </h1>

                  <div className="text-muted-foreground mb-6 space-y-2">
                     {isTrialBooking && (
                        <>
                           <p className="text-lg">
                              Chúng tôi sẽ liên hệ với bạn sớm để xác nhận lịch
                              học.
                           </p>
                           {teacherName && (
                              <p>
                                 Giáo viên:{" "}
                                 <span className="font-semibold text-foreground">
                                    {teacherName}
                                 </span>
                              </p>
                           )}
                           {date && (
                              <p>
                                 Ngày học:{" "}
                                 <span className="font-semibold text-foreground">
                                    {date}
                                 </span>
                              </p>
                           )}
                           {time && (
                              <p>
                                 Giờ học:{" "}
                                 <span className="font-semibold text-foreground">
                                    {time}
                                 </span>
                              </p>
                           )}
                        </>
                     )}

                     {isPayment && (
                        <>
                           <p className="text-lg">
                              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
                           </p>
                           {packageName && (
                              <p>
                                 Gói học:{" "}
                                 <span className="font-semibold text-foreground">
                                    {packageName}
                                 </span>
                              </p>
                           )}
                           {teacherName && (
                              <p>
                                 Giáo viên:{" "}
                                 <span className="font-semibold text-foreground">
                                    {teacherName}
                                 </span>
                              </p>
                           )}
                           <p className="text-sm">
                              Thông tin chi tiết đã được gửi đến email của bạn.
                           </p>
                        </>
                     )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        asChild
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                     >
                        <Link href="/">Về trang chủ</Link>
                     </Button>

                     {isPayment && (
                        <Button
                           asChild
                           variant="outline"
                           className="border-border text-foreground bg-transparent"
                        >
                           <Link href="/dashboard">Xem dashboard</Link>
                        </Button>
                     )}

                     {isTrialBooking && (
                        <Button
                           asChild
                           variant="outline"
                           className="border-border text-foreground bg-transparent"
                        >
                           <Link href="/course">Xem gói học</Link>
                        </Button>
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
