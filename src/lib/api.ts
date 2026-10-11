import type { Category, Product } from "@/types/product";

const BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchJson<Product[]>(`/products${q}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/categories");
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    return await fetchJson<Category>(`/categories/${slug}`);
  } catch {
    const all = await getCategories();
    return all.find((c) => c.slug === slug) ?? null;
  }
}
