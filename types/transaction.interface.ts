export interface Transaction {
   _id: string;
   courseID: string;
   studentID: string;
   status: 'pending' | 'paid' | 'failed' | 'refunded';
   paymentMethod: string;
   createdAt: Date;
   isDeleted: boolean;
}
