import BookingContent from "@/components/form/booking-content";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}