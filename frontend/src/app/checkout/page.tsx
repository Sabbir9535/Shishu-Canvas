// src/app/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Hydration error এড়ানোর জন্য
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = cart.reduce((total, item) => {
    const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // API এর জন্য পেলোড তৈরি করা
    const orderData = {
      customer: formData,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: typeof item.price === "string" ? parseFloat(item.price) : item.price
      })),
      totalAmount: subtotal,
      status: "pending"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to place order. Please try again.");
      }

      const data = await res.json();
      
      // অর্ডার সফল হলে কার্ট ক্লিয়ার করে সাকসেস পেজে পাঠানো
      clearCart();
      router.push(`/order-success?orderId=${data.id || 'success'}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6]">
        <h2 className="font-serif text-3xl text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mb-8">Please add items to your cart before checking out.</p>
        <Link href="/" className="text-xs tracking-[0.2em] uppercase border-b border-gray-900 pb-1 hover:text-[#8b5a2b] transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-serif text-4xl text-gray-900 mb-12 tracking-wide text-center md:text-left">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h2 className="font-serif text-2xl mb-6 text-gray-900">Shipping Information</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-2">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none transition-colors" placeholder="e.g. John Doe" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-2">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-2">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#faf9f6] border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none transition-colors" placeholder="+880 1XXX XXXXXX" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-2">Full Address</label>
                    <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full bg-[#faf9f6] border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none transition-colors resize-none" placeholder="House/Apartment, Street, Area, City" />
                  </div>
                </div>
              </div>

              {error && <div className="p-4 bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#1a1a1a] text-white py-5 text-xs tracking-[0.2em] uppercase hover:bg-[#8b5a2b] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 border border-gray-100 shadow-sm sticky top-28">
              <h2 className="font-serif text-2xl mb-8 text-gray-900">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                {cart.map((item) => {
                   const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
                   return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-sm">
                        <h3 className="font-serif text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                        <p className="text-gray-900 mt-1">৳{(price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                   );
                })}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4 text-sm text-gray-600 tracking-wide">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Delivery</span>
                  <span>Free (Promo)</span>
                </div>
                <div className="flex justify-between text-lg text-gray-900 font-medium pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>৳{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}