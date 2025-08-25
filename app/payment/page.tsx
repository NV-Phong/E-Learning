import { Suspense } from "react";
import PaymentForm from "../../components/form/payment-form";

export default function PaymentPage() {
   return (
      <Suspense fallback={<p>Đang tải...</p>}>
         <PaymentForm />
      </Suspense>
   );
}