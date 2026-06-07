"use client";

import Link from "next/link";

import Button from "@/components/Button";

export default function CheckoutSuccessPage() {

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        flex
        flex-col

        items-center
        justify-center

        px-6
      "
    >

      <h1
        className="
          font-squada
          text-[42px]

          text-[#6E822E]
        "
      >
        Pesanan Berhasil
      </h1>

      <p
        className="
          mt-4

          text-center

          font-signika
          text-[20px]
        "
      >
        Pesanan Anda berhasil dibuat.
      </p>

      <div
        className="
          mt-10

          flex
          flex-col
          gap-4
        "
      >

        <Link href="/history">
          <Button text="Lihat Riwayat Pesanan" />
        </Link>

        <Link href="/home">
          <Button text="Kembali Berbelanja" variant="secondary" />
        </Link>

      </div>

    </div>
  );
}
