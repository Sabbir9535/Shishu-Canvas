"use client";

import { useState } from "react";
import Image from "next/image";

// ডেমো গ্যালারি ইমেজের ডাটা (এখানে আপনার আসল প্রোডাক্টের ছবি দেবেন)
const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522771930-78848d92871d?auto=format&fit=crop&w=800&q=80",
    alt: "Premium baby clothing set",
    category: "Clothing",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80",
    alt: "Soft baby shoes",
    category: "Accessories",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    alt: "Wooden baby toys",
    category: "Toys",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    alt: "Organic cotton onesie",
    category: "Clothing",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    alt: "Nursery essentials",
    category: "Nursery",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=800&q=80",
    alt: "Knitted baby blanket",
    category: "Accessories",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    alt: "Baby grooming kit",
    category: "Nursery",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1610809235835-13b0a2bfce08?auto=format&fit=crop&w=800&q=80",
    alt: "Soft plush toys",
    category: "Toys",
  },
];

const categories = ["All", "Clothing", "Toys", "Accessories", "Nursery"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // ক্যাটাগরি অনুযায়ী ছবি ফিল্টার করা
  const filteredItems = galleryItems.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-[#faf7f2] pb-24 pt-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8b735d]">
            Curated Memories
          </p>
          <h1 className="mb-6 font-serif text-4xl leading-tight text-[#2d251f] md:text-5xl lg:text-6xl">
            Our <em className="font-light italic text-[#a48671]">Collection</em> Gallery
          </h1>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-[#7d6b5d] md:text-base">
            Explore our carefully selected range of premium baby outfits, 
            accessories, and essentials. Designed for comfort and captured in their purest moments.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-4 md:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === category
                  ? "border-b border-[#2d251f] pb-1 font-medium text-[#2d251f]"
                  : "border-b border-transparent pb-1 font-light text-[#8b735d] hover:text-[#2d251f]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative mb-6 break-inside-avoid overflow-hidden rounded-[24px] bg-[#f0e8df] shadow-sm transition-all duration-500 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden" style={{ paddingTop: '120%' }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay with Text */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#2d251f]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-6">
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-[#e8dfd3]">
                    {item.category}
                  </p>
                  <p className="font-serif text-lg text-white">
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Fallback */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#2d251f]">
              No items found in this category.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}