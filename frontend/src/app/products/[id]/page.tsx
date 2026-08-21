"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, ShoppingBag, Zap, ShieldCheck, Leaf } from "lucide-react";

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

  // 1. Loading State (Dark Theme Skeleton)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121517] px-6 py-32 md:px-12">
        <div className="mx-auto grid max-w-360 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="aspect-4/5 animate-pulse rounded-t-full rounded-b-[40px] bg-white/5 lg:col-span-5" />
          <div className="space-y-6 pt-10 lg:col-span-7">
            <div className="h-6 w-32 animate-pulse rounded bg-white/5" />
            <div className="h-16 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-8 w-40 animate-pulse rounded bg-white/5" />
            <div className="mt-12 h-32 w-full animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (pageError || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121517] px-6 py-20">
        <div className="rounded-3xl border border-red-900/30 bg-red-950/20 px-8 py-16 text-center backdrop-blur-md">
          <h2 className="font-serif text-3xl text-white">Product not found</h2>
          <p className="mt-4 text-sm font-light text-white/60">
            {pageError || "We could not load this product. It may have been removed."}
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // 3. Main Product Page
  return (
    <div className="min-h-screen bg-[#121517] px-6 pb-24 pt-32 md:px-12">
      <div className="mx-auto max-w-360">
        
        {/* Back Button */}
        <div className="mb-12">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          
          {/* Left Column: Product Image (Arch Style to match Hero) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-full rounded-b-[40px] border-8 border-white/5 bg-[#1a1f24] shadow-2xl">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[11px] font-light uppercase tracking-widest text-white/40">
                  No image available
                </div>
              )}
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent mix-blend-multiply"></div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-center py-6 lg:col-span-7">
            
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#BFA07A]">
              Premium Collection
            </p>

            <h1 className="mb-6 font-serif text-4xl leading-[1.1] text-white md:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mb-8 flex items-end gap-6 border-b border-white/10 pb-8">
              <p className="text-3xl font-medium text-white">
                {formatCurrency(product.price)}
              </p>
              <div className="mb-1 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/80">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="max-w-2xl text-[14px] font-light leading-[1.9] text-white/70">
                {product.description ||
                  "A thoughtfully selected premium product from our boutique baby collection. Crafted with the utmost care to provide absolute comfort and timeless style for your little one."}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mb-12 flex gap-8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#BFA07A]" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/60">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-[#BFA07A]" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/60">Skin Safe</span>
              </div>
            </div>

            {/* Action Area: Quantity & Buttons */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              
              {/* Quantity Selector */}
              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Quantity
                </label>
                <div className="flex h-14 items-center rounded-full border border-white/20 bg-white/5 px-2">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="flex h-10 w-10 items-center justify-center text-lg text-white/80 transition-colors hover:text-white"
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center text-[13px] font-medium text-white">
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
                    className="flex h-10 w-10 items-center justify-center text-lg text-white/80 transition-colors hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#BFA07A] hover:text-white disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
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