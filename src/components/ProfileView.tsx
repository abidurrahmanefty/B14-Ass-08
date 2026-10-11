"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function ProfileView() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="skeleton h-48 w-full rounded-2xl" />;
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="w-16 rounded-xl bg-primary/10 text-primary">
                <span className="text-2xl">
                  {user.name?.charAt(0) ?? "?"}
                </span>
              </div>
            </div>
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-base-content/60">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error btn-sm"
          >
            ↩ সাইন আউট
          </button>
        </div>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4 p-6">
          <h2 className="font-bold">তথ্য</h2>
          <div>
            <p className="text-sm text-base-content/60">নাম</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <Link href="/profile/update" className="btn btn-primary w-full">
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}
