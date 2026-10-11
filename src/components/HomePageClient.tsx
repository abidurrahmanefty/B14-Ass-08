"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

export function HomePageClient() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="space-y-10">
      <Hero />
      {products === null ? (
        <div className="space-y-4">
          <p className="text-sm text-base-content/70">লোড হচ্ছে…</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
          </div>
        </div>
      ) : (
        <HomeSections products={products} />
      )}
    </div>
  );
}
