export interface Course {
   _id: string;
   title: string;
   description: string;
   price: number;
   sessions: number;
   durationMonths: number;
   isDeleted: boolean;
}
