"use client"; // Eta client-side interactions (jemon onClick) enable kore

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-ivory/95 backdrop-blur-md border-b border-gold/20 px-6 md:px-12 h-[72px] flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex flex-col items-start gap-[1px]">
          <span className="font-serif text-[22px] font-normal tracking-[0.08em] text-charcoal">
            Petite Lumière
          </span>
          <span className="text-[9px] font-light tracking-[0.28em] text-gold uppercase">
            Baby Boutique
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-9 list-none">
          {["Home", "Shop", "About Us", "Contact"].map((item) => (
            <li key={item}>
              <Link 
                href="#" 
                className="text-[11px] font-light tracking-[0.2em] uppercase text-muted transition-colors duration-300 relative group hover:text-charcoal"
              >
                {item}
                <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-rose transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex gap-6 items-center">
          {/* Search Button */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search" 
            className="text-muted hover:text-charcoal transition-colors duration-300"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Account Button */}
          <Link href="/account" title="Account" className="text-muted hover:text-charcoal transition-colors duration-300 hidden sm:block">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            title="Cart" 
            className="relative text-muted hover:text-charcoal transition-colors duration-300"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose text-white text-[9px] flex items-center justify-center font-medium">
              2
            </span>
          </button>
        </div>
      </nav>

      {/* --- Search Bar Overlay --- */}
      {isSearchOpen && (
        <div className="fixed top-[72px] left-0 w-full bg-cream border-b border-gold/20 p-4 z-[90] flex justify-center shadow-sm animate-in slide-in-from-top-2">
          <input 
            type="text" 
            placeholder="Search for little wonders..." 
            className="w-full max-w-2xl bg-white border border-gold/30 rounded-full px-6 py-2 text-sm text-charcoal outline-none focus:border-rose transition-colors"
          />
        </div>
      )}

      {/* --- Cart Sidebar Overlay --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="relative w-full max-w-md bg-ivory h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center border-b border-gold/20 pb-4">
              <h2 className="font-serif text-2xl text-charcoal">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center text-muted text-sm">
              <p>Your cart is currently empty.</p>
            </div>
            
            <div className="pt-4 border-t border-gold/20">
              <button className="w-full bg-charcoal text-ivory py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-rose-dark transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}