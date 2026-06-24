"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { createOrder } from "@/lib/api";
import type { CheckoutFormData } from "@/types";
import { formatCurrency } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Full name is required.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!formData.address.trim()) return "Address is required.";
    if (cart.length === 0) return "Your cart is empty.";
    return "";
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      /**
       * IMPORTANT:
       * তোমার DB schema অনুযায়ী orders table এ single row = single product order
       * তাই cart এর প্রতিটা item এর জন্য আলাদা POST /api/orders যাবে
       */
      await Promise.all(
        cart.map((item) =>
          createOrder({
            product_id: item.id,
            customer_name: formData.name,
            phone: formData.phone,
            address: formData.address,
            quantity: item.quantity,

          })
        )
      );

      clearCart();

      router.push(
        `/order-success?success=1&items=${totalItems}&amount=${subtotal}`
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f7a68]">
          Checkout
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2d251f]">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#6e5d4f]">
          Add products to your cart before proceeding to checkout.
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
          Secure Checkout
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2d251f]">Checkout</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* LEFT: FORM */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping */}
            <div className="rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-3xl text-[#2d251f]">
                Shipping Information
              </h2>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#8f7a68]">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sabbir Hossen"
                    className="w-full rounded-2xl border border-[#e5d9cc] bg-[#faf7f2] px-4 py-4 text-sm text-[#2d251f] outline-none transition focus:border-[#b89c80]"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#8f7a68]">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full rounded-2xl border border-[#e5d9cc] bg-[#faf7f2] px-4 py-4 text-sm text-[#2d251f] outline-none transition focus:border-[#b89c80]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#8f7a68]">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder="hello@example.com"
                      className="w-full rounded-2xl border border-[#e5d9cc] bg-[#faf7f2] px-4 py-4 text-sm text-[#2d251f] outline-none transition focus:border-[#b89c80]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#8f7a68]">
                    Full Address
                  </label>
                  <textarea
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="House/Apartment, Road, Area, City"
                    className="w-full resize-none rounded-2xl border border-[#e5d9cc] bg-[#faf7f2] px-4 py-4 text-sm text-[#2d251f] outline-none transition focus:border-[#b89c80]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-3xl text-[#2d251f]">
                Payment Method
              </h2>

              <div className="mt-6 rounded-[24px] border border-[#e7dccf] bg-[#faf7f2] p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#2d251f]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#2d251f]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#2d251f]">
                      Cash on Delivery
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#6e5d4f]">
                      Pay in cash when your order is delivered to your address.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#2d251f] px-7 py-5 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Processing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-3xl text-[#2d251f]">
              Order Summary
            </h2>

            <div className="mt-8 max-h-[420px] space-y-5 overflow-y-auto pr-1">
              {cart.map((item) => {
                const price =
                  typeof item.price === "string"
                    ? parseFloat(item.price)
                    : item.price;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-[22px] border border-[#f1e8de] bg-[#fffdfa] p-3"
                  >
                    <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f5eee6]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-xl leading-tight text-[#2d251f]">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#8f7a68]">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#2d251f]">
                        {formatCurrency(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-4 border-t border-[#f0e7dc] pt-6 text-sm text-[#6e5d4f]">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Payment</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#f0e7dc] pt-6">
              <p className="text-sm uppercase tracking-[0.16em] text-[#8f7a68]">
                Total
              </p>
              <p className="text-2xl font-medium text-[#2d251f]">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}