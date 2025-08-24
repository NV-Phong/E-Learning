export interface Teacher {
   _id: string;
   userID: string;
   bio: string;
   experienceYears: number;
   certifications: string[];
   hourlyRate: number;
   isDeleted: boolean;
   rating: {
      average: number;
      count: number;
   };
   availability: {
      start: Date;
      end: Date;
   }[];
}
