export default function TrustBar() {
  const trustItems = [
    { icon: "🚚", title: "Free Delivery", desc: "On all orders above ৳1500" },
    { icon: "🌿", title: "Skin-Safe Fabrics", desc: "Certified gentle for newborns" },
    { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 7-day return policy" },
    { icon: "🏅", title: "Premium Quality", desc: "Curated luxury baby wear" },
  ];

  return (
    <div className="bg-cream border-y border-gold/20 py-12 px-6 md:px-18">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        {trustItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center text-center gap-3 px-6 ${
              index !== trustItems.length - 1 ? 'lg:border-r border-gold/20' : ''
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="font-serif text-[17px] font-normal text-charcoal">
              {item.title}
            </span>
            <span className="text-xs text-muted font-light leading-relaxed">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}