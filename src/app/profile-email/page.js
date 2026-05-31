"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { apiPut } from "@/lib/api";
import { useToast } from "@/components/Toast";
import { unmapProfileUpdate } from "@/lib/mappers";

export default function ProfileEmailPage() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!email || !email.includes("@")) {
      showError("Format email tidak valid");
      return;
    }

    setIsSaving(true);
    try {
      const payload = unmapProfileUpdate({ email });
      await apiPut("/profil", payload);
      await refreshProfile();
      showSuccess("Email berhasil diperbarui");
      router.push("/profile");
    } catch (error) {
      showError(error.message || "Gagal memperbarui email");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14">
      <h1 className="font-squadaOne text-[36px] text-[#6E822E]">Ubah Email</h1>
      <div className="mt-8">
        <TextBox
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan Email Baru"
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