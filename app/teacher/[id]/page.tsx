"use client";

import { useState, use, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Star, Award, Loader2 } from "lucide-react";
import { useTeacher } from "@/hooks/teacher-hooks";

interface TeacherDetailPageProps {
   params: Promise<{
      id: string;
   }>;
}

interface Teacher {
   _id: string;
   userID: string;
   name: string;
   bio: string;
   experienceYears: number;
   certifications: string[];
   hourlyRate: number;
   isDeleted: boolean;
   rating: {
      average: number;
      count: number;
   };
   availability: Array<{
      start: string;
      end: string;
   }>;
   reviews: Array<{
      comment: string;
      rating: number;
      studentName: string;
      date: string;
   }>;
   createdAt: string;
   updatedAt: string;
}

export default function TeacherDetailPage({ params }: TeacherDetailPageProps) {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
   );
   const [teacher, setTeacher] = useState<Teacher | null>(null);
   const [error, setError] = useState<string | null>(null);
   const { getTeacher, loading } = useTeacher();
   const { id } = use(params);

   // Memoize the fetch function to fix the useEffect dependency warning
   const fetchTeacher = useCallback(async () => {
      try {
         console.log("[v0] Starting to fetch teacher data");
         setError(null);
         const teacherData = await getTeacher(id);
         console.log("[v0] Teacher data received:", teacherData);
         setTeacher(teacherData);
      } catch (err) {
         console.log("[v0] Error fetching teacher:", err);
         setError("Không thể tải thông tin giáo viên");
      }
   }, [id, getTeacher]);

   useEffect(() => {
      console.log("[v0] useEffect triggered with id:", id);
      if (id) {
         fetchTeacher();
      }
   }, [id, fetchTeacher]);

   if (loading) {
      return (
         <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 text-center mt-15">
               <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
               <p className="text-muted-foreground">
                  Đang tải thông tin giáo viên...
               </p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 text-center mt-15">
               <h1 className="text-2xl font-bold text-foreground mb-4">
                  {error}
               </h1>
               <Button asChild>
                  <Link href="/teacher">Quay lại danh sách</Link>
               </Button>
            </div>
         </div>
      );
   }

   if (!teacher) {
      return (
         <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 text-center mt-15">
               <h1 className="text-2xl font-bold text-foreground mb-4">
                  Không tìm thấy giáo viên
               </h1>
               <Button asChild>
                  <Link href="/teacher">Quay lại danh sách</Link>
               </Button>
            </div>
         </div>
      );
   }

   const formatAvailabilityTimes = (availability: Teacher["availability"]) => {
      return availability.map((slot) => {
         const start = new Date(slot.start);
         const end = new Date(slot.end);
         return `${start.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
         })} - ${end.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
         })}`;
      });
   };

   const availabilityTimes = formatAvailabilityTimes(teacher.availability);

   return (
      <div className="min-h-screen py-8">
         <div className="container mx-auto px-4 mt-15">
            <Button
               variant="ghost"
               asChild
               className="mb-6 text-foreground hover:text-primary"
            >
               <Link href="/teacher">← Quay lại danh sách</Link>
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2">
                  <Card className="bg-card border-border mb-6">
                     <CardContent className="p-6">
                        <div className="flex items-start space-x-6 mb-6">
                           <Avatar className="w-24 h-24">
                              <AvatarImage
                                 src={`/placeholder.jpg?key=solcb&height=96&width=96&text=${encodeURIComponent(
                                    teacher.name
                                 )}`}
                                 alt={teacher.name}
                                 className="object-cover"
                              />
                              <AvatarFallback>
                                 {teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex-1">
                              <h1 className="text-2xl font-bold text-foreground mb-2">
                                 {teacher.name}
                              </h1>
                              <p className="text-muted-foreground mb-3">
                                 {teacher.bio}
                              </p>
                              <div className="flex items-center space-x-4 mb-3">
                                 <div className="flex items-center space-x-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-foreground">
                                       {teacher.rating.average}
                                    </span>
                                    <span className="text-muted-foreground">
                                       ({teacher.rating.count} đánh giá)
                                    </span>
                                 </div>
                                 <div className="text-xl font-bold text-primary">
                                    {teacher.hourlyRate.toLocaleString("vi-VN")}
                                    đ/giờ
                                 </div>
                              </div>
                              <div className="mb-3">
                                 <Badge
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                 >
                                    {teacher.experienceYears} năm kinh nghiệm
                                 </Badge>
                              </div>
                           </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-6">
                           <div>
                              <h3 className="font-semibold text-foreground mb-2">
                                 Giới thiệu
                              </h3>
                              <p className="text-muted-foreground">
                                 {teacher.bio}
                              </p>
                           </div>

                           <div>
                              <h3 className="font-semibold text-foreground mb-2">
                                 Chứng chỉ
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 {teacher.certifications.map((cert) => (
                                    <Badge
                                       key={cert}
                                       variant="outline"
                                       className="border-border text-foreground"
                                    >
                                       <Award className="w-3 h-3 mr-1" />
                                       {cert}
                                    </Badge>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Reviews Section */}
                  <Card className="bg-card border-border">
                     <CardHeader>
                        <CardTitle className="text-foreground">
                           Đánh giá từ học viên
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {teacher.reviews.map((review, index) => (
                              <div
                                 key={index}
                                 className="border-b border-border pb-4 last:border-b-0"
                              >
                                 <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                       <Avatar className="w-8 h-8">
                                          <AvatarFallback>
                                             {review.studentName[0]}
                                          </AvatarFallback>
                                       </Avatar>
                                       <span className="font-medium text-foreground">
                                          {review.studentName}
                                       </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                       {[...Array(5)].map((_, i) => (
                                          <Star
                                             key={i}
                                             className={`w-4 h-4 ${
                                                i < review.rating
                                                   ? "fill-yellow-400 text-yellow-400"
                                                   : "text-gray-300"
                                             }`}
                                          />
                                       ))}
                                    </div>
                                 </div>
                                 <p className="text-muted-foreground">
                                    {review.comment}
                                 </p>
                                 <p className="text-sm text-muted-foreground mt-1">
                                    {new Date(review.date).toLocaleDateString(
                                       "vi-VN"
                                    )}
                                 </p>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <div>
                  <Card className="bg-card border-border sticky top-24">
                     <CardHeader>
                        <CardTitle className="text-foreground">
                           Đặt lịch học
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <div>
                              <Label className="text-foreground">
                                 Chọn ngày
                              </Label>
                              <Calendar
                                 mode="single"
                                 selected={selectedDate}
                                 onSelect={setSelectedDate}
                                 className="rounded-md border border-border"
                              />
                           </div>

                           <div>
                              <Label className="text-foreground">
                                 Khung giờ có sẵn
                              </Label>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                 {availabilityTimes.length > 0 ? (
                                    availabilityTimes.map((time, index) => (
                                       <Button
                                          key={index}
                                          variant="outline"
                                          size="sm"
                                          className="border-border text-foreground hover:bg-accent bg-transparent"
                                       >
                                          {time}
                                       </Button>
                                    ))
                                 ) : (
                                    <p className="text-muted-foreground col-span-2 text-center py-2">
                                       Hiện tại không có khung giờ nào
                                    </p>
                                 )}
                              </div>
                           </div>

                           <Button
                              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                              asChild
                           >
                              <Link href={`/booking?teacher=${teacher._id}`}>
                                 Đặt lịch học thử
                              </Link>
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}
