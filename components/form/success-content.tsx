"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { learningPackages } from "@/lib/data";

interface BookingData {
   id: string;
   type: string | null;
   teacherName: string | null;
   teacherId: string | null;
   date: string | null;
   time: string | null;
   packageName: string | null;
   packageId: string | null;
   status: string;
   createdAt: string;
   level?: string | null;
   course?: {
      id: string;
      name: string;
      price: number;
      sessions: number;
      originalPrice?: number | null;
      features: string[];
      popular: boolean;
   };
}

export default function SuccessContent() {
   const searchParams = useSearchParams();
   const type = searchParams.get("type");
   const teacherName = searchParams.get("teacher");
   const date = searchParams.get("date");
   const time = searchParams.get("time");
   const packageName = searchParams.get("packageName");
   const teacherId = searchParams.get("teacherId");
   const packageId = searchParams.get("packageId");
   const level = searchParams.get("level");

   const isTrialBooking = type === "trial";
   const isPayment = type === "payment";

   const hasSavedBooking = useRef(false);

   useEffect(() => {
      if ((isTrialBooking || isPayment) && !hasSavedBooking.current) {
         const selectedPackage = packageId
            ? learningPackages.find((pkg) => pkg.id === packageId)
            : null;

         if (isPayment && packageId && !selectedPackage) {
            console.error("[v3] Invalid packageId:", packageId);
            return;
         }

         let normalizedDate = null;
         if (date) {
            try {
               if (date.includes("/")) {
                  const [day, month, year] = date.split("/").map(Number);
                  normalizedDate = `${year}-${month
                     .toString()
                     .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
               } else {
                  normalizedDate = new Date(date).toISOString().split("T")[0];
               }
            } catch (error) {
               console.error("[v3] Error normalizing date:", error);
            }
         }

         const bookingData: BookingData = {
            id: Date.now().toString(),
            type,
            teacherName,
            teacherId,
            date: normalizedDate,
            time,
            packageName: packageName || selectedPackage?.name || null,
            packageId,
            status: isTrialBooking ? "trial" : "paid",
            createdAt: new Date().toISOString(),
            ...(selectedPackage && {
               course: {
                  id: selectedPackage.id,
                  name: selectedPackage.name,
                  price: selectedPackage.price,
                  sessions: selectedPackage.sessions,
                  originalPrice: selectedPackage.originalPrice || null,
                  features: selectedPackage.features,
                  popular: selectedPackage.popular || false,
               },
            }),
            ...(level && { level }),
         };

         const existingBookings: BookingData[] = JSON.parse(
            sessionStorage.getItem("userBookings") || "[]"
         );

         const isDuplicate = existingBookings.some(
            (booking: BookingData) =>
               booking.type === bookingData.type &&
               booking.teacherId === bookingData.teacherId &&
               booking.date === bookingData.date &&
               booking.time === bookingData.time &&
               booking.packageId === bookingData.packageId
         );

         if (!isDuplicate) {
            existingBookings.push(bookingData);
            sessionStorage.setItem(
               "userBookings",
               JSON.stringify(existingBookings)
            );
            console.log("[v3] Booking saved to sessionStorage:", bookingData);
            hasSavedBooking.current = true;
         }
      }
   }, [
      type,
      teacherName,
      teacherId,
      date,
      time,
      packageName,
      packageId,
      isTrialBooking,
      isPayment,
      level,
   ]);

   const latestBooking: BookingData | undefined = JSON.parse(
      sessionStorage.getItem("userBookings") || "[]"
   ).slice(-1)[0];

   if (isPayment && packageId && !latestBooking?.course) {
      return (
         <div className="min-h-screen py-8 flex justify-center items-center">
            <div className="container mx-auto px-4 max-w-2xl mt-15">
               <Card className="bg-card border-border text-center">
                  <CardContent className="p-8">
                     <h1 className="text-3xl font-bold text-red-500 mb-4">
                        Lỗi thanh toán
                     </h1>
                     <p className="text-muted-foreground mb-6">
                        Không tìm thấy thông tin gói học. Vui lòng thử lại.
                     </p>
                     <Button
                        asChild
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                     >
                        <Link href="/course">Quay lại chọn gói học</Link>
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      );
   }

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
                           {level && (
                              <p>
                                 Trình độ:{" "}
                                 <span className="font-semibold text-foreground">
                                    {level === "beginner"
                                       ? "Mới bắt đầu"
                                       : level === "elementary"
                                       ? "Cơ bản"
                                       : level === "intermediate"
                                       ? "Trung cấp"
                                       : level === "advanced"
                                       ? "Nâng cao"
                                       : level}
                                 </span>
                              </p>
                           )}
                        </>
                     )}

                     {isPayment && latestBooking?.course && (
                        <>
                           <p className="text-lg">
                              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
                           </p>
                           <p>
                              Gói học:{" "}
                              <span className="font-semibold text-foreground">
                                 {latestBooking.course.name}
                              </span>
                           </p>
                           <p>
                              Giá:{" "}
                              <span className="font-semibold text-foreground">
                                 {latestBooking.course.price.toLocaleString(
                                    "vi-VN"
                                 )}
                                 đ
                              </span>
                           </p>
                           <p>
                              Số buổi học:{" "}
                              <span className="font-semibold text-foreground">
                                 {latestBooking.course.sessions}
                              </span>
                           </p>
                           {latestBooking.course.originalPrice && (
                              <p>
                                 Giá gốc:{" "}
                                 <span className="font-semibold text-foreground line-through">
                                    {latestBooking.course.originalPrice.toLocaleString(
                                       "vi-VN"
                                    )}
                                    đ
                                 </span>
                              </p>
                           )}
                           {latestBooking.course.features?.length > 0 && (
                              <div>
                                 <p className="font-medium text-foreground">
                                    Tính năng:
                                 </p>
                                 <ul className="list-disc list-inside text-sm">
                                    {latestBooking.course.features.map(
                                       (feature: string, index: number) => (
                                          <li key={index}>{feature}</li>
                                       )
                                    )}
                                 </ul>
                              </div>
                           )}
                           {teacherName && (
                              <p>
                                 Giáo viên:{" "}
                                 <span className="font-semibold text-foreground">
                                    {teacherName}
                                 </span>
                              </p>
                           )}
                           {level && (
                              <p>
                                 Trình độ:{" "}
                                 <span className="font-semibold text-foreground">
                                    {level === "beginner"
                                       ? "Mới bắt đầu"
                                       : level === "elementary"
                                       ? "Cơ bản"
                                       : level === "intermediate"
                                       ? "Trung cấp"
                                       : level === "advanced"
                                       ? "Nâng cao"
                                       : level}
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
