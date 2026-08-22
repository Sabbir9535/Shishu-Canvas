import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

type FeaturedProductsProps = {
  products?: Product[] | null;
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section className="bg-[#faf7f2] px-4 py-16 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        
        {/* 🌟 Ultra-Premium Centered Header */}
        <div className="mb-6 flex flex-col items-left text-center md:mb-10 lg:mb-16">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-[10px] sm:text-[16px] font-semibold uppercase tracking-[0.35em] text-[#d4a9a2]">
              Feature Produts
            </span>
          </div>
        </div>

        {/* 🛍️ Content Area (Cards Grid) */}
        {safeProducts.length === 0 ? (
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
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 xl:gap-y-12">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 🚀 Elegant Bottom Button */}
        {safeProducts.length > 0 && (
          <div className="mt-14 flex justify-center md:mt-20">
            <Link
              href="/products"
              className="group relative flex h-12 items-center justify-center overflow-hidden border border-[#d8c8b8] bg-transparent px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-[#4a3f35] transition-all hover:border-[#4a3f35] sm:h-14 sm:px-10"
            >
              <span className="relative z-10 transition-colors group-hover:text-white">
                Explore Full Collection
              </span>
              {/* Button Hover Fill Effect */}
              <div className="absolute inset-0 -z-0 h-full w-0 bg-[#4a3f35] transition-all duration-500 ease-out group-hover:w-full"></div>
            </Link>
          </div>
        )}
        
      </div>
    </section>
  );
}