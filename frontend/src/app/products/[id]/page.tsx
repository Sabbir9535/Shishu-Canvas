"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, ShoppingBag, Zap, ShieldCheck, Leaf, Plus, Minus } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setPageError("");

        if (!productId) {
          throw new Error("Invalid product id");
        }

        const data = await getProductById(String(productId));
        setProduct(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load product";
        setPageError(message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const isOutOfStock = product ? product.stock <= 0 : true;

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;
    addToCart(product, quantity);
    router.push("/checkout");
  };

  // 1. Loading State (Premium Light Theme Skeleton)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] px-5 pb-24 pt-[120px] md:px-8 md:pt-[150px]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[4/5] w-full animate-pulse rounded-md bg-[#e8dfd3]" />
          <div className="space-y-6 pt-10">
            <div className="h-4 w-32 animate-pulse rounded bg-[#e8dfd3]" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-[#e8dfd3]" />
            <div className="h-8 w-40 animate-pulse rounded bg-[#e8dfd3]" />
            <div className="mt-12 h-32 w-full animate-pulse rounded bg-[#e8dfd3]" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State (Minimalist)
  if (pageError || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-5 pt-[120px]">
        <div className="rounded-lg border border-[#e8dfd3] bg-white px-8 py-16 text-center shadow-sm">
          <h2 className="font-serif text-3xl text-[#2d251f]">Product not found</h2>
          <p className="mt-4 text-sm text-[#7d6b5d]">
            {pageError || "We could not load this product. It may have been removed."}
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center rounded bg-[#2d251f] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4a3f35]"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // 3. Main Product Page
  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 pb-24 pt-[110px] md:px-8 md:pt-[150px]">
      <div className="mx-auto max-w-7xl">
        
        {/* Back Button */}
        <div className="mb-8 md:mb-12">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7d6b5d] transition-colors hover:text-[#2d251f]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Column: Product Image */}
          <div className="w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#f5eee6] shadow-sm">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-widest text-[#9d8b7b]">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-center py-4 md:py-6 lg:py-10">
            
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#7d6b5d]">
              Premium Collection
            </p>

            <h1 className="mb-4 font-serif text-3xl leading-[1.2] text-[#2d251f] md:mb-6 md:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mb-6 flex items-end gap-5 border-b border-[#e8dfd3] pb-6 md:mb-8 md:pb-8">
              <p className="text-2xl font-medium text-[#2d251f] md:text-3xl">
                {formatCurrency(product.price)}
              </p>
              <div className="mb-1 rounded-full border border-[#d2c5b8] bg-white px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7d6b5d] md:px-4 md:py-1.5">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 md:mb-10">
              <p className="max-w-2xl text-sm leading-relaxed text-[#7d6b5d] md:text-base md:leading-[1.9]">
                {product.description ||
                  "A thoughtfully selected premium product from our boutique collection. Crafted with the utmost care to provide absolute comfort and timeless style."}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mb-10 flex gap-6 md:mb-12 md:gap-8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#2d251f]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7d6b5d]">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-[#2d251f]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7d6b5d]">Eco-Friendly</span>
              </div>
            </div>

            {/* Action Area: Quantity & Buttons */}
            <div className="flex flex-col gap-6 md:gap-8">
              
              {/* Quantity Selector */}
              <div>
                <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d6b5d]">
                  Quantity
                </label>
                <div className="inline-flex h-12 items-center gap-4 rounded-full border border-[#d2c5b8] bg-white px-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-1 text-[#7d6b5d] transition hover:text-[#2d251f]"
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-medium text-[#2d251f]">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        product.stock > 0
                          ? Math.min(product.stock, prev + 1)
                          : prev + 1
                      )
                    }
                    className="p-1 text-[#7d6b5d] transition hover:text-[#2d251f]"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded border border-[#2d251f] bg-transparent text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2d251f] transition-all hover:bg-[#2d251f] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded bg-[#2d251f] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#4a3f35] disabled:cursor-not-allowed disabled:bg-[#d2c5b8] disabled:text-[#faf7f2]"
                >
                  <Zap size={16} className="fill-current" />
                  Buy Now
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}