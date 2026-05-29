"use client";

import { useSearchParams }
from "next/navigation";

import Button from "@/components/Button";

import {
  historyData,
  processData,
} from "@/data/dummyHistory";

export default function HistoryDetailPage() {

  const params =
    useSearchParams();

  const id =
    Number(
      params.get("id")
    );

  const order =
    [...historyData, ...processData]
      .find(
        (item) =>
          item.id === id
      );

  if (!order) {
    return null;
  }

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        px-5
        pt-14
      "
    >

      <h1
        className="
          font-squadaOne
          text-[36px]

          text-[#555]
        "
      >
        Detail Pesanan
      </h1>

      <div
        className="
          mt-6

          rounded-3xl

          bg-white

          p-5
        "
      >

        <p
          className="
            font-signika
            text-[18px]
          "
        >
          Tanggal
        </p>

        <p
          className="
            font-bold
          "
        >
          {order.date}
        </p>

        <div
          className="
            mt-5
          "
        >

          <p
            className="
              font-signika
              text-[18px]
            "
          >
            Status
          </p>

          <p
            className="
              font-bold

              text-[#FF5C2B]
            "
          >
            {order.message}
          </p>

        </div>

        {order.items && (

          <div
            className="
              mt-6
            "
          >

            <p
              className="
                mb-3

                font-signika
                text-[18px]
              "
            >
              Produk
            </p>

            {order.items.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}

                  className="
                    mb-2

                    flex
                    justify-between
                  "
                >

                  <span>
                    {item.name}
                    {" "}
                    x
                    {item.qty}
                  </span>

                  <span>
                    Rp
                    {item.price.toLocaleString(
                      "id-ID"
                    )}
                  </span>

                </div>

              )
            )}

          </div>

        )}

        <div
          className="
            mt-8

            flex
            justify-center
          "
        >

          <Button
            text="Kembali"

            onClick={() =>
              history.back()
            }
          />

        </div>

      </div>

    </div>
  );
}