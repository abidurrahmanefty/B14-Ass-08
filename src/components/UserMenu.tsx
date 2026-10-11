"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type Props = {
  name: string;
  email: string;
  image?: string | null;
};

export function UserMenu({ name, email, image }: Props) {
  const firstName = name.split(" ")[0] || name;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    window.location.href = "/";
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
      >
        <div className="avatar">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-primary/10">
            {image ? (
              <Image
                src={image}
                alt=""
                width={36}
                height={36}
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                {firstName.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
        <span className="text-base-content/50">▾</span>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-40 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl"
      >
        <p className="font-semibold">{name}</p>
        <p className="truncate text-sm text-base-content/60">{email}</p>
        <ul className="menu mt-3 p-0">
          <li>
            <Link href="/profile" className="gap-2">
              <User className="h-4 w-4" />
              👤 আমার প্রোফাইল
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className="gap-2 text-error"
            >
              <LogOut className="h-4 w-4" />
              ↩ সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
