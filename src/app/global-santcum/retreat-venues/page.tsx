import { Suspense } from "react";
import TgsVenuesPage from "@/components/tgs/TgsVenuesPage";

export default function RetreatVenuesPage() {
  return (
    <Suspense fallback={null}>
      <TgsVenuesPage initialType="retreat" />
    </Suspense>
  );
}
