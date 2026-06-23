export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | string;
  image: string | null;
  stock: number;
  created_at?: string;
};

export type OrderStatus = "pending" | "confirmed" | "delivered";

export type Order = {
  id: number;
  product_id: number;
  customer_name: string;
  phone: string;
  address: string;
  quantity: number;
  status: OrderStatus;
  created_at?: string;
};

export type OrderWithProduct = Order & {
  product?: Product | null;
};

export type CartItem = Product & {
  quantity: number;
};

export type CheckoutFormData = {
  name: string;
  phone: string;
  address: string;
  email?: string;
};

export type CreateOrderPayload = {
  product_id: number;
  customer_name: string;
  phone: string;
  address: string;
  quantity: number;
  status?: OrderStatus;
};