import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  style: ['normal', 'italic']
});

const jost = Jost({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Petite Lumière — Baby Boutique",
  description: "Luxury baby dresses crafted with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jost.className} ${jost.variable} ${cormorant.variable} bg-ivory text-charcoal antialiased overflow-x-hidden`}>
        <Navbar />
      
        {/* Main content Navbar er niche theke shuru hobe */}
        <main className="pt-18">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}