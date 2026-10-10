import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="skeleton h-72 w-full rounded-3xl" />
      <section className="space-y-4">
        <div className="skeleton h-6 w-40" />
        <ProductSkeleton />
      </section>
      <section className="space-y-4">
        <div className="skeleton h-6 w-40" />
        <ProductSkeleton />
      </section>
    </div>
  );
}