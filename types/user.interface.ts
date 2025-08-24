export enum UserRole {
   STUDENT = 'student',
   ADMIN = 'admin',
   TEACHER = 'teacher',
}
export interface User {
   _id: string;
   username: string;
   password: string;
   email: string;
   phone: number;
   displayName: string;
   avatar: string;
   cover: string;
   role: UserRole;
   createdAt: Date;
   isDeleted: boolean;
}
