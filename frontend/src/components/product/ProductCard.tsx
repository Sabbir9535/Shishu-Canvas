"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Zap } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : Number(product.price) || 0;

  const stock =
    typeof product.stock === "number"
      ? product.stock
      : Number(product.stock) || 0;

  const imageSrc =
    typeof product.image === "string" && product.image.trim().length > 0
      ? product.image
      : "";

  const isOutOfStock = stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // লিংক ক্লিক হওয়া থেকে আটকাতে
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
    router.push("/checkout"); // আপনার চেকআউট পেজের লিংক দিন
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#eadfce]/50">
      
      {/* Image Section */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-[#f7f1e8]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-light text-[#9d8b7b]">
            No image available
          </div>
        )}

        {/* Stock Badge */}
        {isOutOfStock ? (
          <div className="absolute left-4 top-4 rounded-full bg-[#2d251f] px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white shadow-sm">
            Out of Stock
          </div>
        ) : (
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#5e4c3d] shadow-sm backdrop-blur-sm">
            In Stock
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/products/${product.id}`} className="flex-1">
            <h3 className="font-serif text-2xl leading-tight text-[#2d251f] transition-colors hover:text-[#8b6b4f]">
              {product.name}
            </h3>
          </Link>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9d8b7b] mb-1">Price</p>
            <p className="text-lg font-medium text-[#2d251f]">
              {formatCurrency(price)}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm font-light leading-relaxed text-[#786858]">
          {product.description?.trim()
            ? product.description
            : "Premium boutique baby essential crafted with absolute comfort and care."}
        </p>

        {/* Actions Buttons */}
        <div className="mt-auto pt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-2 rounded-full border border-[#eadfce] bg-transparent py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#2d251f] transition-colors hover:bg-[#f7f1e8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              Add to Cart
            </button>
            
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-2 rounded-full bg-[#2d251f] py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8b6b4f] disabled:cursor-not-allowed disabled:bg-[#c7b9ab]"
            >
              <Zap size={14} className="fill-current" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}