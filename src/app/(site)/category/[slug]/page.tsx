import { notFound } from "next/navigation";
import { getCategory } from "@/lib/api";
import { CategoryView } from "@/components/CategoryView";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
