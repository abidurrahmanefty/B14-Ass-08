"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Category, Product, SortMode } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { SortDropdown } from "@/components/SortDropdown";
import { sortProducts } from "@/lib/products";
import { formatCountBn } from "@/lib/format";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

type Props = {
  category: Category;
};

export function CategoryView({ category }: Props) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [sort, setSort] = useState<SortMode>("default");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProducts(null);
    fetch(`${API_BASE}/products?category=${category.slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<Product[]>;
      })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [category.slug]);

  const sorted =
    products === null ? [] : sortProducts(products, sort);

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        <Link href="/" className="btn btn-primary mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex-row items-center gap-4 p-6">
          <span className="text-5xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{category.nameBn}</h1>
            <p className="text-base-content/70">
              প্রতি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="card border border-base-300 bg-base-100">
        <div className="card-body flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-base-content/70">
            {products === null
              ? "লোড হচ্ছে…"
              : `মোট ${formatCountBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
          </p>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {products === null ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="py-12 text-center">
          <p>এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>
          <Link href="/" className="btn btn-primary mt-4">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
