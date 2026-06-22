// src/app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  // Subtotal ক্যালকুলেট করা
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6]">
        <h2 className="font-serif text-3xl text-gray-900 mb-4">Your Cart is Empty</h2>
        <Link 
          href="/" 
          className="text-xs tracking-[0.2em] uppercase border-b border-gray-900 pb-1 hover:text-[#8b5a2b] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-16 tracking-wide">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-10">
            {cart.map((item) => {
              const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;

              return (
                <div key={item.id} className="flex gap-6 border-b border-gray-200 pb-10">
                  <div className="w-24 h-32 md:w-32 md:h-40 relative flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 tracking-[0.1em] uppercase">Standard Size</p>
                      </div>
                      <p className="text-sm tracking-wide">৳{price.toLocaleString("en-IN")}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-300">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:text-black transition"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-black transition"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-gray-400 tracking-[0.15em] uppercase hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 border border-gray-100 shadow-sm sticky top-24">
              <h2 className="font-serif text-2xl mb-8">Summary</h2>
              
              <div className="space-y-4 mb-8 text-sm text-gray-600 tracking-wide border-b border-gray-100 pb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-lg text-gray-900 mb-8 tracking-wide">
                <span>Total</span>
                <span>৳{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <Link href="/checkout" className="block w-full">
                <button className="w-full bg-[#1a1a1a] text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#8b5a2b] transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}