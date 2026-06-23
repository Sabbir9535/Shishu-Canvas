"use client";

import Link from "next/link";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "Products" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8dfd3] bg-[#faf7f2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-wide text-[#2d251f]">
            Shishu Canvas
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#8b735d]">
            Boutique Baby Collection
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm transition-colors",
                pathname === item.href
                  ? "text-[#2d251f]"
                  : "text-[#7d6b5d] hover:text-[#2d251f]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="hidden items-center gap-2 rounded-full border border-[#e7dccf] px-4 py-2 text-sm text-[#5e4c3d] transition hover:bg-[#f5eee6] md:inline-flex"
          >
            <LayoutDashboard size={16} />
            Admin
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e7dccf] bg-white text-[#2d251f] transition hover:bg-[#f8f1e9]"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#2d251f] px-1 text-[10px] font-medium text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}