import type { Product, Order, OrderStatus } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

/* -------------------------------------------------------
   PRODUCTS
------------------------------------------------------- */

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    console.log("GET /api/products response:", data);

    // case 1: direct array
    if (Array.isArray(data)) {
      return data;
    }

    // case 2: { products: [...] }
    if (Array.isArray(data?.products)) {
      return data.products;
    }

    // case 3: { data: [...] }
    if (Array.isArray(data?.data)) {
      return data.data;
    }

    // case 4: backend ভুল করে single object return করলে array বানিয়ে দাও
    if (data && typeof data === "object" && "id" in data) {
      return [data as Product];
    }

    return [];
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function getProductById(
  id: string | number
): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();

    if (data && typeof data === "object" && "id" in data) {
      return data as Product;
    }

    if (data?.product && typeof data.product === "object") {
      return data.product as Product;
    }

    if (data?.data && typeof data.data === "object") {
      return data.data as Product;
    }

    return null;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}

/* -------------------------------------------------------
   ORDERS
------------------------------------------------------- */

export type CreateOrderPayload = {
  product_id: number;
  customer_name: string;
  phone: string;
  address: string;
  quantity: number;
};

export async function createOrder(payload: CreateOrderPayload) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create order");
  }

  return res.json();
}

export async function getOrders(): Promise<Order[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;
    if (Array.isArray(data?.data)) return data.data;

    return [];
  } catch (error) {
    console.error("getOrders error:", error);
    return [];
  }
}

export async function getOrderById(
  id: string | number
): Promise<Order | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await res.json();

    if (data && typeof data === "object" && "id" in data) {
      return data as Order;
    }

    if (data?.order && typeof data.order === "object") {
      return data.order as Order;
    }

    if (data?.data && typeof data.data === "object") {
      return data.data as Order;
    }

    return null;
  } catch (error) {
    console.error("getOrderById error:", error);
    return null;
  }
}

export async function updateOrderStatus(
  id: string | number,
  status: OrderStatus
) {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update order status");
  }

  return res.json();
}