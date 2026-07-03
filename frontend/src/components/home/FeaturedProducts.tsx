import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

type FeaturedProductsProps = {
  products?: Product[] | null;
};

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section
      id="featured-products"
      className="bg-[#faf7f2] px-6 py-20 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#8f7a68]">
              <span className="h-[1px] w-8 bg-[#8f7a68]"></span>
              Curated Collection
            </p>
            <h2 className="font-serif text-4xl text-[#2d251f] md:text-5xl lg:text-[56px] leading-[1.1]">
              Shop our featured <br className="hidden md:block"/> 
              <em className="font-light italic text-[#a48671]">baby essentials</em>
            </h2>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-[#6e5d4f]">
              A refined collection of soft, premium pieces thoughtfully selected
              for modern little wardrobes.
            </p>
          </div>

          <div className="flex items-center gap-4 border-b border-[#eadfce] pb-2 text-[11px] uppercase tracking-[0.2em] text-[#8b735d]">
            <span>
              {safeProducts.length} product{safeProducts.length !== 1 ? "s" : ""} available
            </span>
          </div>
        </div>

        {/* Content Area */}
        {safeProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-[#dccdbc] bg-white/50 px-6 py-24 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1e8] text-2xl">
              🎀
            </div>
            <h3 className="font-serif text-3xl text-[#2d251f]">
              No products available
            </h3>
            <p className="mt-3 max-w-sm text-sm font-light text-[#7d6b5d]">
              Once your backend products are ready, they will beautifully appear right here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}