import { Suspense } from "react";
import SuccessContent from "../../components/form/success-form";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
   return (
      <Suspense fallback={<p>Đang tải...</p>}>
         <SuccessContent />
      </Suspense>
   );
}