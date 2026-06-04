import Link from "next/link";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  // Future-e ei data API ba Database theke ashbe
  const featuredData = [
    {
      id: 1,
      name: "Rosette Bloom Frock",
      price: 1290,
      sizes: "0–6M · 6–12M · 1–2Y",
      emoji: "🎀",
      badge: "Bestseller",
      rating: 5
    },
    {
      id: 2,
      name: "Petal Smock Dress",
      price: 1150,
      sizes: "0–6M · 6–12M",
      emoji: "🌸",
      rating: 5
    },
    {
      id: 3,
      name: "Tulip Ruffle Gown",
      price: 1490,
      sizes: "1–2Y · 2–3Y",
      emoji: "🌷",
      badge: "New",
      rating: 4
    }
  ];

  return (
    <section className="bg-ivory py-24 px-6 md:px-18" id="featured">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px bg-gold"></div>
            <span className="text-[10px] tracking-[0.32em] uppercase text-gold">
              Our Collection
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-charcoal mb-4">
            Featured <em className="italic text-rose-dark">Dresses</em>
          </h2>
          <p className="text-sm font-light leading-relaxed text-muted max-w-[420px]">
            Each piece thoughtfully chosen for comfort, quality, and timeless charm.
          </p>
        </div>
        <div className="md:text-right">
          <Link 
            href="#" 
            className="text-[11px] tracking-[0.2em] uppercase text-rose-dark no-underline border-b border-rose-light pb-0.5 transition-colors duration-300 hover:border-rose-dark"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredData.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            sizes={product.sizes}
            emoji={product.emoji}
            badge={product.badge}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
}