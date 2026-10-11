import type { Product, SortMode } from "@/types/product";

export function getTopRisers(products: Product[], limit = 6): Product[] {
  return [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function getTopFallers(products: Product[], limit = 6): Product[] {
  return [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

export function sortProducts(products: Product[], mode: SortMode): Product[] {
  const list = [...products];
  if (mode === "price-asc") {
    return list.sort((a, b) => a.today - b.today);
  }
  if (mode === "price-desc") {
    return list.sort((a, b) => b.today - a.today);
  }
  return list;
}

export function getMarketSummary(markets: Product["markets"]) {
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const rowAvgs = markets.map((m) => (m.min + m.max) / 2);
  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
    avg: rowAvgs.reduce((s, v) => s + v, 0) / rowAvgs.length,
  };
}

export function marketRowAvg(min: number, max: number): number {
  return (min + max) / 2;
}
