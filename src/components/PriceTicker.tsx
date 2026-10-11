import type { Product } from "@/types/product";
import { formatBnNumber, formatChangeBadge, formatUnitShort } from "@/lib/format";

type Props = {
  products: Product[];
};

function TickerItem({ product }: { product: Product }) {
  const badge = formatChangeBadge(product.change);

  return (
    <span className="inline-flex shrink-0 items-center gap-2 px-4 text-sm">
      <span>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span>
        দাম {formatBnNumber(product.today)} টাকা/{formatUnitShort(product.unit)}
      </span>
      <span className={`font-semibold ${badge.className}`}>{badge.label}</span>
    </span>
  );
}

export function PriceTicker({ products }: Props) {
  const items = products.length ? products : [];

  return (
    <div className="overflow-hidden border-y border-base-300 bg-base-300/40 py-2">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...items, ...items].map((product, i) => (
          <TickerItem key={`${product.slug}-${i}`} product={product} />
        ))}
      </div>
    </div>
  );
}
