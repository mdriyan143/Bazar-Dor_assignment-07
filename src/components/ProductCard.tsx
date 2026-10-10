import Link from "next/link";
import type { Product } from "@/types";
import { perUnit, toBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group border-line bg-base-100 hover:border-primary/40 block rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5" >
      <div className="flex items-center gap-3">
        <span className="bg-base-200 grid size-12 shrink-0 place-items-center rounded-xl text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base leading-tight font-bold">
            {product.nameBn}
          </h3>
          <p className="text-muted text-sm">{perUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-muted text-xs">আজকের দাম</p>
        <div className="mt-0.5 flex items-end justify-between gap-2">
          <p className="text-xl font-extrabold">
            {toBn(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
          <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;