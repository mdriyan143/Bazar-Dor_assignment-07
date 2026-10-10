import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import NotFoundView from "@/components/NotFoundView";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category?.nameBn ?? "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) notFound();

  if (products.length === 0) {
    return (
      <NotFoundView
        title="এই বিভাগে কোনো পণ্য নেই"
        message="এই মুহূর্তে এই বিভাগে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি।"/>
    );
  }

  return (
    <div>
      <div className="border-line bg-base-100 flex items-center gap-4 rounded-2xl border p-5 sm:p-6">
        <span className="bg-base-200 grid size-14 shrink-0 place-items-center rounded-xl text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold">{category.nameBn}</h1>
          <p className="text-muted text-sm">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
}