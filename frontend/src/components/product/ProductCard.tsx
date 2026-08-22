"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Zap, Star } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const price = typeof product.price === "string" ? parseFloat(product.price) : Number(product.price) || 0;
  const stock = typeof product.stock === "number" ? product.stock : Number(product.stock) || 0;
  
  const imageSrc = typeof product.image === "string" && product.image.trim().length > 0 
    ? product.image 
    : "/placeholder-image.jpg";

  const isOutOfStock = stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
    router.push("/checkout"); 
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[#eee9e0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-15px_rgba(138,123,108,0.2)]">
      
      {/* Image Section */}
      <Link href={`/products/${product.id}`} className="relative block aspect-4/4 w-full overflow-hidden bg-[#f4efe8]">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* Badges */}
        {isOutOfStock && (
          <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[9px] uppercase tracking-wider text-white backdrop-blur-sm sm:left-3 sm:top-3">
            Sold Out
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
      

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-1 line-clamp-2 font-serif text-[13px] leading-snug text-[#4a3f35] transition-colors hover:text-[#8a7b6c] sm:text-[15px]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-4 mt-1 text-[13px] font-medium text-[#4a3f35] sm:text-[15px]">
          ৳ {formatCurrency(price)}
        </div>

        {/* Action Buttons (Always at bottom) */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#d8c8b8] bg-transparent text-[9px] font-semibold uppercase tracking-wider text-[#6e5c4f] transition-colors hover:bg-[#f4efe8] disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-[10px]"
            title="Add to Cart"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            <span className="hidden xs:inline-block">Cart</span>
          </button>
          
          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#d4a9a2] text-[9px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#3a322b] hover:shadow-lg hover:shadow-[#594d42]/30 disabled:cursor-not-allowed disabled:bg-[#b0a59a] sm:h-10 sm:text-[10px]"
            title="Buy Now"
          >
            <Zap size={14} strokeWidth={1.5} className="fill-current" />
            <span>Buy</span>
          </button>
        </div>

      </div>
    </div>
  );
}