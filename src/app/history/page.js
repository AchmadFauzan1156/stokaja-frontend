"use client";

import { useState } from "react";
import Link from "next/link";

import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import HistoryCard from "@/components/HistoryCard";

import {
  historyData,
  processData,
} from "@/data/dummyHistory";

export default function HistoryPage() {

  const [tab, setTab] =
    useState("history");

  return (
    <div
      className="
        h-screen
        overflow-hidden

        bg-[#F0E7D6]
      "
    >

      {/* Header */}
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
            Riwayat Belanja
          </h1>

          <Link href="/profile">
            <ProfilePicture />
          </Link>

        </div>

        {/* Tabs */}
        <div
          className="
            mt-4

            flex
            gap-2
          "
        >

          <button
            onClick={() =>
              setTab("history")
            }

            className={`
              flex-1

              rounded-full

              py-3

              font-squadaOne
              text-[22px]

              transition-all

              ${
                tab === "history"
                  ? "bg-[#FF5C2B] text-white"
                  : "bg-[#8E8E8E] text-white"
              }
            `}
          >
            Riwayat
          </button>

          <button
            onClick={() =>
              setTab("process")
            }

            className={`
              flex-1

              rounded-full

              py-3

              font-squadaOne
              text-[22px]

              transition-all

              ${
                tab === "process"
                  ? "bg-[#FF5C2B] text-white"
                  : "bg-[#8E8E8E] text-white"
              }
            `}
          >
            Dalam Proses
          </button>

        </div>

      </div>

      {/* Content */}
      <div
        className="
          h-full
          overflow-y-auto

          px-4

          pt-48
          pb-36
        "
      >

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {(tab === "history"
            ? historyData
            : processData
          ).map((item) => (

            <HistoryCard
              key={item.id}
              {...item}
            />

          ))}

        </div>

      </div>

      <Navbar />

    </div>
  );
}