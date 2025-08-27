"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Search, Star, X } from "lucide-react";
import { useTeacher } from "@/hooks/teacher-hooks";

// Define Teacher interface
interface Teacher {
   _id?: string;
   id?: string;
   name: string;
   bio?: string;
   avatar?: string;
   experienceYears?: number;
   hourlyRate?: number;
   certifications?: string[];
   rating?: {
      average: number;
      count: number;
   };
}

// Define filter state interface
interface FilterState {
   specialty: string;
   priceRange: string;
   rating: string;
}

export default function TeachersPage() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
      specialty: "",
      priceRange: "",
      rating: "",
   });

   // Lấy cả 'loading' và 'error' từ hook
   const { getTeachers, loading, error } = useTeacher();
   const [teachers, setTeachers] = useState<Teacher[]>([]);

   const fetchTeachers = useCallback(async () => {
      const data = await getTeachers();
      setTeachers(data);
   }, [getTeachers]);

   useEffect(() => {
      fetchTeachers();
   }, [fetchTeachers]);

   const handleSearch = (value: string) => {
      setSearchQuery(value);
   };

   const filteredTeachers = useMemo(() => {
      return teachers.filter((teacher) => {
         const name = (teacher.name || "").toLowerCase();
         const bio = (teacher.bio || "").toLowerCase();
         const specialties: string[] = Array.isArray(teacher.certifications)
            ? teacher.certifications
            : [];

         // Search filter
         if (searchQuery.length >= 2) {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
               name.includes(q) ||
               bio.includes(q) ||
               specialties.some((s) => s.toLowerCase().includes(q));
            if (!matchesSearch) return false;
         }

         // Specialty filter
         if (selectedFilters.specialty && selectedFilters.specialty !== "all") {
            const hasSpec = specialties.some((s) => {
               const sl = s.toLowerCase();
               switch (selectedFilters.specialty) {
                  case "ielts":
                     return sl.includes("ielts");
                  case "toefl":
                     return sl.includes("toefl");
                  case "business":
                     return sl.includes("business");
                  case "conversation":
                     return sl.includes("conversation");
                  default:
                     return false;
               }
            });
            if (!hasSpec) return false;
         }

         // Price filter
         if (
            selectedFilters.priceRange &&
            selectedFilters.priceRange !== "all"
         ) {
            const price = Number(teacher.hourlyRate || 0);
            switch (selectedFilters.priceRange) {
               case "under-200k":
                  if (price >= 200000) return false;
                  break;
               case "200k-300k":
                  if (price < 200000 || price > 300000) return false;
                  break;
               case "above-300k":
                  if (price <= 300000) return false;
                  break;
            }
         }

         // Rating filter
         if (selectedFilters.rating && selectedFilters.rating !== "all") {
            const min = parseFloat(selectedFilters.rating);
            const rating = Number(teacher.rating?.average || 0);
            if (rating < min) return false;
         }

         return true;
      });
   }, [teachers, searchQuery, selectedFilters]);

   const clearFilters = () => {
      setSearchQuery("");
      setSelectedFilters({
         specialty: "",
         priceRange: "",
         rating: "",
      });
   };

   const hasActiveFilters =
      searchQuery.length >= 2 ||
      (selectedFilters.specialty && selectedFilters.specialty !== "all") ||
      (selectedFilters.priceRange && selectedFilters.priceRange !== "all") ||
      (selectedFilters.rating && selectedFilters.rating !== "all");

   return (
      <div className="min-h-screen py-8">
         <div className="container mx-auto px-4 mt-20">
            <h1 className="text-3xl font-bold text-foreground mb-8">
               Danh sách giáo viên
            </h1>

            {/* Search and Filters */}
            <Card className="bg-card border-border mb-8">
               <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                     <div className="flex-1">
                        <div className="relative">
                           <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                           <Input
                              placeholder="Tìm kiếm giáo viên... (tối thiểu 2 ký tự)"
                              className="pl-10 border-border"
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                              minLength={2}
                           />
                           {searchQuery.length > 0 &&
                              searchQuery.length < 2 && (
                                 <p className="text-amber-600 text-sm mt-1">
                                    Vui lòng nhập ít nhất 2 ký tự để tìm kiếm
                                 </p>
                              )}
                        </div>
                     </div>

                     <Select
                        value={selectedFilters.specialty}
                        onValueChange={(value) =>
                           setSelectedFilters({
                              ...selectedFilters,
                              specialty: value,
                           })
                        }
                     >
                        <SelectTrigger className="w-full md:w-48 border-border">
                           <SelectValue placeholder="Chuyên môn" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">
                              Tất cả chuyên môn
                           </SelectItem>
                           <SelectItem value="ielts">IELTS</SelectItem>
                           <SelectItem value="toefl">TOEFL</SelectItem>
                           <SelectItem value="business">
                              Business English
                           </SelectItem>
                           <SelectItem value="conversation">
                              Conversation
                           </SelectItem>
                        </SelectContent>
                     </Select>

                     <Select
                        value={selectedFilters.priceRange}
                        onValueChange={(value) =>
                           setSelectedFilters({
                              ...selectedFilters,
                              priceRange: value,
                           })
                        }
                     >
                        <SelectTrigger className="w-full md:w-48 border-border">
                           <SelectValue placeholder="Mức giá" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Tất cả mức giá</SelectItem>
                           <SelectItem value="under-200k">Dưới 200k</SelectItem>
                           <SelectItem value="200k-300k">
                              200k - 300k
                           </SelectItem>
                           <SelectItem value="above-300k">Trên 300k</SelectItem>
                        </SelectContent>
                     </Select>

                     <Select
                        value={selectedFilters.rating}
                        onValueChange={(value) =>
                           setSelectedFilters({
                              ...selectedFilters,
                              rating: value,
                           })
                        }
                     >
                        <SelectTrigger className="w-full md:w-48 border-border">
                           <SelectValue placeholder="Đánh giá" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Tất cả đánh giá</SelectItem>
                           <SelectItem value="4.5">4.5+ sao</SelectItem>
                           <SelectItem value="4.0">4.0+ sao</SelectItem>
                           <SelectItem value="3.5">3.5+ sao</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {hasActiveFilters && (
                     <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                           Hiển thị {filteredTeachers.length} trong tổng số{" "}
                           {teachers.length} giáo viên
                        </p>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={clearFilters}
                           className="text-muted-foreground hover:text-foreground"
                        >
                           <X className="w-4 h-4 mr-1" />
                           Xóa bộ lọc
                        </Button>
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* Loading / Error / Empty / List */}
            {loading ? (
               <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center text-muted-foreground">
                     Đang tải danh sách giáo viên...
                  </CardContent>
               </Card>
            ) : error ? (
               <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center text-red-500">
                     {error}
                  </CardContent>
               </Card>
            ) : filteredTeachers.length === 0 ? (
               <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                     <p className="text-muted-foreground mb-4">
                        Không tìm thấy giáo viên nào phù hợp với tiêu chí tìm
                        kiếm
                     </p>
                     <Button variant="outline" onClick={clearFilters}>
                        Xóa bộ lọc
                     </Button>
                  </CardContent>
               </Card>
            ) : (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeachers.map((teacher: Teacher) => {
                     const id = teacher._id || teacher.id;
                     const name = teacher.name || "Teacher";
                     const avatar = teacher.avatar || "";
                     const experience = `${
                        teacher.experienceYears || 0
                     } năm kinh nghiệm`;
                     const rating = Number(teacher.rating?.average || 0);
                     const reviewCount = Number(teacher.rating?.count || 0);
                     const specialties: string[] = Array.isArray(
                        teacher.certifications
                     )
                        ? teacher.certifications
                        : [];
                     const hourly = Number(teacher.hourlyRate || 0);

                     return (
                        <Card
                           key={id}
                           className="bg-card border-border hover:shadow-lg transition-shadow"
                        >
                           <CardContent className="p-6">
                              <div className="flex items-center space-x-4 mb-4">
                                 <Avatar className="w-16 h-16">
                                    <AvatarImage
                                       src={avatar}
                                       alt={name}
                                       className="object-cover"
                                    />
                                    <AvatarFallback>
                                       {name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <h3 className="font-semibold text-foreground">
                                       {name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                       {experience}
                                    </p>
                                    <div className="flex items-center space-x-1 mt-1">
                                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                       <span className="text-sm font-medium text-foreground">
                                          {rating.toFixed(1)}
                                       </span>
                                       <span className="text-sm text-muted-foreground">
                                          ({reviewCount})
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className="mb-4">
                                 <div className="flex flex-wrap gap-1 mb-2">
                                    {specialties.map((s) => (
                                       <Badge
                                          key={s}
                                          variant="secondary"
                                          className="bg-primary/10 text-primary"
                                       >
                                          {s}
                                       </Badge>
                                    ))}
                                 </div>
                                 <p className="text-lg font-semibold text-foreground">
                                    {hourly.toLocaleString("vi-VN")}đ/giờ
                                 </p>
                              </div>

                              <div className="flex space-x-2">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-border text-foreground hover:bg-accent bg-transparent"
                                    asChild
                                 >
                                    <Link href={`/teacher/${id}`}>
                                       Xem chi tiết
                                    </Link>
                                 </Button>
                                 <Button
                                    size="sm"
                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                    asChild
                                 >
                                    <Link href={`/booking?teacher=${id}`}>
                                       Đặt lịch
                                    </Link>
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
}