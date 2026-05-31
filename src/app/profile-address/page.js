"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProfileAddressPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0E7D6] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const addresses = user?.addresses || [];

  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14">
      <div className="flex items-center justify-between">
        <h1 className="font-squadaOne text-[36px] text-[#6E822E]">Alamat</h1>
        <Link href="/profile" className="font-signika text-[#6E822E] font-medium">Kembali</Link>
      </div>

      {/* Address List */}
      <div className="mt-8 flex flex-col gap-4">
        {addresses.length === 0 ? (
          <p className="font-signika text-center text-[#777]">Belum ada alamat tersimpan.</p>
        ) : (
          addresses.map((address) => (
            <Link key={address.id} href={`/profile-address-edit?id=${address.id}`}>
              <div className="rounded-[20px] border-2 border-[#D4D4D4] bg-white p-4 transition-all duration-200 hover:border-[#B6D04E]">
                <h2 className="font-signika text-[20px] font-bold text-[#444]">{address.label}</h2>
                <p className="mt-2 font-signika text-[17px] text-[#666]">{address.address}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Add Address Button */}
      <div className="mt-10 flex justify-center">
        <Link href="/profile-address-edit">
          <Button text="+ Tambah Alamat" />
        </Link>
      </div>
    </div>
  );
}