"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/format";

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const items = Number(searchParams.get("items") || 0);
  const amount = Number(searchParams.get("amount") || 0);

  return (
    <div className="w-full rounded-[36px] border border-[#eadfce] bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f4ebe1] text-3xl">
        ✓
      </div>

      <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#8f7a68]">
        Order Placed Successfully
      </p>

      <h1 className="mt-4 font-serif text-5xl leading-tight text-[#2d251f]">
        Thank you for your order
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#6e5d4f] md:text-base">
        Your order has been submitted successfully. Our team will review it
        shortly and contact you for confirmation if needed.
      </p>

      <div className="mx-auto mt-10 grid max-w-2xl gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[#f0e7dc] bg-[#fffdfa] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
            Status
          </p>
          <p className="mt-3 font-serif text-2xl text-[#2d251f]">Pending</p>
        </div>

        <div className="rounded-3xl border border-[#f0e7dc] bg-[#fffdfa] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
            Total Items
          </p>
          <p className="mt-3 font-serif text-2xl text-[#2d251f]">
            {items || 0}
          </p>
        </div>

        <div className="rounded-3xl border border-[#f0e7dc] bg-[#fffdfa] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7a68]">
            Order Total
          </p>
          <p className="mt-3 font-serif text-2xl text-[#2d251f]">
            {formatCurrency(amount || 0)}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#2d251f] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#8b6b4f]"
        >
          Continue Shopping
        </Link>

        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-full border border-[#dccdbc] bg-[#faf7f2] px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#5e4c3d] transition hover:bg-[#f5eee6]"
        >
          View Admin Panel
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl items-center px-5 py-16 md:px-8">
      <Suspense
        fallback={
          <div className="w-full py-20 text-center text-[#8f7a68]">
            Loading order details...
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}