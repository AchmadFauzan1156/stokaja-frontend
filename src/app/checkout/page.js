"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import { useCart }
from "@/context/CartContext";

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

export default function CheckoutPage() {

  const router =
    useRouter();

  const {
    cartItems,
  } = useCart();

  /* Hanya item yang dipilih */
  const selectedItems =
    cartItems.filter(
      (item) => item.checked
    );

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState(addresses[0]);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("qris");

  /* Total */
  const total =
    selectedItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.cartQty,

      0
    );

  /* Checkout */
  const handleCheckout = () => {

    const payload = {
      address:
        selectedAddress,

      payment_method:
        paymentMethod,

      items:
        selectedItems,

      total,
    };

    console.log(payload);

    router.push(
      "/checkout-success"
    );
  };

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        px-5
        pt-14
        pb-10
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
        Checkout
      </h1>

      {/* Ringkasan Belanja */}
      <div
        className="
          mt-8

          rounded-3xl

          bg-white

          p-5
        "
      >

        <h2
          className="
            font-squadaOne
            text-[26px]

            text-[#444]
          "
        >
          Ringkasan Belanja
        </h2>

        <div
          className="
            mt-4

            flex
            flex-col
            gap-4
          "
        >

          {selectedItems.length === 0 ? (

            <p
              className="
                font-signika

                text-[#777]
              "
            >
              Tidak ada produk dipilih
            </p>

          ) : (

            selectedItems.map(
              (item) => (

                <div
                  key={item.id}

                  className="
                    flex
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        font-signika
                        text-[18px]

                        text-[#444]
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        text-[#777]
                      "
                    >
                      x
                      {item.cartQty}
                    </p>

                  </div>

                  <p
                    className="
                      font-signika
                      font-semibold
                    "
                  >
                    Rp
                    {(
                      item.price *
                      item.cartQty
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* Address */}
      <div
        className="
          mt-5

          rounded-3xl

          bg-white

          p-5
        "
      >

        <h2
          className="
            font-squadaOne
            text-[26px]

            text-[#444]
          "
        >
          Alamat Pengiriman
        </h2>

        <div
          className="
            mt-4

            flex
            flex-col
            gap-3
          "
        >

          {addresses.map(
            (address) => (

              <button
                key={address.id}

                onClick={() =>
                  setSelectedAddress(
                    address
                  )
                }

                className={`
                  rounded-xl

                  border-2

                  p-4

                  text-left

                  transition-all

                  ${
                    selectedAddress.id ===
                    address.id

                      ? "border-[#B6D04E] bg-[#F8FFE7]"

                      : "border-[#D4D4D4]"
                  }
                `}
              >

                <p
                  className="
                    font-signika
                    font-bold
                  "
                >
                  {address.label}
                </p>

                <p
                  className="
                    mt-1

                    font-signika

                    text-[#666]
                  "
                >
                  {address.address}
                </p>

              </button>

            )
          )}

        </div>

      </div>

      {/* Payment */}
      <div
        className="
          mt-5

          rounded-3xl

          bg-white

          p-5
        "
      >

        <h2
          className="
            font-squadaOne
            text-[26px]

            text-[#444]
          "
        >
          Metode Pembayaran
        </h2>

        <div
          className="
            mt-4

            flex
            flex-col
            gap-4
          "
        >

          <label
            className="
              flex
              items-center
              gap-3

              font-signika
            "
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "qris"
              }

              onChange={() =>
                setPaymentMethod(
                  "qris"
                )
              }
            />

            QRIS

          </label>

          <label
            className="
              flex
              items-center
              gap-3

              font-signika
            "
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "cash"
              }

              onChange={() =>
                setPaymentMethod(
                  "cash"
                )
              }
            />

            Tunai

          </label>

        </div>

      </div>

      {/* Total */}
      <div
        className="
          mt-5

          rounded-3xl

          bg-white

          p-5
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              font-signika
              text-[20px]
            "
          >
            Total
          </p>

          <p
            className="
              font-squadaOne
              text-[32px]

              text-[#FF5C2B]
            "
          >
            Rp
            {total.toLocaleString(
              "id-ID"
            )}
          </p>

        </div>

      </div>

      {/* Submit */}
      <div
        className="
          mt-8

          flex
          justify-center
        "
      >

        <Button
          text="Buat Pesanan"

          onClick={
            handleCheckout
          }

          disabled={
            selectedItems.length ===
            0
          }
        />

      </div>

    </div>
  );
}