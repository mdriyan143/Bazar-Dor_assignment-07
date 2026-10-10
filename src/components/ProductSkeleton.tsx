import { gridClass } from "./ProductGrid";

export const CardSkeleton = () => (
  <div className="border-line bg-base-100 rounded-2xl border p-5">
    <div className="flex items-center gap-3">
      <div className="skeleton size-12 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="skeleton h-3 w-16" />
      <div className="flex items-end justify-between">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  </div>
);

const ProductSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className={gridClass} aria-busy="true" aria-label="লোড হচ্ছে">
    {Array.from({ length: count }, (_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default ProductSkeleton;