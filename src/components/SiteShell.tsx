import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/api";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PriceTicker } from "@/components/PriceTicker";

type Props = {
  children: React.ReactNode;
};

export async function SiteShell({ children }: Props) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <>
      <Suspense fallback={<div className="h-28 border-b border-base-300 bg-base-100" />}>
        <Navbar categories={categories} />
      </Suspense>
      <PriceTicker products={products} />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
