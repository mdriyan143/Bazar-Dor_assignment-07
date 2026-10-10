import type { Category, Product } from "@/types";

const PRIMARY =
  process.env.API_BASE_URL ?? "https://openapi.programming-hero.com/api/bazardor";
const FALLBACK =
  process.env.API_BASE_URL_FALLBACK ?? "https://api.abcz.workers.dev/api/bazardor";

const REVALIDATE_SECONDS = 300;

async function request<T>(path: string): Promise<T | null> {
  for (const base of [PRIMARY, FALLBACK]) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (res.status === 404) return null;
      if (!res.ok) continue;
      return (await res.json()) as T;
    } catch {
    }
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  return (await request<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const category = await request<Category>(
    `/categories/${encodeURIComponent(slug)}`,
  );
  return category && category.slug ? category : null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await request<Product[]>(`/products${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await request<Product[]>(
    `/products?slug=${encodeURIComponent(slug)}`,
  );
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}