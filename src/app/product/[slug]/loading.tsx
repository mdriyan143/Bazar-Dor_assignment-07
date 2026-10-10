export default function Loading() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="skeleton h-4 w-56" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="border-line bg-base-100 space-y-4 rounded-2xl border p-8">
        <div className="skeleton h-5 w-40" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="skeleton h-24 rounded-xl" />
          <div className="skeleton h-24 rounded-xl" />
          <div className="skeleton h-24 rounded-xl" />
        </div>
        <div className="skeleton h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}