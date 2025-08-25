import { Suspense } from "react";
import BookingForm from "../../components/form/booking-form";

export const dynamic = "force-dynamic";

export default function BookingPage() {
   return (
      <Suspense fallback={<p>Đang tải...</p>}>
         <BookingForm />
      </Suspense>
   );
}