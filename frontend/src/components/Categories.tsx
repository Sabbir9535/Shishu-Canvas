export default function Categories() {
  const categories = [
    { emoji: "👶", name: "Newborn", count: "0 – 3 Months" },
    { emoji: "🌸", name: "Frocks", count: "All Seasons" },
    { emoji: "🎀", name: "Party Wear", count: "Special Occasions" },
    { emoji: "🌙", name: "Casual Wear", count: "Everyday Comfort" },
  ];

  return (
    <section className="bg-cream py-24 px-6 md:px-18">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-px bg-gold"></div>
        <span className="text-[10px] tracking-[0.32em] uppercase text-gold">
          Browse By
        </span>
      </div>
      <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-charcoal mb-16">
        Shop by <em className="italic text-rose-dark">Category</em>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, index) => (
          <div 
            key={index}
            className="group bg-ivory border border-gold/20 pt-10 px-6 pb-8 text-center cursor-pointer transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(44,36,32,0.1)] relative overflow-hidden"
          >
            {/* Hover Bottom Border Line Animation */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose scale-x-0 origin-center transition-transform duration-350 ease-out group-hover:scale-x-100"></div>
            
            <span className="block text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {cat.emoji}
            </span>
            <div className="font-serif text-lg font-normal text-charcoal mb-1.5">
              {cat.name}
            </div>
            <div className="text-[11px] text-muted tracking-[0.1em]">
              {cat.count}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}