"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTeacher } from "@/hooks/teacher-hooks"

export default function BookingForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const teacherId = searchParams.get("teacher")
  const [bookingType, setBookingType] = useState<"trial" | "regular">("trial")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")

  const { getTeacher, loading } = useTeacher()
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)

  useEffect(() => {
    const fetchTeacher = async () => {
      if (teacherId) {
        try {
          const teacher = await getTeacher(teacherId)
          setSelectedTeacher(teacher)
        } catch (error) {
          console.error("[v0] Error fetching teacher:", error)
        }
      }
    }
    fetchTeacher()
  }, [teacherId])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên là bắt buộc"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số"
    }

    if (!selectedDate) {
      newErrors.date = "Vui lòng chọn ngày học"
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDateOnly = new Date(selectedDate)
      selectedDateOnly.setHours(0, 0, 0, 0)

      if (selectedDateOnly < today) {
        newErrors.date = "Không thể chọn ngày trong quá khứ"
      }
    }

    if (!selectedTime) {
      newErrors.time = "Vui lòng chọn giờ học"
    }

    if (!selectedLevel) {
      newErrors.level = "Vui lòng chọn trình độ hiện tại"
    }

    if (formData.goals.length > 500) {
      newErrors.goals = "Mục tiêu học tập không được vượt quá 500 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleBookingSubmit = () => {
    if (!validateForm()) {
      return
    }

    if (bookingType === "regular") {
      const params = new URLSearchParams({
        type: "booking",
        ...(selectedTeacher && { teacher: selectedTeacher._id }),
        ...(selectedDate && { date: selectedDate.toISOString() }),
        ...(selectedTime && { time: selectedTime }),
        level: selectedLevel,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(formData.goals && { goals: formData.goals }),
      })

      router.push(`/payment?${params.toString()}`)
    } else {
      const params = new URLSearchParams({
        type: "trial",
        ...(selectedTeacher && { teacher: selectedTeacher.name }),
        ...(selectedDate && {
          date: selectedDate.toLocaleDateString("vi-VN"),
        }),
        ...(selectedTime && { time: selectedTime }),
      })

      router.push(`/success?${params.toString()}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Đang tải thông tin giáo viên...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl mt-15">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
            {bookingType === "trial" ? "Đặt lịch học thử" : "Đặt lịch học"}
          </h1>
          <div className="flex justify-center space-x-4">
            <Button
              variant={bookingType === "trial" ? "default" : "ghost"}
              onClick={() => setBookingType("trial")}
              className={bookingType === "trial" ? "bg-primary text-primary-foreground" : "border"}
            >
              Học thử miễn phí
            </Button>
            <Button
              variant={bookingType === "regular" ? "default" : "ghost"}
              onClick={() => setBookingType("regular")}
              className={bookingType === "regular" ? "bg-primary text-primary-foreground" : "border"}
            >
              Đặt lịch học
            </Button>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {selectedTeacher ? (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={`/placeholder.jpg?key=drm8w&height=96&width=96&text=${encodeURIComponent(selectedTeacher.name)}`}
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
                    <h3 className="font-semibold text-foreground">{selectedTeacher.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTeacher.hourlyRate?.toLocaleString("vi-VN")}
                      đ/giờ
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500 mb-6">Vui lòng chọn giáo viên để tiếp tục.</p>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ tên của bạn"
                    className={`border-border ${errors.name ? "border-red-500" : ""}`}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    className={`border-border ${errors.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại (10-11 chữ số)"
                  className={`border-border ${errors.phone ? "border-red-500" : ""}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label className="text-foreground">
                  Chọn ngày học <span className="text-red-500">*</span>
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date)
                    if (errors.date) {
                      setErrors((prev) => ({
                        ...prev,
                        date: "",
                      }))
                    }
                  }}
                  className={`rounded-md border mt-2 ${errors.date ? "border-red-500" : "border-border"}`}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const checkDate = new Date(date)
                    checkDate.setHours(0, 0, 0, 0)
                    return checkDate < today
                  }}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <Label className="text-foreground">
                  Chọn giờ học <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedTime(value)
                    if (errors.time) {
                      setErrors((prev) => ({
                        ...prev,
                        time: "",
                      }))
                    }
                  }}
                >
                  <SelectTrigger className={`${errors.time ? "border-red-500" : "border-border"}`}>
                    <SelectValue placeholder="Chọn khung giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>

              <div>
                <Label htmlFor="level" className="text-foreground">
                  Trình độ hiện tại <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedLevel(value)
                    if (errors.level) {
                      setErrors((prev) => ({
                        ...prev,
                        level: "",
                      }))
                    }
                  }}
                >
                  <SelectTrigger className={`${errors.level ? "border-red-500" : "border-border"}`}>
                    <SelectValue placeholder="Chọn trình độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                    <SelectItem value="elementary">Cơ bản</SelectItem>
                    <SelectItem value="intermediate">Trung cấp</SelectItem>
                    <SelectItem value="advanced">Nâng cao</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
              </div>

              <div>
                <Label htmlFor="goals" className="text-foreground">
                  Mục tiêu học tập
                  <span className="text-sm text-muted-foreground ml-2">({formData.goals.length}/500 ký tự)</span>
                </Label>
                <Textarea
                  id="goals"
                  placeholder="Chia sẻ mục tiêu và mong muốn của bạn..."
                  className={`${errors.goals ? "border-red-500" : "border-border"}`}
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  maxLength={500}
                />
                {errors.goals && <p className="text-red-500 text-sm mt-1">{errors.goals}</p>}
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleBookingSubmit}
              >
                {bookingType === "trial" ? "Xác nhận đặt lịch học thử" : "Tiếp tục thanh toán"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
