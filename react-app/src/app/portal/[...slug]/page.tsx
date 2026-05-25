import FrozenPageFrame from "@/components/FrozenPageFrame";
import { portalFrozenMap, toFrozenSrc } from "@/lib/frozenMaps";
import { notFound } from "next/navigation";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return Object.keys(portalFrozenMap)
    .filter((key) => key.length > 0)
    .map((key) => ({ slug: key.split("/") }));
}

export default async function PortalSlugPage({ params }: RouteProps) {
  const { slug } = await params;
  const key = slug.join("/");
  const fileName = portalFrozenMap[key];

  if (!fileName) {
    notFound();
  }

  return <FrozenPageFrame src={toFrozenSrc("portal-pages", fileName)} title={`TGS Portal: ${key}`} />;
}
