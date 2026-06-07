"use client";

import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { mapCategories } from "@/lib/mappers";

export default function CategoryChips({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiGet("/kategori");
        const mapped = mapCategories(res.data);
        const catNames = ["All", ...mapped.map((c) => c.name)];
        setCategories(catNames);
      } catch (error) {
        console.error("Gagal memuat kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Chips Container */}
      <div
        className="
          flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide
          pl-4 pr-8 py-2
        "
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                shrink-0 rounded-full px-4 py-2 font-signika text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#6E822E] text-[#F0E7D6]"
                    : "bg-[#fff7e9] text-[#575757]"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Left Fade */}
      <div
        className="
          pointer-events-none absolute left-0 top-0 h-full w-8
          bg-linear-to-r from-[#F0E7D6] to-transparent
        "
      />

      {/* Right Fade */}
      <div
        className="
          pointer-events-none absolute right-0 top-0 h-full w-10
          bg-linear-to-l from-[#F0E7D6] to-transparent
        "
      />
    </div>
  );
}
