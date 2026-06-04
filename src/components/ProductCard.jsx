"use client";

/**
 * Palet warna per kategori produk.
 */
const CAT_COLORS = {
  Sembako: {
    bg: "bg-[#fff7e6]",
    text: "text-[#a05f00]",
  },

  Minuman: {
    bg: "bg-[#e8f4e8]",
    text: "text-[#2d6e22]",
  },

  Snack: {
    bg: "bg-[#feeaea]",
    text: "text-[#b52a2a]",
  },

  Kebersihan: {
    bg: "bg-[#f0eaff]",
    text: "text-[#6030b0]",
  },

  Perawatan: {
    bg: "bg-[#e6f2ff]",
    text: "text-[#1a5fa0]",
  },

  Obat: {
    bg: "bg-[#fff0f6]",
    text: "text-[#a0306a]",
  },
};

/**
 * Format angka ke Rupiah
 */
function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

export default function ProductCard({
  name = "Nama Produk",
  qty = "1 pcs",
  stock = 0,
  price = 0,
  category = "Lainnya",
  image = "",
  onClick,
}) {

  const isLow = stock > 0 && stock <= 8;
  const isOut = stock <= 0;

  const cat =
    CAT_COLORS[category] ?? {
      bg: "bg-[#eeeeee]",
      text: "text-[#555555]",
    };

  return (
    <div
      onClick={onClick}

      className="
        relative
        w-full

        overflow-hidden
        rounded-[18px]

        border-2
        border-[#b0b0b0]

        bg-white

        shadow-[0_2px_8px_rgba(0,0,0,0.04)]

        flex
        flex-col

        cursor-pointer

        transition-all
        duration-200

        hover:border-[#B5B5B5]
        hover:-translate-y-0.5
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
      "
    >

      {/* ── Gambar Produk ── */}
      <div
        className="
          relative
          h-32.5

          overflow-hidden

          bg-[#f2f0eb]

          shrink-0
        "
      >

        {image && (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="
              block
              h-full
              w-full
              object-cover
            "
          />
        )}

        {/* Overlay stok habis */}
        {isOut && (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              bg-black/45
            "
          >
            <span
              className="
                rounded-full

                bg-black/50

                px-3
                py-1

                text-[12px]
                font-bold
                text-white
              "
            >
              Stok Habis
            </span>
          </div>
        )}

        {/* Category Pill */}
        <div
          className={`
            absolute
            left-2
            top-2

            rounded-full

            px-2
            py-0.75

            font-signika
            text-[10px]
            font-bold
            uppercase

            tracking-[0.4px]

            ${cat.bg}
            ${cat.text}
          `}
        >
          {category}
        </div>

        {/* Hampir habis */}
        {isLow && !isOut && (
          <div
            className="
              absolute
              right-2
              top-2

              rounded-md

              bg-[rgba(210,48,30,0.88)]

              px-1.75
              py-0.5

              text-[9px]
              font-bold
              text-white
            "
          >
            Hampir Habis
          </div>
        )}

      </div>

      {/* ── Body ── */}
      <div
        className="
          flex
          flex-1
          flex-col
          gap-1

          px-2.75
          pb-4
          pt-2.5
        "
      >

        {/* Nama Produk */}
        <p
          className="
            font-squadaOne
            text-[22px]
            font-normal

            leading-[1.3]

            text-[#6E822E]
          "
        >
          {name}
        </p>

        {/* Qty */}
        <p
          className="
            font-signika
            text-[15px]
            font-normal

            text-[#888]
          "
        >
          {qty}
        </p>

        {/* Stock */}
        <p
          className="
            mt-5

            font-signika
            text-[12px]
            font-semibold

            text-[#aaa]
          "
        >
          Sisa stok{" "}

          <span
            className={`
              font-bold

              ${
                isLow
                  ? "text-[#d93030]"
                  : "text-[#888]"
              }
            `}
          >
            {stock}
          </span>
        </p>

        {/* Harga */}
        <div
          className="
            mt-auto
            pt-1.5
          "
        >
          <p
            className="
              font-squadaOne
              text-[22px]
              font-normal

              leading-none

              text-[#e05c1a]
            "
          >
            {formatRupiah(price || 0)}
          </p>
        </div>

      </div>

    </div>
  );
}