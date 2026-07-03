"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, LayoutDashboard, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import clsx from "clsx";
import logoimg from "@/asset/logo.png"
import Image from "next/image";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "Products" },
  { label: "Gallery", href: "/gallery" },

];

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  // মোবাইল মেনুর স্টেট
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // পেজ পরিবর্তন হলে মোবাইল মেনু নিজে থেকে বন্ধ হয়ে যাবে
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8dfd3] bg-[#faf7f2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        
        {/* 1. Left Side: Hamburger Icon & Logo */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#2d251f] focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex ms-16 sm:ms-0 flex-col leading-none">
             <Image
                src={logoimg}
                width={90}
                height={90}
                alt="Picture of the author"
              />
          </Link>
        </div>

        {/* 2. Desktop Nav */}
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

        {/* 3. Right: Admin & Cart */}
        <div className="flex items-center gap-4">

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

      {/* 4. Mobile Menu Dropdown */}
      <div
        className={clsx(
          "absolute inset-x-0 top-full border-b border-[#e8dfd3] bg-[#faf7f2] shadow-lg transition-all duration-300 ease-in-out md:hidden overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav className="flex flex-col px-5 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block border-b border-[#e8dfd3]/50 py-3 text-sm transition-colors last:border-0",
                pathname === item.href
                  ? "font-medium text-[#2d251f]"
                  : "text-[#7d6b5d] hover:text-[#2d251f]"
              )}
            >
              {item.label}
            </Link>
          ))}
          
        </nav>
      </div>
    </header>
  );
}