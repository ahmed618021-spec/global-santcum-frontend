import { Suspense } from "react";
import TgsVenuesPage from "@/components/tgs/TgsVenuesPage";

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <TgsVenuesPage />
    </Suspense>
  );
}
