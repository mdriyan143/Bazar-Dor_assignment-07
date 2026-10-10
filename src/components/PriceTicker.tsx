import Link from "next/link";
import { getProducts } from "@/lib/api";
import { toBn, unitLabel } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

const PriceTicker = async () => {
  const products = await getProducts();
  if (products.length === 0) return null;

  const items = (ariaHidden: boolean) =>
    products.map((p) => (
      <Link
        key={`${ariaHidden ? "b" : "a"}-${p.id}`}
        href={`/product/${p.slug}`}
        tabIndex={ariaHidden ? -1 : undefined}
        className="border-line hover:bg-base-200 flex shrink-0 items-center gap-2 border-r px-5 py-2 text-sm whitespace-nowrap"
      >
        <span aria-hidden>{p.image}</span>
        <span className="font-semibold">{p.nameBn}</span>
        <span className="text-muted">
          {toBn(p.today)} টাকা/{unitLabel(p.unit)}
        </span>
        <ChangeBadge dir={p.change.dir} pct={p.change.pct} className="!bg-transparent !px-0" />
      </Link>
    ));

  return (
    <div className="ticker border-line bg-base-100 overflow-hidden border-y">
      <div className="ticker-track">
        <div className="flex">{items(false)}</div>
        <div className="flex" aria-hidden>
          {items(true)}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;