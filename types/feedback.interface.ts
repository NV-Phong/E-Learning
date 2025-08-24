export interface Feedback {
   _id: string;
   teacherID: string;
   studentID: string;
   rating: number;
   comment: string;
   createdAt: Date;
   updatedAt: Date;
   isDeleted: boolean;
}
