import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <FeaturedProducts products={products} />
    </main>
  );
}