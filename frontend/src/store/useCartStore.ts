"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: quantity < 1 ? 1 : quantity }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      getSubtotal: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => {
          const price =
            typeof item.price === "string"
              ? parseFloat(item.price)
              : item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "shishu-canvas-cart",
    }
  )
);