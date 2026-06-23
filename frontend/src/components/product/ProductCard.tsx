"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

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

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
  };

  return (
    <div className="group overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f1e8]">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#9d8b7b]">
              No image
            </div>
          )}

          {isOutOfStock ? (
            <div className="absolute left-4 top-4 rounded-full bg-[#2d251f] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              Out of Stock
            </div>
          ) : (
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#5e4c3d]">
              In Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-2xl leading-tight text-[#2d251f] transition hover:text-[#8b6b4f]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 min-h-[44px] text-sm leading-6 text-[#786858]">
          {product.description?.trim()
            ? product.description
            : "Premium boutique baby essential crafted with comfort and care."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#9d8b7b]">
              Price
            </p>
            <p className="mt-1 text-lg font-medium text-[#2d251f]">
              {formatCurrency(price)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="rounded-full bg-[#2d251f] px-5 py-3 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#8b6b4f] disabled:cursor-not-allowed disabled:bg-[#c7b9ab]"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}