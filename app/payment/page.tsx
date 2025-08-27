import { Suspense } from "react";
import PaymentContent from "@/components/form/payment-content";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
