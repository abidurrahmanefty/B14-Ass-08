import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-200 px-4 text-center">
      <h1 className="text-3xl font-bold">৪০৪</h1>
      <p className="mt-4 text-base-content/70">
        এই পেজটি পাওয়া যায়নি বা লিংকটি ভুল।
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
