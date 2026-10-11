import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatChangeBadge,
  formatPriceBn,
  formatUnit,
} from "@/lib/format";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const badge = formatChangeBadge(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300 bg-base-100 shadow-sm transition hover:border-primary/30 hover:shadow-md"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex gap-3">
          <span className="text-4xl leading-none" aria-hidden>
            {product.image}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold">{product.nameBn}</h3>
            <p className="text-xs text-base-content/60">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-xl font-bold">{formatPriceBn(product.today)}</p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
