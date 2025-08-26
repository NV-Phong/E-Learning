"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Clock, DollarSign } from "lucide-react";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useAPI } from "@/hooks/use-api";
import { useEffect } from "react";

export default function HomePage() {
   const { data, loading, error } = useAPI("/");

   useEffect(() => {
      if (loading) {
         console.log("Waiting for the server to wake up...");
      }
      if (error) {
         console.error("Something went wrong while fetching data:", error);
      }
      if (data) {
         console.log("The server is awake!", data);
      }
   }, [data, loading, error]);

   return (
      <div className="min-h-screen">
         {/* Hero Section */}
         <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 mt-15">
            <div className="mb-9 max-w-7xl mx-auto w-full pt-20 md:pt-0 text-center">
               <h1 className="h-40 text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900 bg-opacity-50">
                  Wellcome !
                  <GradualSpacing
                     className="font-display text-center text-5xl font-bold -tracking-widest text-neutral-900 dark:text-neutral-200 md:text-7xl md:leading-[5rem]"
                     text="E-Learning"
                  />
                  <br />
               </h1>
               <p className="font-normal text-base text-neutral-700 max-w-5xl mx-auto dark:text-neutral-500">
                  Học tiếng Anh 1-1 với giáo viên phù hợp. Kết nối với giáo viên
                  bản ngữ chất lượng cao, lịch học linh hoạt, phương pháp cá
                  nhân hóa cho từng học viên. Tại E-Learning, chúng tôi cam kết
                  mang đến trải nghiệm học tập tiếng Anh tốt nhất cho bạn. Với
                  đội ngũ giáo viên bản ngữ giàu kinh nghiệm, lịch học linh hoạt
                  và phương pháp giảng dạy cá nhân hóa, chúng tôi giúp bạn nâng
                  cao kỹ năng tiếng Anh một cách hiệu quả và thú vị. Hãy bắt đầu
                  hành trình học tiếng Anh của bạn với E-Learning ngay hôm nay!
               </p>
            </div>
            {/* </section> */}

            {/* Benefits Section */}
            {/* <section className="py-20"> */}
            <div className="container mx-auto px-4 mt-30">
               <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                  Tại sao chọn E-Learning?
               </h2>
               <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                     <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Award className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-foreground">
                           Giáo viên chất lượng
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground text-center">
                           100% giáo viên bản ngữ có chứng chỉ quốc tế, kinh
                           nghiệm giảng dạy phong phú.
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                     <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Clock className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-foreground">
                           Lịch học linh hoạt
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground text-center">
                           Tự do chọn thời gian học phù hợp, có thể thay đổi
                           lịch dễ dàng.
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                     <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                           <DollarSign className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-foreground">
                           Giá hợp lý
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground text-center">
                           Chi phí minh bạch, nhiều gói học ưu đãi, phù hợp với
                           mọi ngân sách.
                        </p>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-accent/5">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold text-foreground mb-6">
                  Bắt đầu hành trình học tiếng Anh của bạn
               </h2>
               <p className="text-xl text-muted-foreground mb-8">
                  Đăng ký ngay để nhận buổi học thử miễn phí
               </p>
               <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
               >
                  <Link href="/booking">Đặt lịch học thử miễn phí</Link>
               </Button>
            </div>
         </section>
      </div>
   );
}
