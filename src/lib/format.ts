import type { PriceChange } from "@/types/product";

const bnFormatter = new Intl.NumberFormat("bn-BD");

export function formatBnNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatBnDate(long = false): string {
  const now = new Date();
  const formatted = now.toLocaleDateString("bn-BD", {
    weekday: long ? "long" : "long",
    day: "numeric",
    month: long ? "long" : "long",
    year: "numeric",
  });
  return formatted;
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

export function formatUnit(unit: string): string {
  return UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
}

export function formatUnitShort(unit: string): string {
  const map: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };
  return map[unit] ?? unit;
}

export function formatPriceBn(amount: number): string {
  return `${formatBnNumber(amount)} টাকা`;
}

export function formatChangeBadge(change: PriceChange): {
  label: string;
  className: string;
} {
  const pct = Math.abs(change.pct);
  const pctStr = formatBnNumber(pct, 1);

  if (change.dir === "up") {
    return {
      label: `▲ ${pctStr}%`,
      className: "bg-success/10 text-success",
    };
  }
  if (change.dir === "down") {
    return {
      label: `▼ ${pctStr}%`,
      className: "bg-error/10 text-error",
    };
  }
  return {
    label: `— ${formatBnNumber(0, 1)}%`,
    className: "bg-base-300 text-base-content/60",
  };
}

export function formatCountBn(count: number): string {
  return bnFormatter.format(count);
}
