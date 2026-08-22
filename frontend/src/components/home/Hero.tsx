"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  // স্লাইডারের জন্য আপনার মেইন ইমেজগুলোর লিংক এখানে দিন
  const sliderImages = [
    "/hero-1.jpeg", 
    "/hero-2.jpeg",
    "/hero-4.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // অটো-স্লাইড লজিক (প্রতি ৩ সেকেন্ড পর পর স্লাইড পরিবর্তন হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <section className="mx-auto max-w-[1440px] bg-[#faf7f2] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row">
        
        {/* Left Side: Main Auto-Sliding Banner */}
        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-[350px] lg:h-[500px] lg:w-[75%]">
          {sliderImages.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Link href="#">
                <Image
                  src={src}
                  alt={`Main Slider Image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </Link>
            </div>
          ))}
          
          {/* Slider Indicators (Dots) - ঐচ্ছিক, চাইলে রিমুভ করতে পারেন */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Grid Banners */}
        <div className="flex w-full flex-col gap-4 lg:w-[25%]">
          
          {/* Top 2 Banners: মোবাইলে পাশাপাশি (২ কলাম), ডেস্কটপে উপর-নিচ */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-4">
            
            {/* Router Banner */}
            <Link href="#" className="relative h-[120px] w-full overflow-hidden rounded-xl sm:h-[180px] lg:h-[155px]">
              <Image
                src="/sapce-1.jpeg"
                alt="Router Banner"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Wardrobe Banner */}
            <Link href="#" className="relative h-[120px] w-full overflow-hidden rounded-xl sm:h-[180px] lg:h-[155px]">
              <Image
                src="/sapce-2.jpeg"
                alt="Wardrobe Banner"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Bottom 2 Small Banners: আপনার ডেস্কটপ স্ক্রিনশট অনুযায়ী নিচে ২টি ছোট ব্যানার */}
          <div className="hidden grid-cols-2 gap-4 lg:grid lg:h-[155px]">
            {/* Small Banner 1 (e.g. Bike) */}
            <Link href="#" className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/specification-1.jpeg"
                alt="Small Banner 1"
                fill
                sizes="12vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Small Banner 2 (e.g. Call Center) */}
            <Link href="#" className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/spacificaton.jpeg"
                alt="Small Banner 2"
                fill
                sizes="12vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}