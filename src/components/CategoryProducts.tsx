"use client";

import { useMemo, useState } from "react";
import type { Product, SortKey } from "@/types";
import { sortProducts, toBn } from "@/lib/format";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";

const CategoryProducts = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="border-line bg-base-100 mt-6 flex justify-end rounded-2xl border p-4 sm:p-5">
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <p className="text-muted mt-4 mb-4 text-sm">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <ProductGrid products={sorted} />
    </>
  );
};

export default CategoryProducts;