"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Category } from "@/types/product";
import { formatBnDate } from "@/lib/format";
import { authClient } from "@/lib/auth-client";
import { UserMenu } from "@/components/UserMenu";

type Props = {
  categories: Category[];
};

export function Navbar({ categories }: Props) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(formatBnDate(true));
  }, []);

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Image
                src="/logo-icon.png"
                alt=""
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            <div>
              <p className="text-lg font-bold leading-tight text-primary">
                🛒 বাজার দর
              </p>
              <p className="text-xs text-base-content/60">{dateStr}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {session?.user ? (
              <UserMenu
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
              />
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-ghost btn-sm sm:btn-md text-sm"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-primary btn-sm sm:btn-md rounded-full px-4"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-thin"
          aria-label="ক্যাটাগরি"
        >
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`btn btn-sm shrink-0 rounded-full border ${
                  active
                    ? "btn-primary border-primary text-primary-content"
                    : "btn-ghost border-base-300 bg-base-100"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
