import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import Reviews from "@/components/Reviews";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <>
     <Hero/>
     <TrustBar/>
     <FeaturedProducts/>
     <NewArrivals/>
     <Categories/>
     <Reviews/>
    </>
  );
}