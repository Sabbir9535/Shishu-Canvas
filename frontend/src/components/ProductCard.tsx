"use client";
import { useCartStore } from "@/store/useCartStore";
// ... অন্যান্য ইম্পোর্ট

export default function ProductCard({ id, name, price, image, sizes = "Standard", badge, rating = 5 }: any) {
  // Zustand থেকে addToCart ফাংশন নিয়ে আসা
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // কার্ডের অন্য লিংকে ক্লিক যেন না পড়ে
    addToCart({ id, name, price, image });
    alert("Item added to cart elegantly ✨"); // পরে এখানে সুন্দর Toast অ্যাড করতে পারেন
  };

  // ... বাকি কোড (renderStars, numericPrice ইত্যাদি)

  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] bg-cream relative overflow-hidden mb-5">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-transparent transition-colors duration-400 group-hover:bg-[#1a1a1a]/10 flex items-end p-6">
          <button 
            onClick={handleAddToCart} // <--- এখানে ইভেন্ট যুক্ত করা হয়েছে
            className="w-full bg-[#faf9f6] text-[#1a1a1a] border-none py-3 font-sans text-[10px] tracking-[0.2em] uppercase cursor-pointer translate-y-4 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#8b5a2b] hover:text-white"
          >
            Quick Add
          </button>
        </div>
      </div>
      {/* ... Product Info ... */}
    </div>
  );
}