"use client";

import { useEffect, useMemo, useState } from "react";
import { getOrders, getProducts, updateOrderStatus } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Order, OrderStatus, Product } from "@/types";

type OrderWithProduct = Order & {
  product?: Product | null;
};

const statusOptions: OrderStatus[] = ["pending", "confirmed", "delivered"];

/**
 * API response যাই আসুক, array safely বের করে আনে
 */
function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value;

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;

    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.products)) return obj.products as T[];
    if (Array.isArray(obj.orders)) return obj.orders as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (Array.isArray(obj.rows)) return obj.rows as T[];
  }

  return [];
}

function normalizePrice(price: unknown): number {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const parsed = parseFloat(price);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function normalizeStock(stock: unknown): number {
  if (typeof stock === "number") return stock;
  if (typeof stock === "string") {
    const parsed = parseInt(stock, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        setPageError("");

        const [productsResponse, ordersResponse] = await Promise.all([
          getProducts(),
          getOrders(),
        ]);

        const productsData = ensureArray<Product>(productsResponse);
        const ordersData = ensureArray<Order>(ordersResponse);

        const safeProducts: Product[] = productsData.map((product) => ({
          ...product,
          price: normalizePrice(product.price),
          stock: normalizeStock(product.stock),
        }));

        const productMap = new Map<number, Product>(
          safeProducts.map((product) => [product.id, product])
        );

        const mergedOrders: OrderWithProduct[] = ordersData.map((order) => ({
          ...order,
          product: productMap.get(order.product_id) || null,
        }));

        setProducts(safeProducts);
        setOrders(mergedOrders);
      } catch (err) {
        console.error("Admin page load error:", err);

        const message =
          err instanceof Error ? err.message : "Failed to load admin data.";

        setPageError(message);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;

    const confirmedOrders = orders.filter(
      (order) => order.status === "confirmed"
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    const totalRevenue = orders.reduce((sum, order) => {
      const productPrice = normalizePrice(order.product?.price);
      return sum + productPrice * order.quantity;
    }, 0);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      totalRevenue,
    };
  }, [products, orders]);

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      setUpdatingOrderId(orderId);

      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to update order status."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
        <div className="space-y-6">
          <div className="h-12 w-56 animate-pulse rounded bg-[#eee4d8]" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-[28px] bg-[#eee4d8]"
              />
            ))}
          </div>
          <div className="h-[420px] animate-pulse rounded-[32px] bg-[#eee4d8]" />
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-10">
          <h2 className="font-serif text-3xl text-red-700">
            Failed to load admin panel
          </h2>
          <p className="mt-3 text-sm text-red-600">{pageError}</p>
          <p className="mt-2 text-sm text-red-600">
            Make sure your backend is running and the API base URL is correct.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f7a68]">
          Order Management
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2d251f]">
          Admin Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Products" value={String(stats.totalProducts)} />
        <StatCard label="Total Orders" value={String(stats.totalOrders)} />
        <StatCard label="Pending" value={String(stats.pendingOrders)} />
        <StatCard label="Confirmed" value={String(stats.confirmedOrders)} />
        <StatCard label="Delivered" value={String(stats.deliveredOrders)} />
      </div>

      <div className="mt-5">
        <div className="rounded-[28px] border border-[#eadfce] bg-white p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
            Revenue Snapshot
          </p>
          <p className="mt-3 font-serif text-4xl text-[#2d251f]">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <p className="mt-2 text-sm text-[#6e5d4f]">
            Estimated from ordered product price × quantity.
          </p>
        </div>
      </div>

      {/* Products */}
      <section className="mt-10 rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8f7a68]">
              Catalog
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d251f]">
              Products
            </h2>
          </div>
          <p className="text-sm text-[#6e5d4f]">
            {products.length} product{products.length !== 1 ? "s" : ""} in the
            store
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#dccdbc] bg-[#fffdfa] px-6 py-12 text-center">
            <h3 className="font-serif text-3xl text-[#2d251f]">
              No products found
            </h3>
            <p className="mt-3 text-sm text-[#6e5d4f]">
              Your products will appear here once the backend returns product
              data.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="rounded-2xl bg-[#fffdfa]">
                    <td className="rounded-l-2xl border-y border-l border-[#f0e7dc] px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-14 overflow-hidden rounded-2xl bg-[#f5eee6]">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-serif text-2xl leading-tight text-[#2d251f]">
                            {product.name}
                          </p>
                          <p className="mt-1 line-clamp-1 text-sm text-[#6e5d4f]">
                            {product.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-y border-[#f0e7dc] px-4 py-4 text-sm text-[#2d251f]">
                      {formatCurrency(normalizePrice(product.price))}
                    </td>
                    <td className="border-y border-[#f0e7dc] px-4 py-4 text-sm text-[#2d251f]">
                      {normalizeStock(product.stock)}
                    </td>
                    <td className="rounded-r-2xl border-y border-r border-[#f0e7dc] px-4 py-4 text-sm text-[#6e5d4f]">
                      {formatDate(product.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Orders */}
      <section className="mt-10 rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8f7a68]">
              Fulfillment
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#2d251f]">
              Orders
            </h2>
          </div>
          <p className="text-sm text-[#6e5d4f]">
            Manage order status directly from the dashboard
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#dccdbc] bg-[#fffdfa] px-6 py-12 text-center">
            <h3 className="font-serif text-3xl text-[#2d251f]">
              No orders yet
            </h3>
            <p className="mt-3 text-sm text-[#6e5d4f]">
              Customer orders will appear here once checkout is completed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
                  <th className="pb-2">Order</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="rounded-2xl bg-[#fffdfa]">
                    <td className="rounded-l-2xl border-y border-l border-[#f0e7dc] px-4 py-4">
                      <div>
                        <p className="font-medium text-[#2d251f]">
                          Order #{order.id}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#8f7a68]">
                          Product ID: {order.product_id}
                        </p>
                      </div>
                    </td>

                    <td className="border-y border-[#f0e7dc] px-4 py-4">
                      <p className="font-medium text-[#2d251f]">
                        {order.customer_name}
                      </p>
                      <p className="mt-1 text-sm text-[#6e5d4f]">
                        {order.phone}
                      </p>
                      <p className="mt-1 max-w-[240px] text-sm text-[#6e5d4f]">
                        {order.address}
                      </p>
                    </td>

                    <td className="border-y border-[#f0e7dc] px-4 py-4">
                      <p className="font-medium text-[#2d251f]">
                        {order.product?.name || `Product #${order.product_id}`}
                      </p>
                      <p className="mt-1 text-sm text-[#6e5d4f]">
                        {order.product
                          ? formatCurrency(normalizePrice(order.product.price))
                          : "Price unavailable"}
                      </p>
                    </td>

                    <td className="border-y border-[#f0e7dc] px-4 py-4 text-sm text-[#2d251f]">
                      {order.quantity}
                    </td>

                    <td className="border-y border-[#f0e7dc] px-4 py-4">
                      <select
                        value={order.status}
                        disabled={updatingOrderId === order.id}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="rounded-full border border-[#dccdbc] bg-[#faf7f2] px-4 py-2 text-sm text-[#2d251f] outline-none"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="rounded-r-2xl border-y border-r border-[#f0e7dc] px-4 py-4 text-sm text-[#6e5d4f]">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#eadfce] bg-white p-6 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
        {label}
      </p>
      <p className="mt-4 font-serif text-4xl text-[#2d251f]">{value}</p>
    </div>
  );
}