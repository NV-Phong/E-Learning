export interface Student {
   _id: string;
   userID: string;
   level: string;
   goals: string[];
   booking: {
      teacherID: string;
      courseID: string;
      status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
      type: 'trial' | 'paid';
      start: Date;
      end: Date;
   }[];
}
