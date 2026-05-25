import FrozenPageFrame from "@/components/FrozenPageFrame";
import { portalFrozenMap, toFrozenSrc } from "@/lib/frozenMaps";

export default function PortalEntryPage() {
  const fileName = portalFrozenMap[""];
  return <FrozenPageFrame src={toFrozenSrc("portal-pages", fileName)} title="TGS Portal Home" />;
}
