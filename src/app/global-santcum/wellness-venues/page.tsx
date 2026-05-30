import { Suspense } from "react";
import TgsVenuesPage from "@/components/tgs/TgsVenuesPage";

export default function WellnessVenuesPage() {
  return (
    <Suspense fallback={null}>
      <TgsVenuesPage initialType="wellness" />
    </Suspense>
  );
}
