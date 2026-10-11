"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatBnDate } from "@/lib/format";

export function Hero() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(formatBnDate(true));
  }, []);

  return (
    <section className="card border-0 bg-base-100 shadow-sm">
      <div className="card-body flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:p-10">
        <div className="flex-1 space-y-4">
          <span className="inline-block rounded-full border border-base-300 bg-base-200 px-4 py-1 text-sm font-medium">
            {dateStr}
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="max-w-xl text-base text-base-content/80">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — আজকের বাজারের
            তথ্য এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md rounded-full px-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
          <Image
            src="/hero-basket.png"
            alt=""
            width={320}
            height={320}
            className="max-h-64 w-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
