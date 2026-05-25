import FrozenPageFrame from "@/components/FrozenPageFrame";
import { toFrozenSrc, webFrozenMap } from "@/lib/frozenMaps";
import { notFound } from "next/navigation";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return Object.keys(webFrozenMap)
    .filter((key) => key.length > 0)
    .map((key) => ({ slug: key.split("/") }));
}

export default async function WebSlugPage({ params }: RouteProps) {
  const { slug } = await params;
  const key = slug.join("/");
  const fileName = webFrozenMap[key];

  if (!fileName) {
    notFound();
  }

  return <FrozenPageFrame src={toFrozenSrc("web-pages", fileName)} title={`TGS Website: ${key}`} />;
}
