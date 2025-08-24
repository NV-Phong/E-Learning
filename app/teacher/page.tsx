"use client";

import { useState } from "react";
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
import { Search, Star } from "lucide-react";
import { teachers } from "@/lib/data";

export default function TeachersPage() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedFilters, setSelectedFilters] = useState({
      specialty: "",
      priceRange: "",
      rating: "",
   });

   const handleSearch = (value: string) => {
      setSearchQuery(value);
      // Optional: Add minimum length validation for search
      if (value.length > 0 && value.length < 2) {
         // Could show a warning that search needs at least 2 characters
         console.log("Search query too short");
      }
   };

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
                           <SelectItem value="under-200k">Dưới 200k</SelectItem>
                           <SelectItem value="200k-300k">
                              200k - 300k
                           </SelectItem>
                           <SelectItem value="above-300k">Trên 300k</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </CardContent>
            </Card>

            {/* ... existing teachers grid ... */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {teachers.map((teacher) => (
                  <Card
                     key={teacher.id}
                     className="bg-card border-border hover:shadow-lg transition-shadow"
                  >
                     <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                           <Avatar className="w-16 h-16">
                              <AvatarImage
                                 src={teacher.avatar || "/placeholder.svg"}
                                 alt={teacher.name}
                              />
                              <AvatarFallback>
                                 {teacher.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <h3 className="font-semibold text-foreground">
                                 {teacher.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                 {teacher.experience}
                              </p>
                              <div className="flex items-center space-x-1 mt-1">
                                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                 <span className="text-sm font-medium text-foreground">
                                    {teacher.rating}
                                 </span>
                                 <span className="text-sm text-muted-foreground">
                                    ({teacher.reviewCount})
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div className="mb-4">
                           <div className="flex flex-wrap gap-1 mb-2">
                              {teacher.specialties.map((specialty: string) => (
                                 <Badge
                                    key={specialty}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                 >
                                    {specialty}
                                 </Badge>
                              ))}
                           </div>
                           <p className="text-lg font-semibold text-foreground">
                              {teacher.hourlyRate.toLocaleString("vi-VN")}đ/giờ
                           </p>
                        </div>

                        <div className="flex space-x-2">
                           <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-border text-foreground hover:bg-accent bg-transparent"
                              asChild
                           >
                              <Link href={`/teacher/${teacher.id}`}>
                                 Xem chi tiết
                              </Link>
                           </Button>
                           <Button
                              size="sm"
                              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                              asChild
                           >
                              <Link href={`/booking?teacher=${teacher.id}`}>
                                 Đặt lịch
                              </Link>
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
