"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "auth") {
      toast.error("বিস্তারিত দেখতে সাইন ইন করুন");
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    const callback = searchParams.get("callbackUrl") ?? "/";
    router.push(callback);
  };

  const social = (provider: "google" | "github") => {
    authClient.signIn.social({
      provider,
      callbackURL: searchParams.get("callbackUrl") ?? "/",
    });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-2 text-sm text-base-content/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="card border border-base-300 bg-base-100 shadow-md"
      >
        <div className="card-body gap-4">
          <label className="form-control w-full">
            <span className="label-text">ইমেইল</span>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text">পাসওয়ার্ড</span>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
          </button>

          <div className="divider text-sm">অথবা</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => social("google")}
          >
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => social("github")}
          >
            GitHub দিয়ে চালিয়ে যান
          </button>

          <p className="text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-medium text-primary">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </form>

      <p className="text-center text-sm">
        <Link href="/" className="text-base-content/70 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
