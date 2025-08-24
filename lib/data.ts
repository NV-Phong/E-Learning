import {
   Course,
   Feedback,
   LearningPackage,
   Review,
   Student,
   Teacher,
   Transaction,
   User,
   UserRole,
} from "@/types/types";

// Sample Users
export const users: User[] = [
   {
      _id: "user_1",
      username: "sarah.johnson",
      password: "hashed_password",
      email: "sarah.johnson@example.com",
      phone: 84901234567,
      displayName: "Sarah Johnson",
      avatar:
         "https://i.pinimg.com/1200x/cc/fc/28/ccfc287609f1f27bc3bab9acf96b430a.jpg",
      cover: "/teacher-cover-1.jpg",
      role: "teacher" as UserRole,
      createdAt: new Date("2023-01-15"),
      isDeleted: false,
   },
   {
      _id: "user_2",
      username: "michael.chen",
      password: "hashed_password",
      email: "michael.chen@example.com",
      phone: 84901234568,
      displayName: "Michael Chen",
      avatar:
         "https://i.pinimg.com/1200x/01/36/93/01369388a24a6a697e782f95fd4d6b82.jpg",
      cover: "/teacher-cover-2.jpg",
      role: "teacher" as UserRole,
      createdAt: new Date("2023-02-10"),
      isDeleted: false,
   },
   {
      _id: "user_3",
      username: "emma.wilson",
      password: "hashed_password",
      email: "emma.wilson@example.com",
      phone: 84901234569,
      displayName: "Emma Wilson",
      avatar:
         "https://i.pinimg.com/736x/0d/bf/97/0dbf97ef9cef08d54cba34c95013663e.jpg",
      cover: "/teacher-cover-3.jpg",
      role: "teacher" as UserRole,
      createdAt: new Date("2023-03-05"),
      isDeleted: false,
   },
   {
      _id: "user_4",
      username: "nguyen.van.a",
      password: "hashed_password",
      email: "nguyen.van.a@example.com",
      phone: 84901234570,
      displayName: "Nguyễn Văn A",
      avatar: "/student-avatar-1.png",
      cover: "/student-cover-1.jpg",
      role: "student" as UserRole,
      createdAt: new Date("2023-04-01"),
      isDeleted: false,
   },
];

// Sample Teachers
export const teachersNew: Teacher[] = [
   {
      _id: "teacher_1",
      userID: "user_1",
      bio: "Giáo viên bản ngữ với chứng chỉ TESOL, chuyên về IELTS và tiếng Anh thương mại. Có 5 năm kinh nghiệm giảng dạy.",
      experienceYears: 5,
      certifications: ["TESOL", "IELTS Certified", "Cambridge CELTA"],
      hourlyRate: 250000,
      isDeleted: false,
      rating: {
         average: 4.9,
         count: 127,
      },
      availability: [
         {
            start: new Date("2024-01-20T09:00:00"),
            end: new Date("2024-01-20T10:00:00"),
         },
         {
            start: new Date("2024-01-20T14:00:00"),
            end: new Date("2024-01-20T15:00:00"),
         },
         {
            start: new Date("2024-01-20T19:00:00"),
            end: new Date("2024-01-20T20:00:00"),
         },
      ],
   },
   {
      _id: "teacher_2",
      userID: "user_2",
      bio: "Chuyên gia về TOEFL và tiếng Anh học thuật, phương pháp giảng dạy hiệu quả với 3 năm kinh nghiệm.",
      experienceYears: 3,
      certifications: ["TOEFL Certified", "TESOL"],
      hourlyRate: 200000,
      isDeleted: false,
      rating: {
         average: 4.8,
         count: 89,
      },
      availability: [
         {
            start: new Date("2024-01-20T10:00:00"),
            end: new Date("2024-01-20T11:00:00"),
         },
         {
            start: new Date("2024-01-20T15:00:00"),
            end: new Date("2024-01-20T16:00:00"),
         },
      ],
   },
   {
      _id: "teacher_3",
      userID: "user_3",
      bio: "Chuyên dạy trẻ em và cải thiện kỹ năng viết, tạo môi trường học tập vui vẻ với 4 năm kinh nghiệm.",
      experienceYears: 4,
      certifications: ["TEFL", "Child Psychology Certificate"],
      hourlyRate: 180000,
      isDeleted: false,
      rating: {
         average: 4.7,
         count: 156,
      },
      availability: [
         {
            start: new Date("2024-01-20T11:00:00"),
            end: new Date("2024-01-20T12:00:00"),
         },
         {
            start: new Date("2024-01-20T16:00:00"),
            end: new Date("2024-01-20T17:00:00"),
         },
      ],
   },
];

// Sample Students
export const students: Student[] = [
   {
      _id: "student_1",
      userID: "user_4",
      level: "Intermediate",
      goals: ["IELTS Preparation", "Business English", "Conversation Skills"],
      booking: [
         {
            teacherID: "teacher_1",
            courseID: "course_1",
            status: "confirmed",
            type: "trial",
            start: new Date("2024-01-25T09:00:00"),
            end: new Date("2024-01-25T10:00:00"),
         },
      ],
   },
];

