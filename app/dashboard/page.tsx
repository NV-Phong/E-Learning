"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Shield, CheckCircle } from "lucide-react";
import { useUser } from "@/hooks/user-hooks";
import { toast } from "sonner";

// Define interfaces for type safety
interface Booking {
   id: string;
   type: string;
   date: string;
   time: string;
   teacherName: string;
   status: string;
   packageName?: string;
   course?: {
      name: string;
      sessions: number;
      features: string[];
      originalPrice?: number;
      popular?: boolean;
   };
}

interface Package {
   id: string;
   name: string;
   teacherName: string;
   status: string;
   progress: number;
   totalSessions: number;
   usedSessions: number;
   features: string[];
   originalPrice?: number;
   popular?: boolean;
}

interface ProfileData {
   fullname: string;
   email: string;
   phone: string;
   level: string;
   avatar: string;
   id: string;
}

export default function DashboardPage() {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
   );
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const router = useRouter();

   const { getProfile, updateUser, loading } = useUser();

   const [profileData, setProfileData] = useState<ProfileData>({
      fullname: "",
      email: "",
      phone: "",
      level: "",
      avatar: "",
      id: "",
   });
   const [errors, setErrors] = useState<Record<string, string>>({});

   // Typed state for schedule and packages data
   const [scheduleData, setScheduleData] = useState<Booking[]>([]);
   const [packages, setPackages] = useState<Package[]>([]);

   // Normalize date function
   const normalizeDate = (dateStr: string): string => {
      if (!dateStr) return "";
      // Handle format "DD/MM/YYYY"
      if (dateStr.includes("/")) {
         const [day, month, year] = dateStr.split("/").map(Number);
         const formatted = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
         return isNaN(new Date(formatted).getTime()) ? "" : formatted;
      }
      // Handle format "YYYY-MM-DD"
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
         return isNaN(new Date(dateStr).getTime()) ? "" : dateStr;
      }
      return "";
   };

   // Memoize the loadProfile function
   const loadProfile = useCallback(async () => {
      try {
         const data = await getProfile();
         setProfileData({
            fullname: data.displayName || "",
            email: data.email || "",
            phone: data.phone || "",
            level: data.level || "beginner",
            avatar:
               data.avatar ||
               "https://i.pinimg.com/1200x/33/0d/65/330d65ae9227237d78b906446b08945c.jpg",
            id: data._id,
         });
      } catch (err) {
         console.error(err);
      }
   }, [getProfile]);

   // Check auth + load profile
   useEffect(() => {
      const token = document.cookie.includes("access_token=");
      if (!token) {
         router.push("/auth");
         return;
      }
      setIsAuthenticated(true);
      loadProfile();
   }, [router, loadProfile]);

   // Get today's date
   const today = new Date()
      .toLocaleDateString("en-CA", {
         timeZone: "Asia/Ho_Chi_Minh",
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

   useEffect(() => {
      const savedBookings = JSON.parse(
         sessionStorage.getItem("userBookings") || "[]"
      ) as Booking[];
      console.log("[v3] Loaded bookings from sessionStorage:", savedBookings);

      const schedules = savedBookings.filter(
         (booking: Booking) => booking.type === "trial" || booking.date
      );
      console.log("[v3] Filtered schedules:", schedules);

      const packageBookings = savedBookings.filter(
         (booking: Booking) =>
            booking.type === "payment" &&
            (booking.packageName || booking.course)
      );

      setScheduleData(schedules);
      setPackages(
         packageBookings.map(
            (booking: Booking): Package => ({
               id: booking.id,
               name: booking.course?.name || booking.packageName || "",
               teacherName: booking.teacherName,
               status: "active",
               progress: (0 / (booking.course?.sessions || 10)) * 100,
               totalSessions: booking.course?.sessions || 10,
               usedSessions: 0,
               features: booking.course?.features || [],
               originalPrice: booking.course?.originalPrice || undefined,
               popular: booking.course?.popular || false,
            })
         )
      );

      console.log(
         "[v3] Today bookings:",
         schedules.filter(
            (booking: Booking) => normalizeDate(booking.date) === today
         )
      );
   }, [today]);

   const validateProfile = () => {
      const newErrors: Record<string, string> = {};
      if (!profileData.fullname.trim()) {
         newErrors.fullname = "Họ và tên là bắt buộc";
      } else if (profileData.fullname.trim().length < 2) {
         newErrors.fullname = "Họ và tên phải có ít nhất 2 ký tự";
      }
      if (!profileData.email.trim()) {
         newErrors.email = "Email là bắt buộc";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
         newErrors.email = "Email không hợp lệ";
      }
      if (!profileData.phone.trim()) {
         newErrors.phone = "Số điện thoại là bắt buộc";
      } else if (!/^[0-9]{10,11}$/.test(profileData.phone.replace(/\s/g, ""))) {
         newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
      }
      if (!profileData.level) {
         newErrors.level = "Vui lòng chọn trình độ";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleProfileChange = (field: string, value: string) => {
      setProfileData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
         setErrors((prev) => ({ ...prev, [field]: "" }));
      }
   };

   const handleProfileUpdate = async () => {
      if (!validateProfile()) return;
      try {
         await updateUser(profileData.id, {
            displayName: profileData.fullname,
            email: profileData.email,
            phone: profileData.phone,
            level: profileData.level,
         });

         const updated = await getProfile();
         setProfileData({
            fullname: updated.displayName || "",
            email: updated.email || "",
            phone: updated.phone || "",
            level: updated.level || "beginner",
            avatar: updated.avatar || "https://www.gravatar.com/avatar",
            id: updated._id,
         });

         toast.success("Cập nhật thông tin thành công 🎉");
      } catch (err: unknown) {
         const error = err as { response?: { data?: { message?: string } } };
         toast.error(error.response?.data?.message || "Cập nhật thất bại");
      }
   };

   // Filter bookings for today's date
   console.log("[v3] Today:", today);
   const todayBookings = scheduleData.filter(
      (booking: Booking) => normalizeDate(booking.date) === today
   );

   if (!isAuthenticated) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
               <p className="text-muted-foreground">
                  Đang kiểm tra xác thực...
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen">
         <div className="container mx-auto px-4 py-8 mt-15">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-foreground">
                     Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                     Chào mừng bạn trở lại, {profileData.fullname}!
                  </p>
               </div>
               <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                     Đã xác thực
                  </span>
               </div>
            </div>

            <Tabs defaultValue="schedule" className="space-y-6">
               <TabsList className="bg-muted">
                  <TabsTrigger value="schedule">Lịch học</TabsTrigger>
                  <TabsTrigger value="packages">Gói học</TabsTrigger>
                  <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
               </TabsList>

               {/* --- Lịch học --- */}
               <TabsContent value="schedule">
                  <div className="grid lg:grid-cols-3 gap-6">
                     <div className="lg:col-span-2">
                        <Card className="bg-card border-border">
                           <CardHeader>
                              <CardTitle className="text-foreground">
                                 Lịch học sắp tới
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              {scheduleData.length > 0 ? (
                                 <div className="space-y-4">
                                    <Calendar
                                       mode="single"
                                       selected={selectedDate}
                                       onSelect={setSelectedDate}
                                       className="rounded-md border border-border"
                                    />
                                    <div className="mt-4 space-y-2">
                                       <h4 className="font-medium text-foreground">
                                          Lịch đã đặt:
                                       </h4>
                                       {scheduleData.map((booking: Booking) => (
                                          <div
                                             key={booking.id}
                                             className="p-3 bg-accent/10 rounded-lg"
                                          >
                                             <div className="flex justify-between items-start">
                                                <div>
                                                   <p className="font-medium text-foreground">
                                                      {booking.teacherName}
                                                   </p>
                                                   <p className="text-sm text-muted-foreground">
                                                      {booking.date} -{" "}
                                                      {booking.time}
                                                   </p>
                                                   <p className="text-xs text-muted-foreground">
                                                      {booking.type === "trial"
                                                         ? "Học thử miễn phí"
                                                         : "Buổi học chính thức"}
                                                   </p>
                                                </div>
                                                <Badge
                                                   variant={
                                                      booking.type === "trial"
                                                         ? "secondary"
                                                         : "default"
                                                   }
                                                >
                                                   {booking.status}
                                                </Badge>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              ) : (
                                 <div className="text-center py-6 text-muted-foreground">
                                    Bạn chưa có lịch học nào 📅
                                 </div>
                              )}
                           </CardContent>
                        </Card>
                     </div>

                     <div>
                        <Card className="bg-card border-border">
                           <CardHeader>
                              <CardTitle className="text-foreground">
                                 Buổi học hôm nay
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              {todayBookings.length > 0 ? (
                                 <div className="space-y-4">
                                    {todayBookings.map((booking: Booking) => (
                                       <div
                                          key={booking.id}
                                          className="p-4 bg-accent/10 rounded-lg"
                                       >
                                          <div className="flex items-center space-x-3 mb-2">
                                             <Avatar className="w-10 h-10">
                                                <AvatarImage
                                                   src="/teacher-portrait.png"
                                                   alt={booking.teacherName}
                                                />
                                                <AvatarFallback>
                                                   {booking.teacherName
                                                      ?.charAt(0)
                                                      .toUpperCase()}
                                                </AvatarFallback>
                                             </Avatar>
                                             <div>
                                                <p className="font-medium text-foreground">
                                                   {booking.teacherName}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                   {booking.type === "trial"
                                                      ? "Học thử miễn phí"
                                                      : "Buổi học chính thức"}
                                                </p>
                                             </div>
                                          </div>
                                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                             <Clock className="w-4 h-4" />
                                             <span>{booking.time}</span>
                                          </div>
                                          <Button
                                             size="sm"
                                             className="w-full mt-3 bg-primary text-primary-foreground hover:bg-primary/90"
                                          >
                                             <Play className="w-4 h-4 mr-2" />
                                             Tham gia lớp học
                                          </Button>
                                       </div>
                                    ))}
                                 </div>
                              ) : (
                                 <div className="text-center py-6 text-muted-foreground">
                                    Hôm nay bạn chưa có buổi học nào 🎓
                                 </div>
                              )}
                           </CardContent>
                        </Card>
                     </div>
                  </div>
               </TabsContent>

               {/* --- Gói học --- */}
               <TabsContent value="packages">
                  <Card className="bg-card border-border">
                     <CardHeader>
                        <CardTitle className="text-foreground">
                           Gói học của tôi
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        {packages.length > 0 ? (
                           <div className="space-y-4">
                              {packages.map((pkg: Package) => (
                                 <div
                                    key={pkg.id}
                                    className="p-4 border border-border rounded-lg"
                                 >
                                    <div className="flex justify-between items-start mb-3">
                                       <div>
                                          <h3 className="font-semibold text-foreground">
                                             {pkg.name}
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                             Giáo viên: {pkg.teacherName}
                                          </p>
                                       </div>
                                       <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-green-800"
                                       >
                                          {pkg.status === "active"
                                             ? "Đang hoạt động"
                                             : pkg.status}
                                       </Badge>
                                    </div>
                                    <div className="space-y-2">
                                       <div className="flex justify-between text-sm">
                                          <span className="text-muted-foreground">
                                             Đã sử dụng
                                          </span>
                                          <span className="text-foreground">
                                             {pkg.usedSessions}/
                                             {pkg.totalSessions} buổi
                                          </span>
                                       </div>
                                       <Progress
                                          value={pkg.progress}
                                          className="h-2"
                                       />
                                    </div>
                                    {pkg.features &&
                                       pkg.features.length > 0 && (
                                          <div className="mt-3">
                                             <p className="font-medium text-foreground text-sm mb-1">
                                                Thông tin gói:
                                             </p>
                                             <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                                {pkg.features.map(
                                                   (
                                                      feature: string,
                                                      index: number
                                                   ) => (
                                                      <li key={index}>
                                                         {feature}
                                                      </li>
                                                   )
                                                )}
                                             </ul>
                                          </div>
                                       )}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-6 text-muted-foreground">
                              Bạn chưa đăng ký gói học nào 📦
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* --- Hồ sơ cá nhân --- */}
               <TabsContent value="profile">
                  <Card className="bg-card border-border">
                     <CardHeader>
                        <CardTitle className="text-foreground flex items-center gap-2">
                           <Shield className="w-5 h-5" />
                           Thông tin cá nhân
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-6">
                           <div className="flex items-center space-x-4">
                              <Avatar className="w-20 h-20">
                                 <AvatarImage
                                    src={
                                       profileData.avatar || "/placeholder.svg"
                                    }
                                    className="object-cover"
                                 />
                                 <AvatarFallback>NV</AvatarFallback>
                              </Avatar>
                              <Button
                                 variant="outline"
                                 className="border-border text-foreground hover:bg-accent bg-transparent"
                              >
                                 Thay đổi ảnh
                              </Button>
                           </div>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                 <Label
                                    htmlFor="fullname"
                                    className="text-foreground"
                                 >
                                    Họ và tên{" "}
                                    <span className="text-red-500">*</span>
                                 </Label>
                                 <Input
                                    id="fullname"
                                    className={`${
                                       errors.fullname
                                          ? "border-red-500"
                                          : "border-border"
                                    }`}
                                    value={profileData.fullname}
                                    onChange={(e) =>
                                       handleProfileChange(
                                          "fullname",
                                          e.target.value
                                       )
                                    }
                                 />
                                 {errors.fullname && (
                                    <p className="text-red-500 text-sm mt-1">
                                       {errors.fullname}
                                    </p>
                                 )}
                              </div>
                              <div>
                                 <Label
                                    htmlFor="email"
                                    className="text-foreground"
                                 >
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                 </Label>
                                 <Input
                                    id="email"
                                    type="email"
                                    className={`${
                                       errors.email
                                          ? "border-red-500"
                                          : "border-border"
                                    }`}
                                    value={profileData.email}
                                    onChange={(e) =>
                                       handleProfileChange(
                                          "email",
                                          e.target.value
                                       )
                                    }
                                 />
                                 {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                       {errors.email}
                                    </p>
                                 )}
                              </div>
                           </div>

                           <div>
                              <Label
                                 htmlFor="phone"
                                 className="text-foreground"
                              >
                                 Số điện thoại{" "}
                                 <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                 id="phone"
                                 placeholder="Nhập số điện thoại (10-11 chữ số)"
                                 className={`${
                                    errors.phone
                                       ? "border-red-500"
                                       : "border-border"
                                 }`}
                                 value={profileData.phone}
                                 onChange={(e) =>
                                    handleProfileChange("phone", e.target.value)
                                 }
                              />
                              {errors.phone && (
                                 <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                 </p>
                              )}
                           </div>

                           <div>
                              <Label
                                 htmlFor="level"
                                 className="text-foreground"
                              >
                                 Trình độ hiện tại{" "}
                                 <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                 value={profileData.level}
                                 onValueChange={(value) =>
                                    handleProfileChange("level", value)
                                 }
                              >
                                 <SelectTrigger
                                    className={`${
                                       errors.level
                                          ? "border-red-500"
                                          : "border-border"
                                    }`}
                                 >
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="beginner">
                                       Mới bắt đầu
                                    </SelectItem>
                                    <SelectItem value="elementary">
                                       Cơ bản
                                    </SelectItem>
                                    <SelectItem value="intermediate">
                                       Trung cấp
                                    </SelectItem>
                                    <SelectItem value="advanced">
                                       Nâng cao
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              {errors.level && (
                                 <p className="text-red-500 text-sm mt-1">
                                    {errors.level}
                                 </p>
                              )}
                           </div>

                           <Button
                              disabled={loading}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={handleProfileUpdate}
                           >
                              {loading
                                 ? "Đang cập nhật..."
                                 : "Cập nhật thông tin"}
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}
