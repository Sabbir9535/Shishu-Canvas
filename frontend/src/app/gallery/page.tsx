"use client";

import { useState } from "react";
import Image from "next/image";

// ডেমো গ্যালারি ইমেজের ডাটা (এখানে আপনার আসল প্রোডাক্টের ছবি দেবেন)
export const galleryItems = [
  {
    id: 1,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396527/Produts-10_202608192220_ceysnu.jpg",
    alt: "Premium baby clothing set",
    category: "baby-keeper",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396526/Produts-3_202608192219_ujil5y.jpg",
    alt: "Soft baby shoes",
    category: "baby-keeper",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396527/Produts-7_202608192219_q4oy4x.jpg",
    alt: "Wooden baby toys",
    category: "baby-keeper",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396527/Produts-8_202608192219_miaafg.jpg",
    alt: "Organic cotton onesie",
    category: "baby-keeper",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396527/Produts-9_202608192219_umtnne.jpg",
    alt: "Nursery essentials",
    category: "baby-keeper",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396525/produts-2_202608192219_rn4inj.jpg",
    alt: "Knitted baby blanket",
    category: "baby-keeper",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396720/bibs-2_imnd5n.jpg",
    alt: "Premium baby bibs design 2",
    category: "bibs",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396721/bibs-1_s8gtqu.jpg",
    alt: "Premium baby bibs design 1",
    category: "bibs",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396721/bibs-5_miw1jb.jpg",
    alt: "Premium baby bibs design 5",
    category: "bibs",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396721/bibs-4_crbllz.jpg",
    alt: "Premium baby bibs design 4",
    category: "bibs",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396722/bibs-6_huymun.jpg",
    alt: "Premium baby bibs design 6",
    category: "bibs",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396722/bibs-10_opcstm.jpg",
    alt: "Premium baby bibs design 10",
    category: "bibs",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396722/bibs-9_af5xju.jpg",
    alt: "Premium baby bibs design 9",
    category: "bibs",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/djun95ruc/image/upload/v1787396722/bibs-8_e2ab5o.jpg", // .jpg.jpg ফিক্স করা হয়েছে
    alt: "Premium baby bibs design 8",
    category: "bibs",
  }
];

const categories = ["All", "baby-keeper", "bibs"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // ক্যাটাগরি অনুযায়ী ছবি ফিল্টার করা
  const filteredItems = galleryItems.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-[#faf7f2] pb-24 pt-8 sm:pt-32 md:pt-32 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8b735d]">
            Little Essentials
          </p>
          <h1 className="mb-6 font-serif text-4xl leading-tight text-[#2d251f] md:text-5xl lg:text-6xl">
           Discover Our <em className="font-light italic text-[#a48671]">Baby Collection</em>
          </h1>
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
        <div className="columns-2 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
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