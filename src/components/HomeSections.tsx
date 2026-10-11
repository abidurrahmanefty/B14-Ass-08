import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import {
  getTopFallers,
  getTopRisers,
} from "@/lib/products";
import { formatCountBn } from "@/lib/format";

type Props = {
  products: Product[];
};

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export function HomeSections({ products }: Props) {
  const risers = getTopRisers(products, 6);
  const fallers = getTopFallers(products, 6);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          আজ দাম বেড়েছে <span className="text-error">▲</span>
        </h2>
        <ProductGrid items={risers} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          আজ দাম কমেছে <span className="text-success">▼</span>
        </h2>
        <ProductGrid items={fallers} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-24 space-y-4">
        <div>
          <h2 className="text-xl font-bold">সব পণ্য</h2>
          <p className="text-sm text-base-content/70">
            মোট {formatCountBn(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <ProductGrid items={products} />
      </section>
    </div>
  );
}
