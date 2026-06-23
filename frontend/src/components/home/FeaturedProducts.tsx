import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

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
      className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8f7a68]">
            Curated Collection
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[#2d251f] md:text-5xl">
            Shop our featured baby essentials
          </h2>
          <p className="mt-4 text-base leading-7 text-[#6e5d4f]">
            A refined collection of soft, premium pieces thoughtfully selected
            for modern little wardrobes.
          </p>
        </div>

        <div className="text-sm text-[#8b735d]">
          {safeProducts.length} product
          {safeProducts.length !== 1 ? "s" : ""} available
        </div>
      </div>

      {safeProducts.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#dccdbc] bg-white px-6 py-16 text-center">
          <h3 className="font-serif text-3xl text-[#2d251f]">
            No products available
          </h3>
          <p className="mt-3 text-sm text-[#7d6b5d]">
            Once your backend products are ready, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {safeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}