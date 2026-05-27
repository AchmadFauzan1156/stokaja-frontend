"use client";

import { useState } from "react";

import Link from "next/link";

import SearchBar from "@/components/SearchBar";
import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";
import ProductPopup from "@/components/ProductDetail";

import { dummyProducts } from "@/data/dummyProducts";

export default function HomePage() {

  /* ───────────── States ───────────── */

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  /* Cart State */
  const [cartItems, setCartItems] =
    useState([]);

  /* ───────────── Add To Cart ───────────── */

  const addToCart = ({
    product,
    qty,
    note,
  }) => {

    setCartItems((prev) => {

      const existing =
        prev.find(
          (item) =>
            item.id === product.id
        );

      /* Kalau produk sudah ada */
      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,

                cartQty:
                  item.cartQty + qty,

                note,
              }
            : item
        );
      }

      /* Produk baru */
      return [
        ...prev,

        {
          ...product,

          cartQty: qty,

          note,

          checked: true,
        },
      ];
    });

    console.log(
      "Cart Updated:",
      cartItems
    );
  };

  /* ───────────── Filtering ───────────── */

  const filteredProducts =
    dummyProducts.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

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
            Selamat Datang!
          </h1>

          <Link href="/profile">
            <ProfilePicture />
          </Link>

        </div>

        {/* Search */}
        <div className="mt-3">

          <SearchBar
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* Category / Search Result */}
        <div className="mt-3">

          {search.trim() === "" ? (

            <CategoryChips
              selectedCategory={
                selectedCategory
              }

              setSelectedCategory={
                setSelectedCategory
              }
            />

          ) : (

            <p
              className="
                px-1
                pt-1.5

                font-squadaOne
                text-[24px]
                font-medium

                text-[#6E822E]
              "
            >

              {filteredProducts.length}
              {" "}Result(s) Found for{" "}

              <span
                className="
                  text-[#4D5D1F]
                "
              >
                "{search}"
              </span>

            </p>

          )}

        </div>

      </div>

      {/* ───────── Scrollable Product Area ───────── */}
      <div
        className="
          h-full
          overflow-y-auto

          px-4
          pb-36
          pt-60
        "
      >

        {/* Product Grid */}
        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >

          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}

                {...product}

                onClick={() =>
                  setSelectedProduct(
                    product
                  )
                }
              />
            )
          )}

        </div>

      </div>

      {/* ───────── Product Popup ───────── */}
      <ProductPopup
        product={selectedProduct}

        onClose={() =>
          setSelectedProduct(null)
        }

        onBuy={({
          product,
          qty,
          note,
        }) => {

          addToCart({
            product,
            qty,
            note,
          });

          setSelectedProduct(null);
        }}
      />

      {/* ───────── Navbar ───────── */}
      <Navbar />

    </div>
  );
}