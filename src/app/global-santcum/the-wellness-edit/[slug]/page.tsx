import { notFound } from "next/navigation";
import TgsArticleDetail from "@/components/tgs/TgsArticleDetail";
import {
  allArticles,
  getArticleBySlug,
} from "@/components/tgs/wellnessEditData";

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }));
}

export default async function WellnessEditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <TgsArticleDetail article={article} />;
}
