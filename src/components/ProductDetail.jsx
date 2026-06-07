"use client";

import { useState, useEffect } from "react";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

import {
  useCart
} from "@/context/CartContext";

export default function ProductDetail({
  product,
  onClose,
}) {

  /* ───────── Cart ───────── */

  const { addToCart } =
    useCart();

  /* ───────── States ───────── */

  const [qty, setQty] =
    useState(1);

  const [note, setNote] =
    useState("");

  /* ───────── Reset State Saat Product Ganti ───────── */

  useEffect(() => {

    setQty(1);

    setNote("");

  }, [product]);

  /* ───────── Early Return ───────── */

  if (!product) return null;

  /* ───────── Qty State ───────── */

  const isMinQty =
    qty <= 1;

  const isMaxQty =
    qty >= product.stock;

  /* ───────── Quantity Handlers ───────── */

  const decreaseQty = (e) => {

    e.stopPropagation();

    setQty((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const increaseQty = (e) => {

    e.stopPropagation();

    setQty((prev) =>
      Math.min(
        product.stock,
        prev + 1
      )
    );
  };

  return (
    <>

      {/* ───────── Overlay ───────── */}
      <div
        onClick={onClose}

        className="
          fixed
          inset-0
          z-90

          bg-black/40
        "
      />

      {/* ───────── Popup ───────── */}
      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-100

          rounded-t-[36px]

          bg-[#F5F5F5]

          px-6
          pt-8
          pb-10

          animate-[slideUp_.25s_ease-out]
        "
      >

        {/* ───────── Header ───────── */}
        <div
          className="
            flex
            items-start
            justify-between
          "
        >

          {/* Product Info */}
          <div>

            <h1
              className="
                font-squada
                text-[40px]
                leading-none

                text-[#444]
              "
            >
              {product.name}
            </h1>

            <p
              className="
                mt-2

                font-signika
                text-[26px]

                text-[#666]
              "
            >
              {product.qty}
            </p>

          </div>

          {/* Price */}
          <p
            className="
              font-squada
              text-[35px]

              text-[#FF5C2B]
            "
          >
            Rp
            {(product.price || 0).toLocaleString(
              "id-ID"
            )}
          </p>

        </div>

        {/* ───────── Notes ───────── */}
        <div className="mt-6">

          <TextBox
            placeholder="Tambahkan catatan..."

            multiline

            value={note}

            onChange={(e) =>
              setNote(
                e.target.value
              )
            }

            className="
              h-50
              w-full
            "
          />

        </div>

        {/* ───────── Quantity ───────── */}
        <div
          className="
            mt-5

            flex
            items-center
            justify-end
            gap-5
          "
        >

          {/* Minus */}
          <button
            type="button"

            onClick={decreaseQty}

            disabled={isMinQty}

            style={{
              touchAction:
                "manipulation",
            }}

            className={`
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              text-[32px]
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

          {/* Qty */}
          <p
            className="
              w-8
              text-center

              font-signika
              text-[32px]
              font-bold

              text-[#555]
            "
          >
            {qty}
          </p>

          {/* Plus */}
          <button
            type="button"

            onClick={increaseQty}

            disabled={isMaxQty}

            style={{
              touchAction:
                "manipulation",
            }}

            className={`
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              text-[32px]
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

        {/* ───────── Bottom Buttons ───────── */}
        <div
          className="
            mt-10

            flex
            gap-4
          "
        >

          {/* Cancel */}
          <div className="flex-1">

            <Button
              text="Batal"

              onClick={onClose}

              variant="secondary"

              className="
                w-full
                px-8
              "
            />

          </div>

          {/* Buy */}
          <div className="flex-1">

            <Button
              text="Beli"

              onClick={() => {

                addToCart({
                  product,
                  qty,
                  note,
                });

                onClose();
              }}

              variant="primary"

              className="
                w-full
                px-20
              "
            />

          </div>

        </div>

      </div>

    </>
  );
}
