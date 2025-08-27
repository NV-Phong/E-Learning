"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useTeacher } from "@/hooks/teacher-hooks";
import { learningPackages } from "@/lib/data";
import Link from "next/link";

// Define a proper Teacher interface
interface Teacher {
   _id: string;
   name: string;
   hourlyRate: number;
   // Add other teacher properties as needed
}

export default function PaymentContent() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const packageId = searchParams.get("package");
   const teacherId = searchParams.get("teacher");
   const bookingType = searchParams.get("type");
   const bookingDate = searchParams.get("date");
   const bookingTime = searchParams.get("time");
   const studentLevel = searchParams.get("level");
   const studentName = searchParams.get("name");
   const studentEmail = searchParams.get("email");
   const studentGoals = searchParams.get("goals");

   const [paymentMethod, setPaymentMethod] = useState("card");
   const { getTeacher, loading } = useTeacher();
   const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

   // Memoize the getTeacher function to fix the useEffect dependency warning
   const fetchTeacher = useCallback(async () => {
      if (teacherId) {
         try {
            const teacher = await getTeacher(teacherId);
            setSelectedTeacher(teacher);
         } catch (error) {
            console.error("[v0] Error fetching teacher:", error);
         }
      }
   }, [teacherId, getTeacher]);

   useEffect(() => {
      fetchTeacher();
   }, [fetchTeacher]);

   const [formData, setFormData] = useState({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      email: studentEmail || "",
   });

   const [errors, setErrors] = useState<Record<string, string>>({});

   const selectedPackage = packageId
      ? learningPackages.find((pkg) => pkg.id === packageId)
      : null;

   const totalAmount = selectedPackage
      ? selectedPackage.price
      : selectedTeacher?.hourlyRate || 0;

   const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.email.trim()) {
         newErrors.email = "Email là bắt buộc";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Email không hợp lệ";
      }

      if (paymentMethod === "card") {
         if (!formData.cardName.trim()) {
            newErrors.cardName = "Họ tên trên thẻ là bắt buộc";
         } else if (formData.cardName.trim().length < 2) {
            newErrors.cardName = "Họ tên phải có ít nhất 2 ký tự";
         }

         if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = "Số thẻ là bắt buộc";
         } else if (
            !/^[0-9\s]{16,19}$/.test(formData.cardNumber.replace(/\s/g, ""))
         ) {
            newErrors.cardNumber = "Số thẻ phải có 16 chữ số";
         }

         if (!formData.expiry.trim()) {
            newErrors.expiry = "Ngày hết hạn là bắt buộc";
         } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiry)) {
            newErrors.expiry = "Định dạng phải là MM/YY";
         } else {
            const [month, year] = formData.expiry.split("/");
            const expiryDate = new Date(
               2000 + Number.parseInt(year),
               Number.parseInt(month) - 1
            );
            const currentDate = new Date();
            if (expiryDate < currentDate) {
               newErrors.expiry = "Thẻ đã hết hạn";
            }
         }

         if (!formData.cvv.trim()) {
            newErrors.cvv = "CVV là bắt buộc";
         } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = "CVV phải có 3-4 chữ số";
         }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleInputChange = (field: string, value: string) => {
      let formattedValue = value;

      if (field === "cardNumber") {
         formattedValue = value
            .replace(/\s/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
      }

      if (field === "expiry") {
         formattedValue = value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2");
      }

      if (field === "cvv") {
         formattedValue = value.replace(/\D/g, "").slice(0, 4);
      }

      setFormData((prev) => ({ ...prev, [field]: formattedValue }));

      if (errors[field]) {
         setErrors((prev) => ({ ...prev, [field]: "" }));
      }
   };

   const handlePaymentSubmit = () => {
      if (!validateForm()) {
         return;
      }

      if (!selectedPackage && !selectedTeacher) {
         setErrors((prev) => ({
            ...prev,
            general: "Vui lòng chọn gói học hoặc giáo viên",
         }));
         return;
      }

      const params = new URLSearchParams({
         type: "payment",
         method: paymentMethod,
         ...(selectedPackage && {
            packageId: selectedPackage.id,
            packageName: selectedPackage.name,
         }),
         ...(selectedTeacher && {
            teacher: selectedTeacher.name,
            teacherId: selectedTeacher._id,
         }),
         ...(bookingDate && {
            date: new Date(bookingDate).toISOString().split("T")[0],
         }),
         ...(bookingTime && { time: bookingTime }),
         ...(studentLevel && { level: studentLevel }),
         ...(studentName && { name: studentName }),
         ...(studentEmail && { email: studentEmail }),
         ...(studentGoals && { goals: studentGoals }),
      });

      router.push(`/success?${params.toString()}`);
   };

   if (loading) {
      return (
         <div className="min-h-screen py-8 flex justify-center items-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
               <p>Đang tải thông tin thanh toán...</p>
            </div>
         </div>
      );
   }

   if (!selectedPackage && !selectedTeacher) {
      return (
         <div className="min-h-screen py-8 flex justify-center items-center">
            <div className="text-center">
               <p className="text-red-500 text-lg mb-4">
                  Vui lòng chọn gói học hoặc giáo viên để tiếp tục thanh toán.
               </p>
               <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
               >
                  <Link href="/course">Quay lại chọn gói học</Link>
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen py-8">
         <div className="container mx-auto px-4 max-w-2xl mt-15">
            <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
               {selectedPackage
                  ? "Thanh toán gói học"
                  : bookingType === "booking"
                  ? "Thanh toán buổi học"
                  : "Thanh toán"}
            </h1>

            {errors.general && (
               <p className="text-red-500 text-center mb-4">{errors.general}</p>
            )}

            <Card className="bg-card border-border mb-6">
               <CardHeader>
                  <CardTitle className="text-foreground">
                     Thông tin đơn hàng
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  {selectedPackage ? (
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-foreground font-semibold">
                              {selectedPackage.name}
                           </span>
                           <span className="font-semibold text-primary">
                              {selectedPackage.price.toLocaleString("vi-VN")}đ
                           </span>
                        </div>
                        {selectedPackage.originalPrice && (
                           <div className="text-sm text-muted-foreground">
                              Giá gốc:{" "}
                              <span className="line-through">
                                 {selectedPackage.originalPrice.toLocaleString(
                                    "vi-VN"
                                 )}
                                 đ
                              </span>
                           </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                           {selectedPackage.sessions} buổi học 1-1
                        </div>
                        {selectedPackage.features &&
                           selectedPackage.features.length > 0 && (
                              <div>
                                 <p className="text-sm font-medium text-foreground">
                                    Tính năng:
                                 </p>
                                 <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {selectedPackage.features.map(
                                       (feature, index) => (
                                          <li key={index}>{feature}</li>
                                       )
                                    )}
                                 </ul>
                              </div>
                           )}
                        {selectedPackage.popular && (
                           <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Gói phổ biến
                           </div>
                        )}
                        <Separator />
                        <div className="flex justify-between items-center font-bold">
                           <span className="text-foreground">Tổng cộng:</span>
                           <span className="text-primary text-xl">
                              {selectedPackage.price.toLocaleString("vi-VN")}đ
                           </span>
                        </div>
                     </div>
                  ) : (
                     <div className="space-y-4">
                        {selectedTeacher && (
                           <div>
                              <div className="flex items-center space-x-4 mb-4">
                                 <Avatar className="w-12 h-12">
                                    <AvatarImage
                                       src={`/placeholder.jpg?key=ide9m&height=96&width=96&text=${encodeURIComponent(
                                          selectedTeacher.name
                                       )}`}
                                       alt={selectedTeacher.name}
                                       className="object-cover"
                                    />
                                    <AvatarFallback>
                                       {selectedTeacher.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <h3 className="font-semibold text-foreground">
                                       {selectedTeacher.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                       {selectedTeacher.hourlyRate?.toLocaleString(
                                          "vi-VN"
                                       )}
                                       đ/giờ
                                    </p>
                                 </div>
                              </div>
                              {bookingType === "booking" && (
                                 <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                    <h4 className="font-semibold text-foreground mb-2">
                                       Chi tiết buổi học:
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                       {studentName && (
                                          <p>
                                             <span className="font-medium">
                                                Học viên:
                                             </span>{" "}
                                             {studentName}
                                          </p>
                                       )}
                                       {bookingDate && (
                                          <p>
                                             <span className="font-medium">
                                                Ngày học:
                                             </span>{" "}
                                             {bookingDate}
                                          </p>
                                       )}
                                       {bookingTime && (
                                          <p>
                                             <span className="font-medium">
                                                Giờ học:
                                             </span>{" "}
                                             {bookingTime}
                                          </p>
                                       )}
                                       {studentLevel && (
                                          <p>
                                             <span className="font-medium">
                                                Trình độ:
                                             </span>{" "}
                                             {studentLevel === "beginner"
                                                ? "Mới bắt đầu"
                                                : studentLevel === "elementary"
                                                ? "Cơ bản"
                                                : studentLevel ===
                                                  "intermediate"
                                                ? "Trung cấp"
                                                : studentLevel === "advanced"
                                                ? "Nâng cao"
                                                : studentLevel}
                                          </p>
                                       )}
                                    </div>
                                 </div>
                              )}
                           </div>
                        )}
                        <Separator />
                        <div className="flex justify-between items-center font-bold">
                           <span className="text-foreground">Tổng cộng:</span>
                           <span className="text-primary text-xl">
                              {totalAmount.toLocaleString("vi-VN")}đ
                           </span>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            <Card className="bg-card border-border">
               <CardHeader>
                  <CardTitle className="text-foreground">
                     Phương thức thanh toán
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Tabs
                     defaultValue="card"
                     onValueChange={(value) => setPaymentMethod(value)}
                     className="w-full"
                  >
                     <TabsList className="grid w-full grid-cols-2 bg-muted">
                        <TabsTrigger value="card">
                           <CreditCard className="w-4 h-4 mr-2" />
                           Thẻ tín dụng
                        </TabsTrigger>
                        <TabsTrigger value="qr">
                           <QrCode className="w-4 h-4 mr-2" />
                           QR Code
                        </TabsTrigger>
                     </TabsList>

                     <TabsContent value="card" className="space-y-6 mt-6">
                        <div>
                           <Label
                              htmlFor="cardName"
                              className="text-foreground"
                           >
                              Họ tên trên thẻ{" "}
                              <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="cardName"
                              placeholder="Nhập họ tên trên thẻ"
                              className={`${
                                 errors.cardName
                                    ? "border-red-500"
                                    : "border-border"
                              }`}
                              value={formData.cardName}
                              onChange={(e) =>
                                 handleInputChange("cardName", e.target.value)
                              }
                           />
                           {errors.cardName && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.cardName}
                              </p>
                           )}
                        </div>

                        <div>
                           <Label
                              htmlFor="cardNumber"
                              className="text-foreground"
                           >
                              Số thẻ <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="cardNumber"
                              placeholder="**** **** **** ****"
                              className={`${
                                 errors.cardNumber
                                    ? "border-red-500"
                                    : "border-border"
                              }`}
                              value={formData.cardNumber}
                              onChange={(e) =>
                                 handleInputChange("cardNumber", e.target.value)
                              }
                              maxLength={19}
                           />
                           {errors.cardNumber && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.cardNumber}
                              </p>
                           )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label
                                 htmlFor="expiry"
                                 className="text-foreground"
                              >
                                 Ngày hết hạn{" "}
                                 <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 id="expiry"
                                 placeholder="MM/YY"
                                 className={`${
                                    errors.expiry
                                       ? "border-red-500"
                                       : "border-border"
                                 }`}
                                 value={formData.expiry}
                                 onChange={(e) =>
                                    handleInputChange("expiry", e.target.value)
                                 }
                                 maxLength={5}
                              />
                              {errors.expiry && (
                                 <p className="text-red-500 text-sm mt-1">
                                    {errors.expiry}
                                 </p>
                              )}
                           </div>
                           <div>
                              <Label htmlFor="cvv" className="text-foreground">
                                 CVV <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 id="cvv"
                                 placeholder="***"
                                 className={`${
                                    errors.cvv
                                       ? "border-red-500"
                                       : "border-border"
                                 }`}
                                 value={formData.cvv}
                                 onChange={(e) =>
                                    handleInputChange("cvv", e.target.value)
                                 }
                                 maxLength={4}
                              />
                              {errors.cvv && (
                                 <p className="text-red-500 text-sm mt-1">
                                    {errors.cvv}
                                 </p>
                              )}
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="email" className="text-foreground">
                              Email nhận hóa đơn{" "}
                              <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="email"
                              type="email"
                              placeholder="email@example.com"
                              className={`${
                                 errors.email
                                    ? "border-red-500"
                                    : "border-border"
                              }`}
                              value={formData.email}
                              onChange={(e) =>
                                 handleInputChange("email", e.target.value)
                              }
                           />
                           {errors.email && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.email}
                              </p>
                           )}
                        </div>
                     </TabsContent>

                     <TabsContent value="qr" className="space-y-6 mt-6">
                        <div className="text-center space-y-4">
                           <div className="flex justify-center">
                              <div className="p-4 rounded-lg border-2 border-border">
                                 <Image
                                    src={`/graphics/qrcode.png?key=1vhtk&query=QR code for payment ${totalAmount.toLocaleString(
                                       "vi-VN"
                                    )}đ`}
                                    width={200}
                                    height={200}
                                    alt="QR Code thanh toán"
                                    className="w-48 h-48 dark:invert"
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <p className="text-foreground font-semibold">
                                 Quét mã QR để thanh toán{" "}
                                 {totalAmount.toLocaleString("vi-VN")}đ
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Sử dụng ứng dụng ngân hàng hoặc ví điện tử để
                                 quét mã QR
                              </p>
                              <p className="text-xs text-muted-foreground">
                                 Mã QR có hiệu lực trong 15 phút
                              </p>
                           </div>

                           <div className="bg-muted p-4 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2">
                                 Thông tin chuyển khoản:
                              </h4>
                              <div className="text-sm space-y-1 text-left">
                                 <p>
                                    <span className="font-medium">
                                       Ngân hàng:
                                    </span>{" "}
                                    MBBank
                                 </p>
                                 <p>
                                    <span className="font-medium">
                                       Số tài khoản:
                                    </span>{" "}
                                    03032003
                                 </p>
                                 <p>
                                    <span className="font-medium">
                                       Chủ tài khoản:
                                    </span>{" "}
                                    Nguyen Van Phong
                                 </p>
                                 <p>
                                    <span className="font-medium">
                                       Số tiền:
                                    </span>{" "}
                                    {totalAmount.toLocaleString("vi-VN")}đ
                                 </p>
                                 <p>
                                    <span className="font-medium">
                                       Nội dung:
                                    </span>{" "}
                                    THANHTOAN {packageId || teacherId}
                                 </p>
                              </div>
                           </div>

                           <div>
                              <Label
                                 htmlFor="qrEmail"
                                 className="text-foreground"
                              >
                                 Email nhận hóa đơn{" "}
                                 <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 id="qrEmail"
                                 type="email"
                                 placeholder="email@example.com"
                                 className={`${
                                    errors.email
                                       ? "border-red-500"
                                       : "border-border"
                                 }`}
                                 value={formData.email}
                                 onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                 }
                              />
                              {errors.email && (
                                 <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                 </p>
                              )}
                           </div>
                        </div>
                     </TabsContent>
                  </Tabs>

                  <Button
                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                     onClick={handlePaymentSubmit}
                  >
                     {paymentMethod === "card"
                        ? "Thanh toán ngay"
                        : "Xác nhận đã thanh toán"}
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
