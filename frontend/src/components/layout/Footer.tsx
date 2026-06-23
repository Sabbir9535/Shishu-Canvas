import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#eadfce] bg-[#f8f3ed]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-serif text-2xl text-[#2d251f]">Shishu Canvas</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#6e5d4f]">
            Premium baby essentials and curated little outfits designed with
            comfort, softness, and timeless charm in mind.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b735d]">
            Quick Links
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#5e4c3d]">
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b735d]">
            Contact
          </h4>
          <div className="mt-4 space-y-3 text-sm text-[#6e5d4f]">
            <p>Email: hello@shishucanvas.com</p>
            <p>Phone: +880 1XXX XXXXXX</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#eadfce] px-5 py-5 text-center text-xs tracking-[0.16em] text-[#8b735d] md:px-8">
        © {new Date().getFullYear()} SHISHU CANVAS — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}