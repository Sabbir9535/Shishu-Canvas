"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard"; // আপনার ফোল্ডার অনুযায়ী পাথ ঠিক করে নিন
import { getProducts } from "@/lib/api"; // আপনার API ফাংশন

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // API থেকে ডাটা ফেচ করা হচ্ছে
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    // Navbar-এর জন্য pt-[130px] বা pt-[150px] যোগ করা হয়েছে
    <section className="bg-[#faf7f2] px-4 pb-16 pt-[130px] md:px-8 lg:pb-28 lg:pt-[160px]">
      <div className="mx-auto max-w-[1440px]">
        
        {/* 🌟 Ultra-Premium Centered Header */}
        <div className="mb-8 flex flex-col items-center text-center md:mb-12 lg:mb-16">
          <div className="mb-2 flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4a9a2] sm:text-[16px]">
              All Products
            </span>
          </div>
          <h1 className="font-serif text-3xl text-[#3a322b] md:text-4xl lg:text-5xl">
            Our Collection
          </h1>
        </div>

        {/* 🛍️ Content Area (Cards Grid & States) */}
        {loading ? (
          // ✨ Loading Skeleton (আপনার দেওয়া হুবহু গ্রিড ক্লাসের সাথে মিলিয়ে)
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 xl:gap-y-12">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-[16px] border border-[#eee9e0] bg-white">
                <div className="aspect-4/4 w-full animate-pulse bg-[#f4efe8]"></div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-[#f4efe8]"></div>
                  <div className="mb-4 h-3 w-1/4 animate-pulse rounded bg-[#f4efe8]"></div>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                    <div className="h-9 animate-pulse rounded-lg bg-[#f4efe8] sm:h-10"></div>
                    <div className="h-9 animate-pulse rounded-lg bg-[#f4efe8] sm:h-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : safeProducts.length === 0 ? (
          // 📭 Empty State (আপনার দেওয়া হুবহু ডিজাইন)
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d8c8b8] bg-white/40 py-24 text-center backdrop-blur-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4efe8] text-2xl shadow-sm">
              ✨
            </div>
            <h3 className="font-serif text-2xl text-[#3a322b]">Collection Empty</h3>
            <p className="mt-2 text-sm font-light text-[#8a7b6c]">
              Premium collections will beautifully appear right here.
            </p>
          </div>
        ) : (
          // 📦 Products Grid (আপনার দেওয়া হুবহু গ্রিড ডিজাইন)
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 xl:gap-y-12">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}