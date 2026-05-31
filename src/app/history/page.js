"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfilePicture from "@/components/ProfilePicture";
import Navbar from "@/components/Navbar";
import HistoryCard from "@/components/HistoryCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiGet } from "@/lib/api";
import { mapTransactions } from "@/lib/mappers";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/context/AuthContext";

export default function HistoryPage() {
  const [tab, setTab] = useState("history");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await apiGet("/pesananku?limit=100");
        setTransactions(mapTransactions(res.data));
      } catch (error) {
        showError(error.message || "Gagal memuat riwayat pesanan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [showError]);

  const historyData = transactions.filter(
    (t) => t.status === "selesai"
  );
  const processData = transactions.filter(
    (t) => t.status === "pending" || t.status === "diproses" || t.status === "dikirim"
  );

  const displayData = tab === "history" ? historyData : processData;

  return (
    <div className="h-screen overflow-hidden bg-[#F0E7D6]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#F0E7D6] px-4 pt-6 pb-4">
        <div className="mt-8 mx-4 flex items-center justify-between">
          <h1 className="font-squada text-[27px] text-[#6E822E]">
            Riwayat Belanja
          </h1>
          <Link href="/profile">
            <ProfilePicture src={user?.avatar || "/Profile.jpg"} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTab("history")}
            className={`
              flex-1 rounded-full py-3 font-squadaOne text-[22px] transition-all
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
            onClick={() => setTab("process")}
            className={`
              flex-1 rounded-full py-3 font-squadaOne text-[22px] transition-all
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
      <div className="h-full overflow-y-auto px-4 pt-48 pb-36">
        {isLoading ? (
          <div className="flex justify-center items-center h-full pt-10">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayData.length === 0 ? (
              <p className="text-center font-signika text-[#777] mt-10">
                Tidak ada riwayat pesanan.
              </p>
            ) : (
              displayData.map((item) => <HistoryCard key={item.id} {...item} />)
            )}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}