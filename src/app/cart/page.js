"use client";

import Link from "next/link";

import { useCart }
from "@/context/CartContext";

import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";

import ProductBuyCard from "@/components/ProductBuyCard";
import CheckoutCard from "@/components/CheckoutCard";

export default function CartPage() {

  const {
    cartItems,

    toggleCheck,

    deleteItem,

    updateCartQty,
  } = useCart();

  /* ───────── Select All ───────── */

  const allChecked =
    cartItems.length > 0 &&
    cartItems.every(
      (item) => item.checked
    );

  const toggleAll = () => {

    cartItems.forEach((item) => {
      if (item.checked !== !allChecked) {
        toggleCheck(item.id);
      }
    });
  };

  /* ───────── Total ───────── */

  const total = cartItems
    .filter((item) => item.checked)

    .reduce(
      (sum, item) =>
        sum +
        item.price *
          item.cartQty,

      0
    );

  return (
    <div
      className="
        h-screen
        overflow-hidden

        bg-[#F0E7D6]
      "
    >

      {/* ───────── Sticky Top Section ───────── */}
      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-50

          bg-[#F0E7D6]

          px-4
          pt-6
          pb-4
        "
      >

        {/* Header */}
        <div
          className="
            mt-8
            mx-4

            flex
            items-center
            justify-between
          "
        >

          <h1
            className="
              font-squada
              text-[27px]

              text-[#6E822E]
            "
          >
            Keranjang Belanja
          </h1>

          <Link href="/profile">
            <ProfilePicture />
          </Link>

        </div>

      </div>

      {/* ───────── Scrollable Cart Area ───────── */}
      <div
        className="
          h-full
          overflow-y-auto

          px-3
          pt-32

          pb-96
        "
      >

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {cartItems.map((item) => (
            <ProductBuyCard
              key={item.id}

              {...item}

              onCheck={() =>
                toggleCheck(item.id)
              }

              onDelete={() =>
                deleteItem(item.id)
              }

              onIncrease={() =>
                updateCartQty(
                  item.id,
                  "increase"
                )
              }

              onDecrease={() =>
                updateCartQty(
                  item.id,
                  "decrease"
                )
              }
            />
          ))}

        </div>

      </div>

      {/* ───────── Checkout Card ───────── */}
      <CheckoutCard
        total={total}

        allChecked={allChecked}

        onToggleAll={toggleAll}

        onCheckout={() =>
          console.log(
            "Checkout clicked"
          )
        }
      />

      {/* ───────── Navbar ───────── */}
      <Navbar />

    </div>
  );
}