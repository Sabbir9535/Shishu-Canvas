// src/components/ProductsSection.tsx
import ProductCard from "./ProductCard";
import { Product } from "@/types"; // আপনার টাইপের লোকেশন অনুযায়ী পাথ ঠিক করে নিবেন

// API থেকে ডেটা ফেচ করার ফাংশন
async function getProducts(): Promise<Product[]> {
  try {
    // cache: 'no-store' ব্যবহার করলে সবসময় লেটেস্ট ডেটা আসবে
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store", 
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsSection() {
  const products = await getProducts();

  return (
    <section className="bg-[#faf9f6] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 tracking-wide">
            Our Collection
          </h2>
          <p className="text-xs md:text-sm text-gray-500 tracking-[0.2em] uppercase font-light">
            Discover Cinematic Elegance
          </p>
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20 font-serif text-lg">
            No products found. Please check back later.
          </div>
        )}

      </div>
    </section>
  );
}