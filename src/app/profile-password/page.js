"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiPut } from "@/lib/api";
import { useToast } from "@/components/Toast";
import { unmapProfileUpdate } from "@/lib/mappers";

export default function ProfilePasswordPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showError("Semua field harus diisi!");
      return;
    }

    if (newPassword.length < 8) {
      showError("Password baru minimal 8 karakter!");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    setIsSaving(true);
    try {
      const payload = unmapProfileUpdate({ oldPassword, newPassword });
      await apiPut("/users/profil", payload);
      showSuccess("Password berhasil diperbarui");
      router.push("/profile");
    } catch (error) {
      showError(error.message || "Gagal memperbarui password");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14">
      <h1 className="font-squada text-[36px] text-[#6E822E]">Ubah Password</h1>
      <div className="mt-8 flex flex-col gap-4">
        <TextBox
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Password Lama"
          className="w-full"
        />
        <TextBox
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password Baru"
          className="w-full"
        />
        <TextBox
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Konfirmasi Password"
          className="w-full"
        />
      </div>
      <div className="mt-10 flex gap-4">
        <Button text="Batal" variant="secondary" onClick={() => router.back()} className="flex-1 w-full" />
        {isSaving ? (
          <div className="flex-1 flex justify-center py-3">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          <Button text="Simpan" onClick={handleSave} className="flex-1 w-full" />
        )}
      </div>
    </div>
  );
}
