"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  // TypeScript-ke explicitly bole dicchi je eta Framer Motion er 'Variants' type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

  return (
    <section className="min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative">
      
      {/* --- Left Content Area --- */}
      <motion.div 
        className="bg-cream flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 relative border-r border-gold-light/20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
          <div className="w-8 h-px bg-gold"></div> {/* h-[1px] fixed to h-px */}
          <span className="text-[10px] font-normal tracking-[0.3em] uppercase text-gold">
            New Collection 2025
          </span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-charcoal mb-7">
            Dressed for<br />
            <em className="italic text-rose-dark">Little Wonders</em>
          </h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-sm font-light leading-relaxed text-muted max-w-90 mb-12" /* max-w-[360px] fixed to max-w-90 */
        >
          Handpicked baby dresses crafted with the finest fabrics — gentle on tender skin, beautiful in every moment.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
          <Link 
            href="#featured" 
            className="bg-charcoal text-ivory border-none px-9 py-4 font-sans text-[11px] tracking-[0.22em] uppercase font-normal hover:bg-rose-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-dark/30 transition-all duration-300 inline-block"
          >
            Shop Collection
          </Link>
          <button className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted hover:text-charcoal transition-colors duration-300 group">
            View Lookbook
            <svg 
              width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* --- Right Image/Visual Area --- */}
      <div className="bg-rose-light relative overflow-hidden flex items-center justify-center min-h-125 lg:min-h-full"> {/* min-h-[500px] fixed to min-h-125 */}
        {/* Soft Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(191,160,122,0.25)_0%,transparent_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-[72%] max-w-95 aspect-3/4 relative z-10" /* Tailwind v4 syntax fixes */
        >
          <div className="w-full h-full bg-linear-to-br from-white/50 to-rose/30 border border-white/70 flex flex-col items-center justify-center gap-4 shadow-xl">
            <span className="text-7xl opacity-60">👗</span>
            <p className="text-[11px] tracking-[0.2em] uppercase text-rose-dark font-light">
              New Arrivals
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, rotate: -20, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 1 }}
            className="absolute -bottom-5 -right-5 w-24 h-24 bg-charcoal rounded-full flex flex-col items-center justify-center gap-0.5 z-20 shadow-2xl"
          >
            <span className="font-serif text-[28px] font-normal text-gold-light leading-none">
              30+
            </span>
            <span className="text-[8px] tracking-[0.15em] text-rose-light uppercase mt-1">
              Styles
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Fixed 'flex' and 'hidden' conflict */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20 hidden lg:flex">
          <motion.div 
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-linear-to-b from-gold to-transparent origin-top"
          ></motion.div>
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
        </div>
      </div>

    </section>
  );
}