// Sample Courses
export const courses: Course[] = [
   {
      _id: "course_1",
      title: "Gói Cơ Bản",
      description:
         "Khóa học cơ bản với 5 buổi học 1-1, phù hợp cho người mới bắt đầu",
      price: 1000000,
      sessions: 5,
      durationMonths: 1,
      isDeleted: false,
   },
   {
      _id: "course_2",
      title: "Gói Phổ Biến",
      description:
         "Khóa học phổ biến với 10 buổi học 1-1, bao gồm đánh giá định kỳ",
      price: 1800000,
      sessions: 10,
      durationMonths: 2,
      isDeleted: false,
   },
   {
      _id: "course_3",
      title: "Gói Chuyên Sâu",
      description:
         "Khóa học chuyên sâu với 20 buổi học 1-1, hỗ trợ 24/7 và mock test",
      price: 3200000,
      sessions: 20,
      durationMonths: 4,
      isDeleted: false,
   },
];

// Sample Transactions
export const transactions: Transaction[] = [
   {
      _id: "trans_1",
      courseID: "course_1",
      studentID: "student_1",
      status: "paid",
      paymentMethod: "Credit Card",
      createdAt: new Date("2024-01-15T10:30:00"),
      isDeleted: false,
   },
];

// Sample Feedback
export const feedbacks: Feedback[] = [
   {
      _id: "feedback_1",
      teacherID: "teacher_1",
      studentID: "student_1",
      rating: 5,
      comment:
         "Cô Sarah dạy rất tận tâm, phương pháp dễ hiểu. IELTS của em đã cải thiện rõ rệt.",
      createdAt: new Date("2024-01-15T15:00:00"),
      updatedAt: new Date("2024-01-15T15:00:00"),
      isDeleted: false,
   },
   {
      _id: "feedback_2",
      teacherID: "teacher_2",
      studentID: "student_1",
      rating: 5,
      comment: "Giáo viên rất kiên nhẫn và chuyên nghiệp. Highly recommended!",
      createdAt: new Date("2024-01-10T14:20:00"),
      updatedAt: new Date("2024-01-10T14:20:00"),
      isDeleted: false,
   },
];

// Legacy data for backward compatibility
export const teachers = [
   {
      id: "1",
      name: "Ana de Armas",
      avatar:
         "https://i.pinimg.com/736x/bf/d3/8a/bfd38a2887261d71654c9009590d2652.jpg",
      specialties: ["IELTS", "Business English", "Conversation"],
      hourlyRate: 250000,
      rating: 4.9,
      reviewCount: 127,
      experience: "5 năm kinh nghiệm",
      description:
         "Giáo viên bản ngữ với chứng chỉ TESOL, chuyên về IELTS và tiếng Anh thương mại.",
      certificates: ["TESOL", "IELTS Certified", "Cambridge CELTA"],
      languages: ["English (Native)", "Vietnamese (Intermediate)"],
      availability: ["9:00 AM", "2:00 PM", "7:00 PM"],
   },
   {
      id: "2",
      name: "Henry Cavill",
      avatar:
         "https://i.pinimg.com/1200x/01/36/93/01369388a24a6a697e782f95fd4d6b82.jpg",
      specialties: ["TOEFL", "Academic English", "Pronunciation"],
      hourlyRate: 200000,
      rating: 4.8,
      reviewCount: 89,
      experience: "3 năm kinh nghiệm",
      description:
         "Chuyên gia về TOEFL và tiếng Anh học thuật, phương pháp giảng dạy hiệu quả.",
      certificates: ["TOEFL Certified", "TESOL"],
      languages: ["English (Native)", "Mandarin (Native)"],
      availability: ["10:00 AM", "3:00 PM", "8:00 PM"],
   },
   {
      id: "3",
      name: "Tom Cruise",
      avatar:
         "https://i.pinimg.com/736x/0d/bf/97/0dbf97ef9cef08d54cba34c95013663e.jpg",
      specialties: ["Kids English", "Grammar", "Writing"],
      hourlyRate: 180000,
      rating: 4.7,
      reviewCount: 156,
      experience: "4 năm kinh nghiệm",
      description:
         "Chuyên dạy trẻ em và cải thiện kỹ năng viết, tạo môi trường học tập vui vẻ.",
      certificates: ["TEFL", "Child Psychology Certificate"],
      languages: ["English (Native)", "Spanish (Fluent)"],
      availability: ["11:00 AM", "4:00 PM", "6:00 PM"],
   },
];

export const reviews: Review[] = [
   {
      id: "1",
      studentName: "Nguyễn Văn A",
      rating: 5,
      comment:
         "Cô Sarah dạy rất tận tâm, phương pháp dễ hiểu. IELTS của em đã cải thiện rõ rệt.",
      date: "2024-01-15",
   },
   {
      id: "2",
      studentName: "Trần Thị B",
      rating: 5,
      comment: "Giáo viên rất kiên nhẫn và chuyên nghiệp. Highly recommended!",
      date: "2024-01-10",
   },
];

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
      features: [
         "10 buổi học 1-1",
         "Tài liệu học tập",
         "Bài tập về nhà",
         "Đánh giá định kỳ",
      ],
      popular: true,
   },
   {
      id: "3",
      name: "Gói Chuyên Sâu",
      sessions: 20,
      price: 3200000,
      originalPrice: 5000000,
      features: [
         "20 buổi học 1-1",
         "Tài liệu học tập",
         "Bài tập về nhà",
         "Đánh giá định kỳ",
         "Mock test",
         "Hỗ trợ 24/7",
      ],
   },
];
