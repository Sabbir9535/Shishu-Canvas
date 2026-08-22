"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import clsx from "clsx";
import logoimg from "@/asset/logo.png";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" }, // Assuming lowercase for standard routing
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // পেজ পরিবর্তন হলে মোবাইল মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#faf7f2]/95 backdrop-blur shadow-sm">
      {/* 1. Optional Top Announcement Bar (Premium Feel) */}
      <div className="bg-[#2d251f] px-4 py-2 text-center text-xs font-medium tracking-widest text-[#faf7f2]">
        COMPLIMENTARY SHIPPING ON PREMIUM ORDERS
      </div>

      {/* 2. Main Header (Logo, Search, Icons) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:gap-8 md:px-8">
        
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#2d251f] focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logoimg}
            width={90}
            height={90}
            alt="Brand Logo"
            className="h-auto w-[70px] sm:w-[90px]"
          />
        </Link>

        {/* Desktop Search Bar (Centered, Minimal) */}
        <div className="hidden flex-1 max-w-2xl items-center rounded-full border border-[#e8dfd3] bg-white px-4 py-2.5 transition-all focus-within:border-[#2d251f] focus-within:ring-1 focus-within:ring-[#2d251f] md:flex">
          <Search size={18} className="text-[#7d6b5d]" />
          <input
            type="text"
            placeholder="Search our collection..."
            className="w-full bg-transparent px-3 text-sm text-[#2d251f] placeholder-[#7d6b5d] outline-none"
          />
        </div>

        {/* Right Side Icons (Account & Cart) */}
        <div className="flex shrink-0 items-center gap-5">
          {/* Account Icon (Hidden on small mobile for cleaner look) */}
          <Link href="/account" className="hidden text-[#2d251f] transition hover:opacity-70 sm:block">
            <User size={22} strokeWidth={1.5} />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center text-[#2d251f] transition hover:opacity-70"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2d251f] text-[10px] font-medium text-white ring-2 ring-[#faf7f2]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 3. Bottom Desktop Nav Links (Like the reference image) */}
      <nav className="hidden border-t border-[#e8dfd3]/50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-8 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm font-medium uppercase tracking-wider transition-colors",
                pathname === item.href
                  ? "text-[#2d251f]"
                  : "text-[#7d6b5d] hover:text-[#2d251f]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* 4. Mobile Menu Dropdown */}
      <div
        className={clsx(
          "absolute inset-x-0 top-full border-b border-[#e8dfd3] bg-[#faf7f2] shadow-lg transition-all duration-300 ease-in-out md:hidden overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <div className="px-5 py-4">
          {/* Mobile Search Bar */}
          <div className="mb-4 flex items-center rounded-lg border border-[#e8dfd3] bg-white px-3 py-2">
            <Search size={18} className="text-[#7d6b5d]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-2 text-sm text-[#2d251f] outline-none"
            />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block border-b border-[#e8dfd3]/50 py-3 text-sm font-medium transition-colors last:border-0",
                  pathname === item.href
                    ? "text-[#2d251f]"
                    : "text-[#7d6b5d] hover:text-[#2d251f]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}