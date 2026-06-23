"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/format";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f7a68]">
          Shopping Bag
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2d251f]">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#6e5d4f]">
          Add products to your cart to continue to checkout.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full bg-[#2d251f] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f]"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f7a68]">
          Shopping Bag
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2d251f]">Your Cart</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-8">
          <div className="space-y-5">
            {cart.map((item) => {
              const itemPrice =
                typeof item.price === "string"
                  ? parseFloat(item.price)
                  : item.price;

              return (
                <div
                  key={item.id}
                  className="grid gap-5 rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm md:grid-cols-[140px_1fr]"
                >
                  <div className="overflow-hidden rounded-[22px] bg-[#f5eee6]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full min-h-[180px] w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[180px] items-center justify-center text-sm text-[#9d8b7b]">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="font-serif text-3xl text-[#2d251f]">
                          {item.name}
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#6e5d4f]">
                          {item.description ||
                            "A premium boutique baby essential selected for softness and comfort."}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
                          Item Total
                        </p>
                        <p className="mt-2 text-xl font-medium text-[#2d251f]">
                          {formatCurrency(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-[#f0e7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
                          Quantity
                        </p>
                        <div className="mt-3 flex items-center rounded-full border border-[#dccdbc] bg-[#faf7f2]">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-5 py-3 text-lg text-[#2d251f]"
                          >
                            -
                          </button>
                          <span className="min-w-12 text-center text-sm text-[#2d251f]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-5 py-3 text-lg text-[#2d251f]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-2 text-sm text-[#7d6b5d] transition hover:text-red-600"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-3xl text-[#2d251f]">
              Order Summary
            </h2>

            <div className="mt-8 space-y-4 border-b border-[#f0e7dc] pb-6 text-sm text-[#6e5d4f]">
              <div className="flex items-center justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Method</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.16em] text-[#8f7a68]">
                Total
              </p>
              <p className="text-2xl font-medium text-[#2d251f]">
                {formatCurrency(subtotal)}
              </p>
            </div>

            <Link
              href="/checkout"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#2d251f] px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f]"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#dccdbc] bg-[#faf7f2] px-6 py-4 text-xs uppercase tracking-[0.2em] text-[#5e4c3d] transition hover:bg-[#f5eee6]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}