import type { Product, SortKey, Unit } from "@/types";

const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const bnPrice2 = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const toBn = (n: number) => bnNumber.format(n);

export const toBnPrice = (n: number) =>
  Number.isInteger(n) ? bnNumber.format(n) : bnPrice2.format(n);

export const toBnPercent = (n: number) => bnPercent.format(Math.abs(n));

const UNIT_LABEL: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (unit: Unit) => UNIT_LABEL[unit] ?? unit;
export const perUnit = (unit: Unit) => `প্রতি ${unitLabel(unit)}`;

export function banglaDate(): string {
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

export function topMovers(
  products: Product[],
  dir: "up" | "down",
  limit = 6,
): Product[] {
  return products
    .filter((p) => p.change.dir === dir)
    .sort((a, b) =>
      dir === "up" ? b.change.pct - a.change.pct : a.change.pct - b.change.pct,
    )
    .slice(0, limit);
}

export function sortProducts(products: Product[], key: SortKey): Product[] {
  if (key === "price-asc") return [...products].sort((a, b) => a.today - b.today);
  if (key === "price-desc") return [...products].sort((a, b) => b.today - a.today);
  return products;
}

export function priceSummary(product: Product) {
  const { markets } = product;
  const avgs = markets.map((m) => (m.min + m.max) / 2);
  return {
    min: Math.min(...markets.map((m) => m.min)),
    max: Math.max(...markets.map((m) => m.max)),
    avg: Math.round(avgs.reduce((s, v) => s + v, 0) / (avgs.length || 1)),
    rows: markets
      .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
      .sort((a, b) => a.avg - b.avg),
  };
}