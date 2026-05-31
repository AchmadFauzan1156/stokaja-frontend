"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiGet, apiPost } from "@/lib/api";
import { mapPaymentMethods, unmapCheckout } from "@/lib/mappers";
import { useToast } from "@/components/Toast";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const selectedItems = cartItems.filter((item) => item.checked);

  const addresses = user?.addresses || [];

  const [selectedAddress, setSelectedAddress] = useState(addresses[0] || null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await apiGet("/metode-bayar");
        const mapped = mapPaymentMethods(res.data);
        const activeMethods = mapped.filter((m) => m.active);
        setPaymentMethods(activeMethods);
        if (activeMethods.length > 0) {
          setPaymentMethod(activeMethods[0].name);
        } else {
          setPaymentMethods([
            { id: "tunai", name: "tunai" },
            { id: "qris", name: "qris" },
          ]);
          setPaymentMethod("qris");
        }
      } catch (error) {
        console.error("Gagal memuat metode pembayaran", error);
        setPaymentMethods([
          { id: "tunai", name: "tunai" },
          { id: "qris", name: "qris" },
        ]);
        setPaymentMethod("qris");
      }
    };
    fetchPaymentMethods();
  }, []);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.cartQty,
    0
  );

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      showError("Tidak ada produk yang dipilih");
      return;
    }
    if (!selectedAddress && addresses.length > 0) {
      showError("Pilih alamat pengiriman terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      const payload = unmapCheckout({
        items: selectedItems,
        address: selectedAddress,
        paymentMethod,
        amountPaid: total,
      });

      await apiPost("/checkout", payload);

      clearCart();
      showSuccess("Pesanan berhasil dibuat!");
      router.push("/history"); // Arahkan ke history karena checkout-success mungkin tidak ada
    } catch (error) {
      showError(error.message || "Gagal membuat pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14 pb-10">
      {/* Header */}
      <h1 className="font-squadaOne text-[36px] text-[#6E822E]">Checkout</h1>

      {/* Ringkasan Belanja */}
      <div className="mt-8 rounded-3xl bg-white p-5">
        <h2 className="font-squadaOne text-[26px] text-[#444]">
          Ringkasan Belanja
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          {selectedItems.length === 0 ? (
            <p className="font-signika text-[#777]">Tidak ada produk dipilih</p>
          ) : (
            selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-signika text-[18px] text-[#444]">
                    {item.name}
                  </p>
                  <p className="text-[#777]">x{item.cartQty}</p>
                </div>
                <p className="font-signika font-semibold">
                  Rp{(item.price * item.cartQty).toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Address */}
      <div className="mt-5 rounded-3xl bg-white p-5">
        <h2 className="font-squadaOne text-[26px] text-[#444]">
          Alamat Pengiriman
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          {addresses.length === 0 ? (
            <p className="font-signika text-[#777]">
              Belum ada alamat. Silakan tambah di Profil.
            </p>
          ) : (
            addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => setSelectedAddress(address)}
                className={`
                  rounded-xl border-2 p-4 text-left transition-all
                  ${
                    selectedAddress?.id === address.id
                      ? "border-[#B6D04E] bg-[#F8FFE7]"
                      : "border-[#D4D4D4]"
                  }
                `}
              >
                <p className="font-signika font-bold">{address.label}</p>
                <p className="mt-1 font-signika text-[#666]">
                  {address.address}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Payment */}
      <div className="mt-5 rounded-3xl bg-white p-5">
        <h2 className="font-squadaOne text-[26px] text-[#444]">
          Metode Pembayaran
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id || method.name}
              className="flex items-center gap-3 font-signika"
            >
              <input
                type="radio"
                checked={paymentMethod === method.name}
                onChange={() => setPaymentMethod(method.name)}
              />
              <span className="capitalize">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 rounded-3xl bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="font-signika text-[20px]">Total</p>
          <p className="font-squadaOne text-[32px] text-[#FF5C2B]">
            Rp{total.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 flex justify-center">
        {isLoading ? (
          <LoadingSpinner size="md" />
        ) : (
          <Button
            text="Buat Pesanan"
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          />
        )}
      </div>
    </div>
  );
}