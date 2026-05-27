import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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
          Riwayat Belanja
        </h1>
        <Link href="/profile">
            <ProfilePicture />
        </Link>
      </div>


    </div>

    {/* Navbar */}
    <Navbar />

  </div>
);
}