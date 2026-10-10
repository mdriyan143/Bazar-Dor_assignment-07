"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

const NavLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]"
    >
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-primary text-white"
                : "text-base-content/80 hover:bg-base-200"
            }`}>
            <span aria-hidden>{c.icon}</span>
            {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;