"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Props yang diterima dari mapTransaction():
 *   id, date (ISO string), status, total, paymentMethod, items, ...
 */
export default function HistoryCard({
  id,
  date,
  status,
  total,
  items,
}) {
  // Format tanggal dari ISO string menjadi "30 Mei 2026"
  const formattedDate = (() => {
    try {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return date || "-";
    }
  })();

  // Generate pesan ringkasan berdasarkan status
  const statusLabels = {
    pending: "Menunggu Konfirmasi",
    diproses: "Pesanan Sedang Diproses",
    dikirim: "Pesanan Dalam Pengiriman",
    selesai: "Pesanan Selesai",
    batal: "Pesanan Dibatalkan",
  };

  const statusMessage = statusLabels[status] || status || "-";

  // Jumlah item di keranjang
  const itemCount = items?.length || 0;

  return (
    <div
      className="
        rounded-[18px]

        border
        border-[#BDBDBD]

        bg-[#F5F5F5]

        p-3
      "
    >

      <p
        className="
          font-squada
          text-[24px]

          text-[#555]
        "
      >
        {formattedDate}
      </p>

      <div
        className="
          mt-2

          flex
          items-center
          gap-4
        "
      >

        <Image
          src="/Packet.svg"
          alt="Packet"

          width={70}
          height={70}
        />

        <div className="flex-1">
          <p
            className="
              font-signika
              text-[18px]
              font-semibold

              text-[#555]
            "
          >
            {statusMessage}
          </p>
          <p className="font-signika text-[14px] text-[#888] mt-1">
            {itemCount} produk • Rp{(total || 0).toLocaleString("id-ID")}
          </p>
        </div>

      </div>

      <div
        className="
          mt-3

          flex
          justify-end
        "
      >

        <Link
          href={`/history-detail?id=${id}`}
        >

          <button
            className="
              rounded-full

              bg-[#FF5C2B]

              px-5
              py-2

              font-signika
              font-bold

              text-white
            "
          >
            Lihat Rincian
          </button>

        </Link>

      </div>

    </div>
  );
}
