interface ProductCardProps {
  name: string;
  price: number;
  sizes: string;
  emoji: string;
  badge?: string;
  rating: number;
}

export default function ProductCard({ name, price, sizes, emoji, badge, rating }: ProductCardProps) {
  // Rating hishab kore star render korar function
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
  };

  return (
    <div className="group cursor-pointer">
      {/* Image/Emoji Area with Hover Effect */}
      <div className="aspect-3/4 bg-cream relative overflow-hidden mb-5">
        <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
          {emoji}
        </div>
        
        {badge && (
          <span className="absolute top-4 left-4 bg-rose-dark text-white text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 z-10">
            {badge}
          </span>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-transparent transition-colors duration-400 group-hover:bg-charcoal/10 flex items-end p-6">
          <button className="w-full bg-ivory text-charcoal border-none py-3 font-sans text-[10px] tracking-[0.2em] uppercase cursor-pointer translate-y-4 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-rose hover:text-white">
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <h3 className="font-serif text-lg font-normal text-charcoal mb-1.5 tracking-wide">
          {name}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-muted tracking-[0.1em]">
            Sizes: {sizes}
          </span>
          <span className="text-[15px] font-normal text-charcoal tracking-wide">
            <span className="text-[11px] text-muted mr-0.5">৳</span>
            {price.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="text-gold text-[11px] tracking-[0.15em]">
          {renderStars()}
        </div>
      </div>
    </div>
  );
}