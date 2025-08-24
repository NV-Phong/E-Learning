export * from "./course.interface";
export * from "./teacher.interface";
export * from "./student.interface";
export * from "./user.interface";
export * from "./feedback.interface";
export * from "./transaction.interface";

export interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  date: string
}

export interface LearningPackage {
  id: string
  name: string
  sessions: number
  price: number
  originalPrice: number
  features: string[]
  popular?: boolean
}