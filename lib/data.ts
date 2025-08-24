import type { Teacher, Review, LearningPackage } from "./types"

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/professional-teacher-portrait.png",
    specialties: ["IELTS", "Business English", "Conversation"],
    hourlyRate: 250000,
    rating: 4.9,
    reviewCount: 127,
    experience: "5 năm kinh nghiệm",
    description: "Giáo viên bản ngữ với chứng chỉ TESOL, chuyên về IELTS và tiếng Anh thương mại.",
    certificates: ["TESOL", "IELTS Certified", "Cambridge CELTA"],
    languages: ["English (Native)", "Vietnamese (Intermediate)"],
    availability: ["9:00 AM", "2:00 PM", "7:00 PM"],
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/male-teacher-portrait.png",
    specialties: ["TOEFL", "Academic English", "Pronunciation"],
    hourlyRate: 200000,
    rating: 4.8,
    reviewCount: 89,
    experience: "3 năm kinh nghiệm",
    description: "Chuyên gia về TOEFL và tiếng Anh học thuật, phương pháp giảng dạy hiệu quả.",
    certificates: ["TOEFL Certified", "TESOL"],
    languages: ["English (Native)", "Mandarin (Native)"],
    availability: ["10:00 AM", "3:00 PM", "8:00 PM"],
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "/female-teacher-portrait.png",
    specialties: ["Kids English", "Grammar", "Writing"],
    hourlyRate: 180000,
    rating: 4.7,
    reviewCount: 156,
    experience: "4 năm kinh nghiệm",
    description: "Chuyên dạy trẻ em và cải thiện kỹ năng viết, tạo môi trường học tập vui vẻ.",
    certificates: ["TEFL", "Child Psychology Certificate"],
    languages: ["English (Native)", "Spanish (Fluent)"],
    availability: ["11:00 AM", "4:00 PM", "6:00 PM"],
  },
]

export const reviews: Review[] = [
  {
    id: "1",
    studentName: "Nguyễn Văn A",
    rating: 5,
    comment: "Cô Sarah dạy rất tận tâm, phương pháp dễ hiểu. IELTS của em đã cải thiện rõ rệt.",
    date: "2024-01-15",
  },
  {
    id: "2",
    studentName: "Trần Thị B",
    rating: 5,
    comment: "Giáo viên rất kiên nhẫn và chuyên nghiệp. Highly recommended!",
    date: "2024-01-10",
  },
]

export const learningPackages: LearningPackage[] = [
  {
    id: "1",
    name: "Gói Cơ Bản",
    sessions: 5,
    price: 1000000,
    originalPrice: 1250000,
    features: ["5 buổi học 1-1", "Tài liệu học tập", "Hỗ trợ sau buổi học"],
  },
  {
    id: "2",
    name: "Gói Phổ Biến",
    sessions: 10,
    price: 1800000,
    originalPrice: 2500000,
    features: ["10 buổi học 1-1", "Tài liệu học tập", "Bài tập về nhà", "Đánh giá định kỳ"],
    popular: true,
  },
  {
    id: "3",
    name: "Gói Chuyên Sâu",
    sessions: 20,
    price: 3200000,
    originalPrice: 5000000,
    features: ["20 buổi học 1-1", "Tài liệu học tập", "Bài tập về nhà", "Đánh giá định kỳ", "Mock test", "Hỗ trợ 24/7"],
  },
]
