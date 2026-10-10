import type { Product } from "@/types";
import ProductCard from "./ProductCard";

export const gridClass =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className={gridClass}>
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);

export default ProductGrid;