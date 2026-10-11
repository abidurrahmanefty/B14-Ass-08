"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে — সাইন ইন করুন");
    router.push("/signin");
  };

  const social = (provider: "google" | "github") => {
    authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-base-content/70">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="card border border-base-300 bg-base-100 shadow-md"
      >
        <div className="card-body gap-4">
          <label className="form-control w-full">
            <span className="label-text">নাম</span>
            <input
              className="input input-bordered w-full"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
          <label className="form-control w-full">
            <span className="label-text">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="আবার লিখুন"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <div className="divider text-sm">অথবা</div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => social("google")}
            >
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => social("github")}
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-sm">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-medium text-primary">
              সাইন ইন করুন
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
