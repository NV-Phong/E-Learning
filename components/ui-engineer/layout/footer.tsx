import { BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">E-Learning</span>
            </div>
            <p className="text-muted-foreground">Nền tảng học tiếng Anh 1-1 hàng đầu Việt Nam</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Tìm giáo viên
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Đặt lịch học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Gói học
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: support@elearning.vn</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: 123 Đường ABC, TP.HCM</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 E-Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
