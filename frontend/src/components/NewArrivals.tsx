export default function NewArrivals() {
  return (
    <section className="bg-charcoal relative overflow-hidden py-24 px-6 md:px-18">
      
      {/* Background Giant "NEW" Text (Decorative) */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 font-serif text-[160px] font-light text-white/[0.03] whitespace-nowrap tracking-[0.1em] pointer-events-none select-none">
        NEW
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-px bg-gold-light"></div>
          <span className="text-[10px] tracking-[0.32em] uppercase text-gold-light">
            Just In
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-ivory mb-4">
          New <em className="italic text-rose-light">Arrivals</em>
        </h2>
        <p className="text-sm font-light leading-relaxed text-ivory/50 max-w-[420px]">
          Fresh styles added every week — be the first to dress your little one in our latest.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-16 relative z-10">
        
        {/* Left: Asymmetric Showcase Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tall Item (Spans 2 rows) */}
          <div className="row-span-2 bg-white/5 border border-gold-light/15 py-12 px-6 flex flex-col items-center justify-center gap-3 transition-all duration-400 hover:bg-rose-dark/10 hover:border-rose-dark/40 hover:-translate-y-1 cursor-pointer group">
            <span className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-500">🌼</span>
            <span className="text-[9px] tracking-[0.22em] uppercase text-rose-light bg-rose-dark/20 px-2 py-1">Just Arrived</span>
            <span className="font-serif text-base font-normal text-ivory text-center tracking-wide">Daisy Lace Gown</span>
            <span className="text-[13px] text-gold-light tracking-wider">৳ 1,650</span>
          </div>
          
          {/* Normal Item 1 */}
          <div className="bg-white/5 border border-gold-light/15 py-10 px-6 flex flex-col items-center justify-center gap-3 transition-all duration-400 hover:bg-rose-dark/10 hover:border-rose-dark/40 hover:-translate-y-1 cursor-pointer group">
            <span className="text-4xl mb-1 group-hover:scale-110 transition-transform duration-500">🎀</span>
            <span className="text-[9px] tracking-[0.22em] uppercase text-rose-light bg-rose-dark/20 px-2 py-1">New</span>
            <span className="font-serif text-base font-normal text-ivory text-center tracking-wide">Bow Tulle Frock</span>
            <span className="text-[13px] text-gold-light tracking-wider">৳ 1,190</span>
          </div>

          {/* Normal Item 2 */}
          <div className="bg-white/5 border border-gold-light/15 py-10 px-6 flex flex-col items-center justify-center gap-3 transition-all duration-400 hover:bg-rose-dark/10 hover:border-rose-dark/40 hover:-translate-y-1 cursor-pointer group">
            <span className="text-4xl mb-1 group-hover:scale-110 transition-transform duration-500">🌺</span>
            <span className="text-[9px] tracking-[0.22em] uppercase text-rose-light bg-rose-dark/20 px-2 py-1">New</span>
            <span className="font-serif text-base font-normal text-ivory text-center tracking-wide">Hibiscus Romper</span>
            <span className="text-[13px] text-gold-light tracking-wider">৳ 980</span>
          </div>
        </div>

        {/* Right: Text Content & CTA */}
        <div>
          <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory leading-tight mb-5">
            New styles, <em className="italic text-gold-light">every week</em> for your little star
          </h3>
          <p className="text-sm font-light text-ivory/55 leading-[1.9] mb-10 max-w-95">
            We constantly refresh our collection so your baby always has something fresh, beautiful, and uniquely crafted for their tender age. Premium fabric, perfect stitching — every time.
          </p>
          <button className="border border-gold-light/50 text-gold-light bg-transparent px-8 py-3.5 font-sans text-[11px] tracking-[0.22em] uppercase transition-all duration-300 hover:bg-gold hover:text-charcoal hover:border-gold cursor-pointer">
            Shop New Arrivals
          </button>
        </div>

      </div>
    </section>
  );
}