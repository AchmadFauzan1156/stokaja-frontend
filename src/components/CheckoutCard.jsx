"use client";

import Button from "./Button";

export default function CheckoutCard({
  total = 0,

  allChecked = false,

  onToggleAll,
  onCheckout,
}) {

  const hasSelected = total > 0;

  return (
    <div
      className="
        fixed
        bottom-34
        left-1/2
        -translate-x-1/2
        z-60

        w-full
        max-w-full

        border-t-[3px]
        border-t-[#B0B0B0]

        bg-[#F5F5F5]

        px-6
        pt-4
        pb-8
      "
    >

      {/* Top Row */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        {/* Checkbox + Text */}
        <button
          onClick={onToggleAll}

          className="
            flex
            items-center
            gap-3
          "
        >

          {/* Checkbox */}
          <div
            className={`
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-md

              border-2

              transition-all
              duration-200

              ${
                allChecked
                  ? "border-[#FF5C2B] bg-[#FF5C2B]"
                  : "border-[#8C8C8C] bg-transparent"
              }
            `}
          >

            {allChecked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"

                stroke="white"
                strokeWidth="3"

                className="
                  h-4
                  w-4
                "
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

          </div>

          {/* Label */}
          <p
            className="
              font-signika
              text-[22px]

              text-[#666]
            "
          >
            Pilih Semua
          </p>

        </button>

        {/* Total */}
        <div className="text-right">

          <p
            className="
              font-signika
              text-[18px]

              text-[#666]
            "
          >
            Total Belanja
          </p>

          <p
            className="
              font-squadaOne
              text-[38px]
              leading-none

              text-[#FF5C2B]
            "
          >
            Rp.
            {total.toLocaleString("id-ID")}
          </p>

        </div>

      </div>

      {/* Checkout Button */}
      <div className="mt-5">

        <Button
          text="Checkout"

          onClick={onCheckout}

          disabled={!hasSelected}

          className={`
            h-16
            w-full

            ${
              hasSelected
                ? "bg-[#FF5C2B]"
                : "bg-[#D9A07A]"
            }
          `}
        />

      </div>

    </div>
  );
}