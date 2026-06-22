// types/index.ts
export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: string | number;
  image: string;
  stock?: number;
  created_at?: string;
}