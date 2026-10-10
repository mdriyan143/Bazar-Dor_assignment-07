import type { Direction } from "@/types";
import { toBnPercent } from "@/lib/format";

const STYLES: Record<Direction, string> = {
  up: "bg-up/10 text-up",
  down: "bg-down/10 text-down",
  flat: "bg-base-300/70 text-muted",
};

const ChangeBadge = ({
  dir,
  pct,
  className = "",
}: {
  dir: Direction;
  pct: number;
  className?: string;
}) => {
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${STYLES[dir]} ${className}`}>
      <span aria-hidden className="text-[10px]">
        {symbol}
      </span>
      {toBnPercent(pct)}%
    </span>
  );
};

export default ChangeBadge;