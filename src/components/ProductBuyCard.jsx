"use client";

import Image from "next/image";

function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

export default function ProductBuyCard({
  id,

  name = "Nama Produk",

  qty = "1 pcs",

  note = "-",

  price = 0,

  image = "",

  checked = false,

  cartQty = 1,

  stock = 1,

  onCheck,

  onDelete,

  onIncrease,

  onDecrease,
}) {

  const isMinQty =
    cartQty <= 1;

  const isMaxQty =
    cartQty >= stock;

  return (
    <div
      className="
        flex
        gap-4

        rounded-[18px]

        border-2
        border-[#b0b0b0]

        bg-[#F5F5F5]

        p-3
      "
    >

      {/* Product Image */}
      <div
        className="
          h-32
          w-32

          shrink-0

          overflow-hidden
          rounded-[18px]

          bg-[#ECECEC]
        "
      >

        {image && (
          <img
            src={image}
            alt={name}
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}

      </div>

      {/* Product Info */}
      <div
        className="
          flex
          flex-1
          flex-col
        "
      >

        {/* Top */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >

          {/* Text */}
          <div>

            {/* Name */}
            <h1
              className="
                font-squadaOne
                text-[24px]
                leading-none

                text-[#4B4B4B]
              "
            >
              {name}
            </h1>

            {/* Qty */}
            <p
              className="
                mt-1

                font-signika
                text-[15px]

                text-[#555]
              "
            >
              {qty}
            </p>

            {/* Notes */}
            <p
              className="
                mt-1

                font-signika
                text-[14px]

                text-[#8A8A8A]
              "
            >
              Catatan: {note}
            </p>

          </div>

          {/* Checkbox */}
          <button
            onClick={onCheck}

            className="
              mt-1
              shrink-0
            "
          >
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
                  checked
                    ? "border-[#7C8F35] bg-[#B6D04E]"
                    : "border-[#8C8C8C] bg-transparent"
                }
              `}
            >

              {checked && (
                <div
                  className="
                    h-3
                    w-3

                    rounded-xs

                    bg-white
                  "
                />
              )}

            </div>
          </button>

        </div>

        {/* Quantity Controller */}
        <div
          className="
            mt-3

            flex
            items-center
            gap-3
          "
        >

          {/* Minus */}
          <button
            onClick={() =>
              onDecrease(id)
            }

            disabled={isMinQty}

            className={`
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-full

              text-[20px]
              font-bold
              text-white

              transition-all
              duration-200

              ${
                isMinQty
                  ? "bg-[#BDBDBD]"
                  : "bg-[#B6D04E]"
              }
            `}
          >
            -
          </button>

          {/* Quantity */}
          <p
            className="
              min-w-5

              text-center

              font-signika
              text-[18px]
              font-bold

              text-[#555]
            "
          >
            {cartQty}
          </p>

          {/* Plus */}
          <button
            onClick={() =>
              onIncrease(id)
            }

            disabled={isMaxQty}

            className={`
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-full

              text-[20px]
              font-bold
              text-white

              transition-all
              duration-200

              ${
                isMaxQty
                  ? "bg-[#BDBDBD]"
                  : "bg-[#B6D04E]"
              }
            `}
          >
            +
          </button>

        </div>

        {/* Bottom */}
        <div
          className="
            mt-auto

            flex
            items-end
            justify-between
          "
        >

          {/* Price */}
          <p
            className="
              font-squadaOne
              text-[24px]

              text-[#FF5C2B]
            "
          >
            {formatRupiah(
              price * cartQty
            )}
          </p>

          {/* Trash */}
          <button
            onClick={onDelete}
          >
            <Image
              src="/Trash.svg"
              alt="Delete"
              width={24}
              height={24}
            />
          </button>

        </div>

      </div>

    </div>
  );
}