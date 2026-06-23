import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#f8f1e8]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
        {/* Left */}
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7a68]">
            Shishu Canvas
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-[#2d251f] md:text-6xl lg:text-7xl">
            Soft, timeless essentials for your little one.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5d4f] md:text-lg">
            Discover premium baby outfits, accessories, and curated essentials
            designed for comfort, softness, and a beautifully elevated everyday.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#featured-products"
              className="rounded-full bg-[#2d251f] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f]"
            >
              Shop Collection
            </Link>

            <Link
              href="/cart"
              className="rounded-full border border-[#d8c9b9] bg-white px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#4e4034] transition hover:bg-[#f4ece2]"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-[#e4d8ca] pt-8">
            <div>
              <p className="font-serif text-3xl text-[#2d251f]">100%</p>
              <p className="mt-1 text-sm text-[#7d6b5d]">Soft comfort focus</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#2d251f]">COD</p>
              <p className="mt-1 text-sm text-[#7d6b5d]">Cash on delivery</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#2d251f]">Curated</p>
              <p className="mt-1 text-sm text-[#7d6b5d]">Boutique quality</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[36px] bg-white p-4 shadow-xl">
            <div className="overflow-hidden rounded-[28px] bg-[#efe4d7]">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80"
                alt="Baby collection hero"
                className="h-[540px] w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 rounded-[24px] border border-[#eadfce] bg-white px-5 py-4 shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f7a68]">
              Featured Edit
            </p>
            <p className="mt-2 font-serif text-2xl text-[#2d251f]">
              New Arrival Collection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}