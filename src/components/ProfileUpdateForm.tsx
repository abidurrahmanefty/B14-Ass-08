"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function ProfileUpdateForm() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট</h1>
        <p className="text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="card border border-base-300 bg-base-100 shadow-sm"
      >
        <div className="card-body gap-4 p-6">
          <h2 className="font-bold">তথ্য</h2>
          <label className="form-control w-full">
            <span className="label-text">নাম</span>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}
          </button>
        </div>
      </form>

      <Link href="/profile" className="text-sm text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
