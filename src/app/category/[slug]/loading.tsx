import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton h-16 w-full rounded-2xl" />
      <ProductSkeleton count={6} />
    </div>
  );
}