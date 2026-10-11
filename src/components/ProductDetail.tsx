import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatChangeBadge,
  formatBnNumber,
  formatPriceBn,
  formatUnit,
  formatUnitShort,
} from "@/lib/format";
import {
  getMarketSummary,
  marketRowAvg,
} from "@/lib/products";

type Props = {
  product: Product;
};

export function ProductDetail({ product }: Props) {
  const badge = formatChangeBadge(product.change);
  const summary = getMarketSummary(product.markets);
  const delta = product.today - product.yesterday;
  const deltaAbs = Math.abs(delta);
  const trend =
    delta > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatBnNumber(deltaAbs)} টাকা`
      : delta < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatBnNumber(deltaAbs)} টাকা`
        : "গতকালের তুলনায় দাম অপরিবর্তিত";

  return (
    <div className="space-y-8">
      <nav className="text-sm text-base-content/70">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary"
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex flex-col gap-6 p-6 lg:flex-row lg:justify-between">
          <div className="flex gap-4">
            <span className="text-6xl">{product.image}</span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {product.nameBn}
              </h1>
              <span className="badge badge-outline mt-2 gap-1 border-base-300">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <p className="mt-2 text-base-content/70">
                {formatUnit(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-2 text-sm text-base-content/80">{trend}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4 lg:min-w-[200px]">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatPriceBn(product.today)}</p>
            <p className="text-sm text-base-content/60">
              / {formatUnitShort(product.unit)}
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body p-5">
              <p className="text-sm text-base-content/60">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-success">
                {formatPriceBn(summary.min)}
              </p>
            </div>
          </div>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body p-5">
              <p className="text-sm text-base-content/60">সর্বোচ্চ দাম</p>
              <p className="text-2xl font-bold text-error">
                {formatPriceBn(summary.max)}
              </p>
            </div>
          </div>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body p-5">
              <p className="text-sm text-base-content/60">গড় দাম</p>
              <p className="text-2xl font-bold">
                {formatPriceBn(Math.round(summary.avg))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-base-200 text-sm">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
                <th>গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => {
                const avg = marketRowAvg(m.min, m.max);
                return (
                  <tr key={m.market} className="text-sm">
                    <td>{m.market}</td>
                    <td>{m.division}</td>
                    <td>{formatBnNumber(m.min)} টাকা</td>
                    <td>{formatBnNumber(m.max)} টাকা</td>
                    <td>{formatBnNumber(avg, avg % 1 ? 2 : 0)} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
