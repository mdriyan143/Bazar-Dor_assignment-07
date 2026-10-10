import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import {
  perUnit,
  priceSummary,
  toBn,
  toBnPercent,
  toBnPrice,
  unitLabel,
} from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.nameBn ?? "পণ্য পাওয়া যায়নি" };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { min, max, avg, rows } = priceSummary(product);
  const diff = product.today - product.yesterday;
  const dirText =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত আছে";

  return (
    <div className="space-y-6">
      <nav aria-label="breadcrumb" className="text-muted flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span aria-hidden>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      <section className="border-line bg-base-100 flex flex-col gap-6 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <span className="bg-base-200 grid size-20 shrink-0 place-items-center rounded-2xl text-5xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-muted mt-1 text-sm">
              {perUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <strong>{dirText}</strong>
              {diff !== 0 && <> · {toBn(Math.abs(diff))} টাকা</>}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/category/${product.category}`}
                className="badge badge-outline badge-primary"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="badge badge-ghost">{perUnit(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl px-8 py-5 text-center sm:min-w-44">
          <p className="text-muted text-xs">আজকের দাম</p>
          <p className="text-4xl font-extrabold">{toBn(product.today)}</p>
          <p className="text-muted text-xs">
            টাকা / {unitLabel(product.unit)}
          </p>
          <div className="mt-2 flex justify-center">
            <ChangeBadge
              dir={product.change.dir}
              pct={product.change.pct}
              className="!bg-transparent"
            />
          </div>
        </div>
      </section>

      <section className="border-line bg-base-100 rounded-2xl border p-5 sm:p-8">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border-line rounded-xl border p-4">
            <p className="text-muted text-xs">সর্বনিম্ন দাম</p>
            <p className="text-down text-2xl font-extrabold">
              {toBn(min)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-muted text-xs">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="border-line rounded-xl border p-4">
            <p className="text-muted text-xs">সর্বাধিক দাম</p>
            <p className="text-up text-2xl font-extrabold">
              {toBn(max)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-muted text-xs">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="border-line rounded-xl border p-4">
            <p className="text-muted text-xs">গড় দাম</p>
            <p className="text-down text-2xl font-extrabold">
              {toBn(avg)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-muted text-xs">
              {perUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="border-line overflow-x-auto rounded-xl border">
          <table className="table min-w-[560px]">
            <thead>
              <tr className="text-muted">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={`${m.market}-${m.division}`} className="even:bg-base-200/60">
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{toBn(m.min)} টাকা</td>
                  <td className="text-right">{toBn(m.max)} টাকা</td>
                  <td className="text-right font-bold">{toBnPrice(m.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted mt-3 text-xs">
          গতকালের দাম {toBn(product.yesterday)} টাকা, গত সপ্তাহে {toBn(product.lastWeek)} টাকা,
          গত মাসে {toBn(product.lastMonth)} টাকা। আজকের পরিবর্তন {toBnPercent(product.change.pct)}%।
        </p>
      </section>
    </div>
  );
}