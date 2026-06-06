"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { apiPut } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, refreshProfile, isLoading: isAuthLoading } = useAuth();
  const { showSuccess, showError } = useToast();

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("/Profile.jpg");
  const [selectedFile, setSelectedFile] = useState(null); // File yang akan diupload
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.fullName || "");
      if (user.avatar) setProfileImage(user.avatar);
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file maks 2 MB
    if (file.size > 2 * 1024 * 1024) {
      showError("Ukuran gambar maksimal 2 MB");
      // Reset input file
      event.target.value = "";
      return;
    }

    // Simpan file untuk diupload nanti
    setSelectedFile(file);
    // Preview lokal
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Gunakan FormData agar bisa kirim file avatar bersama data teks
      const formData = new FormData();
      formData.append("namaLengkap", username);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      await apiPut("/users/profil", formData);
      await refreshProfile();
      setSelectedFile(null); // Reset setelah berhasil
      showSuccess("Profil berhasil diperbarui");
    } catch (error) {
      showError(error.message || "Gagal memperbarui profil");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/LoginPage");
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#F0E7D6] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0E7D6] pb-48">
      {/* Header */}
      <div className="px-6 pt-14">
        <h1 className="font-squadaOne text-[36px] text-[#6E822E]">Profil</h1>
      </div>

      {/* Profile Picture */}
      <div className="mt-8 flex flex-col items-center">
        <Image
          src={profileImage}
          alt="Profile"
          width={140}
          height={140}
          className="h-35 w-35 rounded-full border-4 border-[#B6D04E] object-cover"
          unoptimized={profileImage.startsWith("blob:") || profileImage.startsWith("http")}
        />
        <label className="mt-4 cursor-pointer font-signika text-[18px] text-[#6E822E]">
          Ganti Foto
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
      </div>

      {/* Username */}
      <div className="mt-10 px-5">
        <p className="mb-2 font-signika text-[18px] text-[#666]">Username</p>
        <TextBox value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
      </div>

      {/* Settings */}
      <div className="mt-8 px-5">
        {/* Email */}
        <Link href="/profile-email">
          <div className="cursor-pointer border-b-2 border-[#D4D4D4] py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-signika text-[18px] text-[#666]">Email</p>
                <p className="mt-1 font-signika text-[20px] text-[#444]">{user?.email || "-"}</p>
              </div>
              <span className="text-[26px] text-[#6E822E]">›</span>
            </div>
          </div>
        </Link>

        {/* Password */}
        <Link href="/profile-password">
          <div className="cursor-pointer border-b-2 border-[#D4D4D4] py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-signika text-[18px] text-[#666]">Password</p>
                <p className="mt-1 font-signika text-[20px] tracking-widest text-[#444]">••••••••</p>
              </div>
              <span className="text-[26px] text-[#6E822E]">›</span>
            </div>
          </div>
        </Link>

        {/* Address */}
        <Link href="/profile-address">
          <div className="cursor-pointer border-b-2 border-[#D4D4D4] py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-signika text-[18px] text-[#666]">Alamat</p>
                <p className="mt-1 font-signika text-[20px] text-[#444]">Kelola Alamat</p>
              </div>
              <span className="text-[26px] text-[#6E822E]">›</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {isSaving ? (
          <LoadingSpinner size="md" />
        ) : (
          <Button text="Simpan" onClick={handleSave} />
        )}
        <Button text="Logout" variant="secondary" onClick={handleLogout} />
      </div>

      <Navbar />
    </div>
  );
}