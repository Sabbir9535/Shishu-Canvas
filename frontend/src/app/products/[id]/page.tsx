"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetailsPage() {
  const params = useParams();
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

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/5] animate-pulse rounded-[32px] bg-[#eee4d8]" />
          <div className="space-y-5">
            <div className="h-8 w-40 animate-pulse rounded bg-[#eee4d8]" />
            <div className="h-16 w-full animate-pulse rounded bg-[#eee4d8]" />
            <div className="h-28 w-full animate-pulse rounded bg-[#eee4d8]" />
          </div>
        </div>
      </div>
    );
  }

  if (pageError || !product) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20 md:px-8">
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-10 text-center">
          <h2 className="font-serif text-3xl text-red-700">
            Product not found
          </h2>
          <p className="mt-3 text-sm text-red-600">
            {pageError || "We could not load this product."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#2d251f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-[#8b735d] transition hover:text-[#2d251f]"
        >
          ← Back to collection
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left image */}
        <div className="overflow-hidden rounded-[36px] border border-[#eadfce] bg-white p-4 shadow-sm">
          <div className="overflow-hidden rounded-[28px] bg-[#f5eee6]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-[620px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[620px] items-center justify-center text-[#9d8b7b]">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f7a68]">
            Boutique Collection
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-[#2d251f] md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-medium text-[#2d251f]">
            {formatCurrency(product.price)}
          </p>

          <div className="mt-5 inline-flex w-fit rounded-full bg-[#f4ebe1] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#6e5d4f]">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>

          <div className="mt-8 rounded-[28px] border border-[#eadfce] bg-white p-6">
            <h2 className="font-serif text-2xl text-[#2d251f]">
              Product Details
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#6e5d4f]">
              {product.description ||
                "A thoughtfully selected premium product from our boutique baby collection."}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
                Quantity
              </label>
              <div className="mt-3 flex items-center rounded-full border border-[#dccdbc] bg-white">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-5 py-3 text-lg text-[#2d251f]"
                >
                  -
                </button>
                <span className="min-w-12 text-center text-sm text-[#2d251f]">
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
                  className="px-5 py-3 text-lg text-[#2d251f]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="rounded-full bg-[#2d251f] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f] disabled:cursor-not-allowed disabled:bg-[#c7b9ab]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}