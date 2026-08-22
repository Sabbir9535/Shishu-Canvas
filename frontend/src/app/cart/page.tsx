"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/format";
import { Plus, Minus, X, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());

  // --- Empty Cart State ---
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#faf7f2] px-5 pt-[120px] text-center md:pt-[140px]">
        <ShoppingBag size={42} strokeWidth={1} className="mb-6 text-[#2d251f]" />
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#7d6b5d]">
          Your Bag
        </p>
        <h1 className="mt-4 font-serif text-3xl text-[#2d251f] md:text-5xl">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#7d6b5d] md:text-base">
          Looks like you haven't added anything yet. Explore our latest collections.
        </p>
        <Link
          href="/products"
          className="group mt-10 inline-flex items-center gap-3 bg-[#2d251f] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#4a3f35]"
        >
          Continue Shopping
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  // --- Active Cart State ---
  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 pb-20 pt-[110px] md:px-8 md:pt-[150px]">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 border-b border-[#e8dfd3] pb-6 md:mb-12 md:pb-8">
          <h1 className="font-serif text-3xl text-[#2d251f] md:text-5xl">Shopping Bag</h1>
          <p className="mt-2 text-sm text-[#7d6b5d]">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          
          {/* Left: Cart Items List */}
          <div className="flex-1 w-full">
            <div className="flex flex-col">
              {cart.map((item) => {
                const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-[#e8dfd3] py-5 md:gap-6 md:py-8"
                  >
                    {/* Image - Mobile এ ফিক্সড সাইজ এবং সঠিক প্রপোশন */}
                    <Link href={`/products/${item.id}`} className="block shrink-0 group">
                      <div className="relative h-[100px] w-[80px] overflow-hidden bg-[#f5eee6] sm:h-[140px] sm:w-[110px] md:h-[180px] md:w-[140px]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-[#9d8b7b]">
                            No image
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Details & Actions */}
                    <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
                      
                      {/* Top section: Title, Price & Mobile Remove */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          {/* line-clamp-1 দিয়ে মোবাইলে টাইটেল এক লাইনে ছোট করে রাখা হয়েছে */}
                          <Link href={`/products/${item.id}`} className="max-w-[200px] sm:max-w-md">
                            <h2 className="font-serif text-base line-clamp-1 text-[#2d251f] transition hover:text-[#7d6b5d] sm:text-xl md:text-2xl">
                              {item.name}
                            </h2>
                          </Link>
                          
                          {/* Mobile Remove Cross Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#7d6b5d] transition hover:text-red-600 md:hidden"
                            aria-label="Remove item"
                          >
                            <X size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <p className="mt-1 text-sm font-medium text-[#2d251f] sm:text-base md:text-lg">
                          {formatCurrency(itemPrice)}
                        </p>
                      </div>

                      {/* Bottom section: Quantity Selector & Desktop Remove */}
                      <div className="flex items-center justify-between">
                        
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3 rounded-full border border-[#d2c5b8] px-3 py-1 sm:px-4 sm:py-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-[#7d6b5d] transition hover:text-[#2d251f]"
                          >
                            <Minus size={13} strokeWidth={1.5} />
                          </button>
                          <span className="min-w-[1.2rem] text-center text-xs font-medium text-[#2d251f] sm:text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[#7d6b5d] transition hover:text-[#2d251f]"
                          >
                            <Plus size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Desktop Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hidden text-[11px] font-semibold uppercase tracking-widest text-[#7d6b5d] underline underline-offset-4 transition hover:text-red-600 md:block"
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full shrink-0 lg:sticky lg:top-[140px] lg:w-[400px]">
            <div className="bg-white p-6 md:p-8 lg:border lg:border-[#e8dfd3]">
              <h2 className="font-serif text-xl text-[#2d251f] md:text-2xl">Order Summary</h2>

              <div className="mt-6 space-y-4 border-b border-[#e8dfd3] pb-6 text-sm text-[#7d6b5d]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2d251f]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="text-right text-[#2d251f]">Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2d251f] md:text-xs">
                  Estimated Total
                </p>
                <p className="font-serif text-2xl text-[#2d251f] md:text-3xl">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <Link
                href="/checkout"
                className="group mt-8 flex w-full items-center justify-center gap-2 bg-[#2d251f] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#4a3f35]"
              >
                Checkout
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <div className="mt-6 text-center lg:hidden">
                 <Link href="/products" className="text-xs font-medium uppercase tracking-widest text-[#7d6b5d] underline underline-offset-4 transition hover:text-[#2d251f]">
                    Continue Shopping
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}