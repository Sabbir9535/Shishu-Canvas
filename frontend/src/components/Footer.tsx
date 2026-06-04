import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 px-6 md:px-18 pb-10">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 lg:gap-16 pb-16 border-b border-gold-light/15">
        
        {/* Brand Info */}
        <div>
          <span className="font-serif text-[26px] font-normal text-ivory tracking-[0.06em] block mb-1">
            Petite Lumière
          </span>
          <span className="text-[9px] tracking-[0.3em] text-gold uppercase block mb-5">
            Baby Boutique
          </span>
          <p className="text-[13px] text-ivory/45 font-light leading-[1.8] max-w-[260px] mb-7">
            Luxury baby dresses crafted with love, designed for your little light. Premium quality, gentle fabrics, timeless style.
          </p>
          <div className="flex gap-3">
            {["f", "in", "W"].map((icon, i) => (
              <button 
                key={i}
                className="w-9 h-9 border border-gold-light/25 bg-transparent text-gold-light text-sm flex items-center justify-center transition-all duration-300 hover:bg-gold hover:text-charcoal hover:border-gold cursor-pointer"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {[
          { title: "Shop", links: ["New Arrivals", "Frocks & Gowns", "Party Wear", "Casual Wear", "Sale"] },
          { title: "Information", links: ["About Us", "Size Guide", "Care Instructions", "Blog"] },
          { title: "Support", links: ["Contact Us", "Returns & Refunds", "Shipping Policy", "FAQ"] }
        ].map((col, idx) => (
          <div key={idx}>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold mb-6 font-normal">
              {col.title}
            </h4>
            <ul className="list-none flex flex-col gap-3">
              {col.links.map((link, i) => (
                <li key={i}>
                  <Link 
                    href="#" 
                    className="text-[13px] font-light text-ivory/50 transition-colors duration-300 tracking-[0.02em] hover:text-ivory"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-ivory/30 tracking-[0.08em] text-center md:text-left">
          © 2026 Petite Lumière Baby Boutique. All rights reserved.
        </p>
        <div className="flex gap-2">
          {["bKash", "Nagad", "COD"].map((method, i) => (
            <span 
              key={i}
              className="bg-white/[0.07] border border-white/10 px-2.5 py-1 text-[10px] text-ivory/40 tracking-[0.05em] uppercase"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}