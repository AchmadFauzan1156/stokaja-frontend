"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";
import ProductPopup from "@/components/ProductDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/Toast";
import { apiGet } from "@/lib/api";
import { mapProducts } from "@/lib/mappers";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { showError } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Bisa tambahkan pagination logic di sini jika perlu, tapi kita fetch semua (limit besar) untuk sekarang
        const res = await apiGet("/produk?limit=100");
        setProducts(mapProducts(res.data));
      } catch (error) {
        showError(error.message || "Gagal memuat produk");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [showError]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All"
        ? true
        : (product.category || "").toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen overflow-hidden bg-[#F0E7D6]">
      {/* ───────── Sticky Top Section ───────── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#F0E7D6] px-4 pt-6 pb-4">
        {/* Header */}
        <div className="mt-8 mx-4 flex items-center justify-between">
          <div className="flex flex-col">
             <h1 className="font-squada text-[27px] text-[#6E822E]">Selamat Datang!</h1>
             <p className="font-signika text-[16px] text-[#444] capitalize">{user?.fullName || "Tamu"}</p>
          </div>
          <Link href="/profile">
            <ProfilePicture src={user?.avatar || "/Profile.jpg"} />
          </Link>
        </div>

        {/* Search */}
        <div className="mt-3">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Category / Search Result */}
        <div className="mt-3">
          {search.trim() === "" ? (
            <CategoryChips
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <p className="px-1 pt-1.5 font-squadaOne text-[24px] font-medium text-[#6E822E]">
              {filteredProducts.length} Result(s) Found for <span className="text-[#4D5D1F]">"{search}"</span>
            </p>
          )}
        </div>
      </div>

      {/* ───────── Scrollable Product Area ───────── */}
      <div className="h-full overflow-y-auto px-4 pb-36 pt-60">
        {isLoading ? (
          <div className="flex justify-center items-center h-full pt-10">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-2 text-center text-[#8E8E8E] font-signika mt-10">
                Tidak ada produk yang ditemukan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ───────── Product Popup ───────── */}
      <ProductPopup
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuy={({ product, qty, note }) => {
          addToCart({ product, qty, note });
          setSelectedProduct(null);
        }}
      />

      {/* ───────── Navbar ───────── */}
      <Navbar />
    </div>
  );
}