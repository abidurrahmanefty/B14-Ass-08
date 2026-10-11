"use client";

import { ChevronDown } from "lucide-react";
import type { SortMode } from "@/types/product";

const OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

type Props = {
  value: SortMode;
  onChange: (mode: SortMode) => void;
};

export function SortDropdown({ value, onChange }: Props) {
  const current = OPTIONS.find((o) => o.value === value)?.label ?? "ডিফল্ট";

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-1 text-sm"
      >
        <span className="text-base-content/70">সাজান</span>
        <span className="font-medium">{current}</span>
        <ChevronDown className="h-4 w-4 text-base-content/60" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-30 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        {OPTIONS.map((opt) => (
          <li key={opt.value}>
            <button
              type="button"
              className={value === opt.value ? "active font-semibold" : ""}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
