"use client";

import Link from "next/link";

import Button from "@/components/Button";

const addresses = [
  {
    id: 1,

    label: "Rumah",

    address:
      "Jl. Kenanga No.10, Semarang",
  },

  {
    id: 2,

    label: "Kos",

    address:
      "Jl. Mawar No.5, Semarang",
  },
];

export default function ProfileAddressPage() {

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        px-5
        pt-14
      "
    >

      {/* Header */}
      <h1
        className="
          font-squadaOne
          text-[36px]

          text-[#6E822E]
        "
      >
        Alamat
      </h1>

      {/* Address List */}
      <div
        className="
          mt-8

          flex
          flex-col
          gap-4
        "
      >

        {addresses.map(
          (address) => (

            <Link
              key={address.id}

              href={`/profile-address-edit?id=${address.id}`}
            >

              <div
                className="
                  rounded-[20px]

                  border-2
                  border-[#D4D4D4]

                  bg-white

                  p-4

                  transition-all
                  duration-200

                  hover:border-[#B6D04E]
                "
              >

                <h2
                  className="
                    font-signika
                    text-[20px]
                    font-bold

                    text-[#444]
                  "
                >
                  {address.label}
                </h2>

                <p
                  className="
                    mt-2

                    font-signika
                    text-[17px]

                    text-[#666]
                  "
                >
                  {address.address}
                </p>

              </div>

            </Link>

          )
        )}

      </div>

      {/* Add Address Button */}
      <div
        className="
          mt-10

          flex
          justify-center
        "
      >

        <Link
          href="/profile-address-edit"
        >

          <Button
            text="+ Tambah Alamat"
          />

        </Link>

      </div>

    </div>
  );
}