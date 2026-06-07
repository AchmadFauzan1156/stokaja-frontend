"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiGet } from "@/lib/api";
import { mapTransactions } from "@/lib/mappers";
import { useToast } from "@/components/Toast";

function HistoryDetailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { showError } = useToast();
  const idString = params.get("id");

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!idString) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const res = await apiGet(`/transaksi/${idString}`);
        if (res.data) {
          const mapped = mapTransactions([res.data]);
          if (mapped.length > 0) {
            setOrder(mapped[0]);
          } else {
            showError("Pesanan tidak ditemukan");
          }
        } else {
          showError("Pesanan tidak ditemukan");
        }
      } catch (error) {
        showError("Gagal memuat detail pesanan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [idString, showError]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mt-20 flex flex-col items-center gap-4">
        <p className="font-signika text-[#777]">Pesanan tidak ditemukan</p>
        <Button text="Kembali" onClick={() => router.back()} />
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white p-5">
      <p className="font-signika text-[18px]">Tanggal</p>
      <p className="font-bold">
        {new Date(order.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="mt-5">
        <p className="font-signika text-[18px]">Status</p>
        <p className="font-bold text-[#FF5C2B] capitalize">{order.status}</p>
      </div>
      
      <div className="mt-5">
        <p className="font-signika text-[18px]">Metode Bayar</p>
        <p className="font-bold capitalize">{order.paymentMethod}</p>
      </div>

      <div className="mt-5">
        <p className="font-signika text-[18px]">Total Bayar</p>
        <p className="font-bold text-[#FF5C2B]">Rp{order.total?.toLocaleString("id-ID") || 0}</p>
      </div>

      {order.items && (
        <div className="mt-6">
          <p className="mb-3 font-signika text-[18px]">Produk</p>
          {order.items.map((item, index) => (
            <div key={index} className="mb-2 flex justify-between font-signika">
              <span>{item.name} x{item.qty}</span>
              <span>Rp{(item.price * item.qty).toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button text="Kembali" onClick={() => router.back()} />
      </div>
    </div>
  );
}

export default function HistoryDetailPage() {
  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14 pb-20">
      <h1 className="font-squada text-[36px] text-[#555]">Detail Pesanan</h1>
      <Suspense fallback={<div className="flex justify-center mt-20"><LoadingSpinner size="lg" /></div>}>
        <HistoryDetailContent />
      </Suspense>
    </div>
  );
}
