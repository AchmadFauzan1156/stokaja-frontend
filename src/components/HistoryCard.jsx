"use client";

import Link from "next/link";
import Image from "next/image";

export default function HistoryCard({
  id,
  date,
  message,
}) {

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
          font-squadaOne
          text-[24px]

          text-[#555]
        "
      >
        {date}
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

        <p
          className="
            font-signika
            text-[18px]

            text-[#555]
          "
        >
          {message}
        </p>

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