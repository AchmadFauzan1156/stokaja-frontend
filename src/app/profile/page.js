import SearchBar from "@/components/SearchBar";
import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";

import { dummyProducts } from "@/data/dummyProducts";

export default function HomePage() {
  return (
  <div
    className="
      h-screen
      overflow-hidden
      bg-[#F0E7D6]
    "
  >

    {/* Sticky Top Section */}
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
    </div>

    {/* Navbar */}
    <Navbar />

  </div>
);
}