"use client";

import type { SortKey } from "@/types";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const SortSelect = ({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) => (
  <label className="flex items-center gap-3 text-sm">
    <span className="text-muted">সাজান</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="select select-sm sm:select-md w-auto"
      aria-label="সাজান"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

export default SortSelect;